import {TestHelper} from "../helpers/TestHelper";
import {App, Styles} from "./App";

describe("<App />", () => {
  const component = (new TestHelper())
    .withState({language: {payload: {locale: "en", languageData: {}}}})
    .mount(App);

  it("Renders with correct style", () => {
    expect(component.find("section")).toHaveClassName(Styles.container);
  });

});
