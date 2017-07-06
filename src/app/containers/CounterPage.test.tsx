import {shallow} from "enzyme";
import * as React from "react";
import {IAction} from "../redux/modules/baseModule";
import {DECREMENT, ICounter, INCREMENT} from "../redux/modules/counterModule";
import {UnconnectedCounter} from "./CounterPage";

/* tslint:disable:no-empty jsx-no-lambda */
describe("<Counter />", () => {
  it("matches snapshot when count > 0", () => {
    const component = shallow(<UnconnectedCounter count={10} dispatch={jest.fn()} />);
    expect(component).toMatchSnapshot();
  });

  it("matches snapshot when count <= 0", () => {
    const component = shallow(<UnconnectedCounter count={0} dispatch={jest.fn()} />);
    expect(component).toMatchSnapshot();
  });

  it("calls handleIncrement() when increment button is clicked", () => {
    const spy = jest.spyOn(UnconnectedCounter.prototype, "handleIncrement");
    const shallowComponent = shallow(<UnconnectedCounter dispatch={() => {}} count={0}/>);

    expect(shallowComponent.find({name: "incBtn"})).toBeDefined();
    expect(spy).not.toHaveBeenCalled();
    shallowComponent.find({name: "incBtn"}).simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("calls handleDecrement() when decrement button is clicked", () => {
    const spy = jest.spyOn(UnconnectedCounter.prototype, "handleDecrement");
    const shallowComponent = shallow(<UnconnectedCounter dispatch={() => {}} count={0}/>);

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
