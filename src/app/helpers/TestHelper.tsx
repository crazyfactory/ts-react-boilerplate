/** React Specific */
import {mount, ReactWrapper} from "enzyme";
import * as React from "react";
import {IntlProvider} from "react-intl";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "../redux/rootReducer";

/** Redux Mock Store Configuration */
import {IStore} from "../redux/IStore";

/** Render Component */
function renderComponent(ComponentClass: React.ComponentClass<any> | React.SFC<any> | React.ClassType<any, any, any> | string, state?: object, props?: object): ReactWrapper<IStore, any> {
  const store = createStore(rootReducer, state);

  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <ComponentClass {...props} />
      </Provider>
    </IntlProvider>
  );
}

export {renderComponent};
