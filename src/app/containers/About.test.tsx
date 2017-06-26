import {renderComponent} from "../helpers/TestHelper";
import {About} from "./About";

describe("<About />", () => {

  const component = renderComponent(About, {language: {payload: {locale: "en"}}});

  it("Renders header with text", () => {
    expect(component.find("h4 FormattedMessage")).toHaveProp("id", "about.us");
  });

});
