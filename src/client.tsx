import * as e6p from "es6-promise";
(e6p as any).polyfill();
import "isomorphic-fetch";

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {setStylesTarget} from "typestyle";
import {App} from "./app/containers/App";
import {configureStore} from "./app/redux/configureStore";
import configureRouter from "./app/routes/configureRouter";
import rootSaga from "./app/sagas/rootSaga";

const router = configureRouter();
const store = configureStore(
  router,
  window.__INITIAL_STATE__
);
store.runSaga(rootSaga);
const app = (
  <Provider store={store} key="provider">
      <App/>
  </Provider>
);

router.start();

ReactDOM.render(
  app,
  document.getElementById("app")
);

setStylesTarget(document.getElementById("styles-target"));
