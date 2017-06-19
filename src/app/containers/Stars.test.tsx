import {renderComponent} from "../helpers/TestHelper";
import {Stars} from "./Stars";

/** Mock App. State */
const state: object = {
  stars: {
    isFetching: false,
    payload: {
      stargazers_count: 61
    }
  }
};

describe("<Counter />", () => {

  const component = renderComponent(Stars, state);

  it("Renders header", () => {
    expect(component.find("div")).toHaveText("61");
  });

});
