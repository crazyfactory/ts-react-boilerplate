const appConfig = require("../config/main");

import * as e6p from "es6-promise";
(e6p as any).polyfill();
import "isomorphic-fetch";

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
const {Router, browserHistory} = require("react-router");
import {syncHistoryWithStore} from "react-router-redux";
import {setStylesTarget} from "typestyle";
import {configureStore} from "./app/redux/configureStore";
import routes from "./app/routes/routes";
import rootSaga from "./app/sagas/rootSaga";

const ReactHotLoader = appConfig.env !== "production"
  ? require("react-hot-loader").AppContainer
  : ({ children }) => React.Children.only(children);

const store = configureStore(
  browserHistory,
  window.__INITIAL_STATE__
);
store.runSaga(rootSaga);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <ReactHotLoader>
    <Provider store={store} key="provider">
      <Router
        history={history}
      >
        {routes}
      </Router>
    </Provider>
  </ReactHotLoader>,
  document.getElementById("app")
);

setStylesTarget(document.getElementById("styles-target"));

if ((module as any).hot) {
  (module as any).hot.accept("./app/routes/routes", () => {
    const nextRoutes = require("./app/routes/routes").default;
    ReactDOM.render(
      <ReactHotLoader>
        <Provider store={store}>
          <Router key={Math.random()} history={history} routes={nextRoutes} />
        </Provider>
      </ReactHotLoader>,
      document.getElementById("app"));
  });
}
