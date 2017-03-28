/** React Specific */
import {mount, ReactWrapper} from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import configureStore from "redux-mock-store";
import rootReducer from "../redux/rootReducer";

const fetchMock = require("fetch-mock");

/** Redux Mock Store Configuration */
import thunk from "redux-thunk";
import {IStore} from "../redux/IStore";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/** Render Component */
function renderComponent(ComponentClass: any, state?: object, props?: object): ReactWrapper<IStore, any> {
  const store = createStore(rootReducer, state);

  return mount(
    <Provider store={store}>
      <ComponentClass {...props} />
    </Provider>
  );
}

const chai = require("chai");
const chaiEnzyme = require("chai-enzyme");
chai.use(chaiEnzyme());

export { mockStore, fetchMock, renderComponent, chai };
