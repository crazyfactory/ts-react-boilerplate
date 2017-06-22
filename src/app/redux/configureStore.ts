import {History} from "history";
const appConfig = require("../../../config/main");
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

  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Redux.Middleware[] = [
    routerMiddleware(history),
    sagaMiddleware
  ];

  /** Add Only Dev. Middlewares */
  if (appConfig.env !== "production" && process.env.BROWSER) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const composeEnhancers = (appConfig.env !== "production" &&
    typeof window === "object" &&
    (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function") &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({shouldHotReload: false})) || compose;

  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));

  if (appConfig.env === "development" && (module as any).hot) {
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
