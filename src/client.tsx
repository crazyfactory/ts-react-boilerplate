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

const store = configureStore(
  browserHistory,
  window.__INITIAL_STATE__
);
store.runSaga(rootSaga);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router
      history={history}
    >
      {routes}
    </Router>
  </Provider>,
  document.getElementById("app")
);

setStylesTarget(document.getElementById("styles-target"));
