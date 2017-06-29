import {History} from "history";
const appConfig = require("../../../config/main");
const localConfig = require("../../../config/main.local");
import * as createRavenMiddleware from "raven-for-redux";
import * as Raven from "raven-js";
import {routerMiddleware} from "react-router-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {createLogger} from "redux-logger";
import createSagaMiddleware, { END } from "redux-saga";
import {IStore} from "./IStore";
import rootReducer from "./rootReducer";

interface IExtendedStore extends Redux.Store<IStore> {
  runSaga: (rootSaga: any) => any;
  close: () => void;
}

export function configureStore(history: History, initialState?: IStore): IExtendedStore {

  const mergedConfig = {...appConfig, ...localConfig};
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Redux.Middleware[] = [
    routerMiddleware(history),
    sagaMiddleware
  ];

  /** Add Only Dev. Middlewares */
  if (mergedConfig.env !== "production" && process.env.BROWSER) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  if (mergedConfig.sentry && process.env.BROWSER) {
    Raven.config(mergedConfig.sentry.dsn).setRelease(mergedConfig.sentry.release).install();
    middlewares.unshift(createRavenMiddleware(Raven));
  }

  const composeEnhancers = (mergedConfig.env !== "production" &&
    typeof window === "object" &&
    (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function") &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({shouldHotReload: false})) || compose;

  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));

  if (mergedConfig.env === "development" && (module as any).hot) {
    (module as any).hot.accept("./rootReducer", () => {
      store.replaceReducer((require("./rootReducer").default));
    });
  }

  return {
    ...store,
    close: () => store.dispatch(END),
    runSaga: sagaMiddleware.run
  };
}
