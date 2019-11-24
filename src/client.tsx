import * as e6p from "es6-promise";
(e6p as any).polyfill();
import "cross-fetch/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router5";
import {setStylesTarget} from "typestyle";
import {config as appConfig} from "../config";
import {App} from "./app/containers/App";
import {configureStore} from "./app/redux/configureStore";
import {setLanguage} from "./app/redux/modules/settingsActionCreators";
import {configureRouter} from "./app/routes/configureRouter";
import rootSaga from "./app/sagas/rootSaga";

const ReactHotLoader = appConfig.env !== "production"
  ? require("react-hot-loader").AppContainer
  : ({ children }) => React.Children.only(children);

const renderOrHydrate = appConfig.ssr ? ReactDOM.hydrate : ReactDOM.render;

const router = configureRouter();
const store = configureStore(router, window.__INITIAL_STATE__);
let sagaTask = store.runSaga(rootSaga);
if (!appConfig.ssr) {
  store.dispatch(setLanguage.invoke("en"));
}
router.start();
renderOrHydrate(
  (
    <ReactHotLoader>
      <Provider store={store} key="provider">
        <RouterProvider router={router}>
          <App/>
        </RouterProvider>
      </Provider>
    </ReactHotLoader>
  ),
  document.getElementById("app")
);

setStylesTarget(document.getElementById("styles-target"));

if ((module as any).hot) {
  (module as any).hot.accept("./app/containers/App", () => {
    const {App: NewApp} = require("./app/containers/App");
    renderOrHydrate(
      (
        <ReactHotLoader>
          <Provider store={store}>
            <RouterProvider router={router}>
              <NewApp/>
            </RouterProvider>
          </Provider>
        </ReactHotLoader>
      ),
      document.getElementById("app")
    );
  });

  (module as any).hot.accept("./app/sagas/rootSaga", () => {
    sagaTask.cancel();
    sagaTask.toPromise().then(() => {
      sagaTask = store.runSaga(require("./app/sagas/rootSaga").default);
    });
  });
}
