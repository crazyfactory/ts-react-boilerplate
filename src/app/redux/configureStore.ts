import {init} from "@sentry/browser";
import {applyMiddleware, compose, createStore, Middleware, Store} from "redux";
import {createLogger} from "redux-logger";
import {router5Middleware} from "redux-router5";
import createSagaMiddleware, {END, Task} from "redux-saga";
import {Router} from "router5";
import {config as appConfig} from "../../../config";
import {IStore} from "./IStore";
import {sentryMiddleware} from "./middlewares/sentryMiddleware";
import rootReducer from "./rootReducer";

interface IExtendedStore extends Store<Partial<IStore>> {
  close: () => void;
  runSaga: (rootSaga: any) => Task;
}

export function configureStore(router: Router, initialState?: Partial<IStore>): IExtendedStore {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [
    router5Middleware(router),
    sagaMiddleware
  ];

  /** Add Only Dev. Middlewares */
  if (appConfig.env !== "production" && process.env.BROWSER) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  if (appConfig.sentry && appConfig.sentry.dsn && process.env.BROWSER) {
    middlewares.unshift(sentryMiddleware);

    init({
      dsn: appConfig.sentry.dsn,
      ...appConfig.sentry.options
    });
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
