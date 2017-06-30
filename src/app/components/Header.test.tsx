import {TestHelper} from "../helpers/TestHelper";
import {Header, Styles} from "./Header";

describe("<Header />", () => {

  const renderer = new TestHelper();
  const component = renderer.withTranslation({languageData: {
    about: "About",
    counter: "Counter",
    stars: "Stars"
  }, locale: "en-GB"}).mount(Header);

  it("Renders with correct style", () => {
    expect(component.find("nav")).toHaveClassName(Styles.nav);
  });

});
