import {shallow} from "enzyme";
import {Promise} from "es6-promise";
import * as React from "react";
import {renderComponent} from "../helpers/TestHelper";
import {RegisterForm, RegisterReduxForm} from "./RegisterForm";
describe("<RegisterForm />", () => {
  it("without props", () => {
    const component = renderComponent(RegisterReduxForm);
    expect(component).toMatchSnapshot();
  });

  it("when submitting button is disabled", () => {
    const component = renderComponent(RegisterReduxForm, {}, {submitting: true});
    expect(component).toMatchSnapshot();
  });

  it("when submitting button is enabled", () => {
    const component = renderComponent(RegisterReduxForm, {}, {submitting: false});
    expect(component).toMatchSnapshot();
  });

  it("when clear button is disabled", () => {
    const component = renderComponent(RegisterReduxForm, {}, {pristine: true});
    expect(component).toMatchSnapshot();
  });

  it("when clear button is enabled", () => {
    const component = renderComponent(RegisterReduxForm, {}, {pristine: false, submitting: false});
    expect(component).toMatchSnapshot();
  });

  // Event simulation is limited for Shallow rendering, not sure why CounterPage.test.tsx works
  it("calls reset func when clear button is clicked", () => {
    const reset = jest.fn();
    const onSubmit = () => new Promise((resolve) => resolve());
    const component = shallow(<RegisterForm reset={reset} onSubmit={onSubmit}/>);
    expect(component.find("button[type='button']")).toBeDefined();
    expect(reset).not.toHaveBeenCalled();
    component.find("button[type='button']").simulate("click");
    expect(reset).toHaveBeenCalled();
  });

  // Event simulation is limited for Shallow rendering, not sure why CounterPage.test.tsx works
  it("calls handleSubmit func when form is submitted", () => {
    const handleSubmit = jest.fn();
    const onSubmit = () => new Promise((resolve) => resolve());
    const component = shallow(<RegisterForm handleSubmit={handleSubmit} onSubmit={onSubmit}/>);
    expect(component.find("form")).toBeDefined();
    expect(handleSubmit).not.toHaveBeenCalled();
    component.find("form").simulate("submit");
    expect(handleSubmit).toHaveBeenCalled();
  });
});
