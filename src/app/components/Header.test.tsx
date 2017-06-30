import {TestHelper} from "../helpers/TestHelper";
import {Header, Styles} from "./Header";

describe("<Header />", () => {

  const renderer = new TestHelper();
  const component = renderer.withTranslation({locale: "en-GB", languageData: {}}).mount(Header);

  it("Renders with correct style", () => {
    expect(component.find("nav")).toHaveClassName(Styles.nav);
  });

});
