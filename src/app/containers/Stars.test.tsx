import {renderComponent} from "../helpers/TestHelper";
import {IStore} from "../redux/IStore";
import {Stars} from "./Stars";

describe("<Stars />", () => {

  it("Renders stars", () => {
    const state: Partial<IStore> = {
      stars: {
        isFetching: false,
        payload: {
          stargazers_count: 61
        }
      }
    };

    const component = renderComponent(Stars, state);

    expect(component.find("div")).toHaveText("61");
  });

  it("Renders fetching", () => {
    const state: Partial<IStore> = {
      stars: {
        isFetching: true,
        payload: {
          stargazers_count: -1
        }
      }
    };

    const component = renderComponent(Stars, state);

    expect(component.find("div")).toHaveText("Fetching Stars..");
  });

});
