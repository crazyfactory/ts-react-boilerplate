import {shallow} from "enzyme";
import * as React from "react";
import {renderComponent} from "../helpers/TestHelper";
import {IStore} from "../redux/IStore";
import {IAction} from "../redux/modules/baseModule";
import {DECREMENT, ICounter, INCREMENT} from "../redux/modules/counterModule";
import {Counter, UnconnectedCounter} from "./Counter";

/** Mock App. State */
const state: Partial<IStore> = {
  counter: {
    isFetching: false,
    payload: {
      count: 1
    }
  }
};

describe("<Counter />", () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Counter, state);
  });

  it("renders header", () => {
    expect(component.find("h4")).toHaveText("Counter Example");
  });

  it("renders Increment and Decrement buttons", () => {
    expect(component.find("button")).toHaveLength(2);
  });

  it("renders counter value", () => {
    expect(component.find("p")).toHaveText("1");
  });

  it("calls handleIncrement() when increment button is clicked", () => {
    const spy = jest.spyOn(UnconnectedCounter.prototype, "handleIncrement");
    const shallowComponent = shallow(<UnconnectedCounter dispatch={jest.fn()} count={0}/>);

    expect(shallowComponent.find({name: "incBtn"})).toBeDefined();
    expect(spy).not.toHaveBeenCalled();
    shallowComponent.find({name: "incBtn"}).simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("calls handleDecrement() when decrement button is clicked", () => {
    const spy = jest.spyOn(UnconnectedCounter.prototype, "handleDecrement");
    const shallowComponent = shallow(<UnconnectedCounter dispatch={jest.fn()} count={0}/>);

    expect(shallowComponent.find({name: "decBtn"})).toBeDefined();
    expect(spy).not.toHaveBeenCalled();
    shallowComponent.find({name: "decBtn"}).simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  describe("handleIncrement()", () => {
    it("dispatches INCREMENT action", () => {
      const dispatch = jest.fn();
      const shallowComponent = shallow(<UnconnectedCounter dispatch={dispatch} count={0}/>);
      const expectedValue: IAction<ICounter> = {
        type: INCREMENT
      };

      expect(dispatch).not.toHaveBeenCalled();
      (shallowComponent as any).instance().handleIncrement();
      expect(dispatch).toHaveBeenCalledWith(expectedValue);
    });
  });

  describe("handleDecrement()", () => {
    it("dispatches DECREMENT action", () => {
      const dispatch = jest.fn();
      const shallowComponent = shallow(<UnconnectedCounter dispatch={dispatch} count={0}/>);
      const expectedValue: IAction<ICounter> = {
        type: DECREMENT
      };

      expect(dispatch).not.toHaveBeenCalled();
      (shallowComponent as any).instance().handleDecrement();
      expect(dispatch).toHaveBeenCalledWith(expectedValue);
    });
  });
});
