import { chai, renderComponent } from "../helpers/TestHelper";
import { App, Styles } from "./App";

describe("<App />", () => {

  const component = renderComponent(App);

  it("Renders with correct style", () => {
    chai.expect(component).to.have.className(Styles.container);
  });

});
