import {renderComponent} from "../helpers/TestHelper";
import {Counter} from "./Counter";

/** Mock App. State */
const state: object = {
  counter: {count: 1}
};

describe("<Counter />", () => {

  let component;

  beforeEach(() => {
    component = renderComponent(Counter, state);
  });

  it("Renders header", () => {
    expect(component.find("h4")).toHaveText("Counter Example");
  });

  it("Renders Increment and Decrement buttons", () => {
    expect(component.find("button")).toHaveLength(2);
  });

  it("Renders counter value", () => {
    expect(component.find("p")).toHaveText("1");
  });

  it("Calls the increment", () => {
    expect(component.find({name: "incBtn"})).toBeDefined();
    component.find({name: "incBtn"}).simulate("click");
    expect(component.find("p")).toHaveText("2");
  });

  it("Calls the decrement", () => {
    expect(component.find({name: "decBtn"})).toBeDefined();
    component.find({name: "decBtn"}).simulate("click");
    expect(component.find("p")).toHaveText("0");
  });

});
