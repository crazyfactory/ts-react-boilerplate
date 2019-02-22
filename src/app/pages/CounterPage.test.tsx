import {shallow} from "enzyme";
import * as React from "react";
import {
  decrement as decrementActionCreator,
  increment as incrementActionCreator
} from "../redux/modules/counterActionCreators";
import {ICounterState} from "../redux/modules/counterModule";
import {ISettingsState} from "../redux/modules/settingsModule";
import {mapDispatchToProps, mapStateToProps, UnconnectedCounterPage} from "./CounterPage";

describe("<Counter />", () => {
  const translations = {
    counter: "Counter",
    decrement: "Decrement",
    increment: "Increment"
  };

  it("maps state to props correctly", () => {
    const settings: ISettingsState = {
      error: "",
      language: "en",
      loaded: true,
      pending: false,
      translations: {Counter: "Counter", Decrement: "Decrement", Increment: "Increment"}
    };
    const counter: ICounterState = {
      count: 10,
      error: "",
      loaded: false,
      pending: false
    };
    const props = mapStateToProps({counter, settings});
    expect(props).toEqual({
      count: 10,
      translations
    });
  });

  it("map dispatch to props correctly", () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);

    expect(dispatch).not.toHaveBeenCalledWith(decrementActionCreator());
    props.decrement();
    expect(dispatch).toHaveBeenCalledWith(decrementActionCreator());

    expect(dispatch).not.toHaveBeenCalledWith(incrementActionCreator());
    props.increment();
    expect(dispatch).toHaveBeenCalledWith(incrementActionCreator());
  });

  it("calls increment() when increment button is clicked", () => {
    const spied = jest.fn();
    const wrapper = shallow(
      <UnconnectedCounterPage count={0} increment={spied} decrement={jest.fn()} translations={translations}/>
    );
    expect(wrapper.find({name: "incBtn"})).toBeDefined();
    expect(spied).not.toHaveBeenCalled();
    wrapper.find({name: "incBtn"}).simulate("click");
    expect(spied).toHaveBeenCalled();
  });

  it("calls decrement() when decrement button is clicked", () => {
    const spied = jest.fn();
    const wrapper = shallow(
      <UnconnectedCounterPage count={0} increment={jest.fn()} decrement={spied} translations={translations}/>
    );
    expect(wrapper.find({name: "decBtn"})).toBeDefined();
    expect(spied).not.toHaveBeenCalled();
    wrapper.find({name: "decBtn"}).simulate("click");
    expect(spied).toHaveBeenCalled();
  });
});
