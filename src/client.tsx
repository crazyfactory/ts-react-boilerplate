const appConfig = require("../config/main");

import * as e6p from "es6-promise";
(e6p as any).polyfill();
import "isomorphic-fetch";

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {setStylesTarget} from "typestyle";
import {App} from "./app/containers";
import {configureStore} from "./app/redux/configureStore";
import {configureRouter} from "./app/routes/configureRouter";
import rootSaga from "./app/sagas/rootSaga";

const ReactHotLoader = appConfig.env !== "production"
  ? require("react-hot-loader").AppContainer
  : ({ children }) => React.Children.only(children);

const router = configureRouter();
const store = configureStore(
  router,
  window.__INITIAL_STATE__
);
store.runSaga(rootSaga);

ReactDOM.render(
  <ReactHotLoader>
    <Provider store={store} key="provider">
      <App/>
    </Provider>
  </ReactHotLoader>,
  document.getElementById("app")
);

setStylesTarget(document.getElementById("styles-target"));

if ((module as any).hot) {
  (module as any).hot.accept("./app/routes/routes", () => {
    const {App} = require("./app/containers");
    ReactDOM.render(
      <ReactHotLoader>
        <Provider store={store}>
          <App/>
        </Provider>
      </ReactHotLoader>,
      document.getElementById("app"));
  });
}
