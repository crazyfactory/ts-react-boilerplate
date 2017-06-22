import {renderComponent} from "../helpers/TestHelper";
import {App, Styles} from "./App";

describe("<App />", () => {

  const component = renderComponent(App);

  it("Renders with correct style", () => {
    expect(component.find("section")).toHaveClassName(Styles.container);
  });

});
