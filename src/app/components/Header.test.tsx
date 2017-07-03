import {TestHelper} from "../helpers/TestHelper";
import {Header, Styles} from "./Header";

describe("<Header />", () => {

  const renderer = new TestHelper();
  const component = renderer
    .withTranslation({ languageData: { home: "Home", about: "About", counter: "Counter", stars: "Stars", register: "Register" }, locale: "en-GB" })
    .mount(Header);

  it("Renders with correct style", () => {
    expect(component.find("nav")).toHaveClassName(Styles.nav);
  });

});
