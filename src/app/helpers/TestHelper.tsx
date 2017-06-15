/** React Specific */
import {mount, ReactWrapper} from "enzyme";
import * as React from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import configureStore from "redux-mock-store";
import rootReducer from "../redux/rootReducer";

const fetchMock = require("fetch-mock");

/** Redux Mock Store Configuration */
import thunk from "redux-thunk";
import {IStore} from "../redux/IStore";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/** Render Component */
function renderComponent(ComponentClass: React.ComponentClass<any> | React.SFC<any> | React.ClassType<any, any, any> | string, state?: object, props?: object): ReactWrapper<IStore, any> {
  const store = createStore(rootReducer, state);

  return mount(
    <Provider store={store}>
      <ComponentClass {...props} />
    </Provider>
  );
}

export {mockStore, fetchMock, renderComponent};
