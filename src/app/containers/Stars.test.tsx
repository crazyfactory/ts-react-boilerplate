import { chai, renderComponent } from "../helpers/TestHelper";
import { Stars } from "./Stars";

/** Mock App. State */
const state: object = {
  stars: {
    count: 61,
    isFetching: false
  }
};

describe("<Counter />", () => {

  const component = renderComponent(Stars, state);

  it("Renders header", () => {
    chai.expect(component.find("div").text()).to.eql("61");
  });

});
