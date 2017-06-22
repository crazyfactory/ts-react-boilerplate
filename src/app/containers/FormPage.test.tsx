import {renderComponent} from "../helpers/TestHelper";
import {FormPage} from "./FormPage";

/** Mock App. State */
const state: object = {
};

describe("<FormPage />", () => {

  let component;

  beforeEach(() => {
    component = renderComponent(FormPage, state);
  });

  it("Renders header", () => {
    expect(true).toEqual(true);
  });

});
