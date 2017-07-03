import {TestHelper} from "../helpers/TestHelper";
import {App} from "./App";

describe("<App />", () => {
  const component = (new TestHelper())
    .withState({language: {payload: {locale: "en", languageData: {}}}})
    .mount(App);

  it("matches snapshot", () => {
    expect(component).toMatchSnapshot();
  });

});
