import {shallow} from "enzyme";
import {Promise} from "es6-promise";
import * as React from "react";
import {RegisterForm, RegisterReduxForm} from "./RegisterForm";
describe("<RegisterForm />", () => {
  it("matches snapshot when without props", () => {
    const component = <RegisterReduxForm />;
    expect(component).toMatchSnapshot();
  });

  it("matches snapshot when submitting button is disabled", () => {
    const component = <RegisterReduxForm submitting={true} />;
    expect(component).toMatchSnapshot();
  });

  it("matches snapshot when submitting button is enabled", () => {
    const component = <RegisterReduxForm submitting={false} />;
    expect(component).toMatchSnapshot();
  });

  it("matches snapshot when clear button is disabled", () => {
    const component = <RegisterReduxForm pristine={true} />;
    expect(component).toMatchSnapshot();
  });

  it("matches snapshot when clear button is enabled", () => {
    const component = <RegisterReduxForm pristine={false} submitting={false} />;
    expect(component).toMatchSnapshot();
  });

  it("calls reset func when clear button is clicked", () => {
    const reset = jest.fn();
    const onSubmit = () => new Promise((resolve) => resolve());
    const component = shallow(<RegisterForm reset={reset} onSubmit={onSubmit}/>);
    expect(component.find("button[type='button']")).toBeDefined();
    expect(reset).not.toHaveBeenCalled();
    component.find("button[type='button']").simulate("click");
    expect(reset).toHaveBeenCalled();
  });

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
