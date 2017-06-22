import {renderComponent} from "../helpers/TestHelper";
import {About} from "./About";

describe("<About />", () => {

  const component = renderComponent(About);

  it("Renders header with text", () => {
    expect(component.find("h4 FormattedMessage")).toHaveProp("id", "about.us");
  });

});
