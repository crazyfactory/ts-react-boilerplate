/** React Specific */
import {mount, ReactWrapper} from "enzyme";
import * as React from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "../redux/rootReducer";

/** Redux Mock Store Configuration */
import {IStore} from "../redux/IStore";

/** Render Component */
function renderComponent(ComponentClass: React.ComponentClass<any> | React.SFC<any> | React.ClassType<any, any, any> | string, state?: object, props?: object): ReactWrapper<IStore, any> {
  const store = createStore(rootReducer, state);

  return mount(
    <Provider store={store}>
      <ComponentClass {...props} />
    </Provider>
  );
}

export {renderComponent};
