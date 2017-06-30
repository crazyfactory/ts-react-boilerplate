import * as e6p from "es6-promise";
(e6p as any).polyfill();
import "isomorphic-fetch";

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router5";
import {setStylesTarget} from "typestyle";
import {App} from "./app/containers/App";
import {configureStore} from "./app/redux/configureStore";
import configureRouter from "./app/routes/configureRouter";
import rootSaga from "./app/sagas/rootSaga";
const router = configureRouter(true);

const store = configureStore(
  router,
  window.__INITIAL_STATE__
);
store.runSaga(rootSaga);
const app = (
  <Provider store={store} key="provider">
    <RouterProvider router={router}>
      <App/>
    </RouterProvider>
  </Provider>
);

router.start();

ReactDOM.render(
  app,
  document.getElementById("app")
);

setStylesTarget(document.getElementById("styles-target"));
