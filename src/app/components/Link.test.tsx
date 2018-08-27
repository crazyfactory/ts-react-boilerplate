import {shallow} from "enzyme";
import * as React from "react";
import {actions} from "redux-router5";
import createRouter from "router5";
import {UnconnectedLink} from "./Link";

/* tslint:disable:no-empty jsx-no-lambda */
describe("<Link />", () => {
  const routes = [
    {name: "home", path: "/"},
    {name: "about", path: "/about"},
    {name: "counter", path: "/counter"},
    {name: "register", path: "/register"},
    {name: "stars", path: "/stars"},
    {name: "products", path: "/products"},
    {name: "product", path: "/product/:id"},
    {name: "account", path: "/account"},
    {name: "account.orders", path: "/orders"},
    {name: "account.order", path: "/order/:id"}
  ];
  const router = createRouter(routes);

  it("renders href correctly", () => {
    let component;
    component = shallow(<UnconnectedLink name="home" dispatch={jest.fn()} />, {context: {router}});
    expect(component.find("a")).toHaveProp("href", "/");

    component = shallow(<UnconnectedLink name="product" params={{id: 10}} dispatch={jest.fn()} />, {context: {router}});
    expect(component.find("a")).toHaveProp("href", "/product/10");

    component = shallow(<UnconnectedLink name="account.order" params={{id: 10}} dispatch={jest.fn()} />, {context: {router}});
    expect(component.find("a")).toHaveProp("href", "/account/order/10");
  });

  it("renders active class", () => {
    router.setState({
      name: "account.order",
      params: {id: 10},
      path: "/"
    });

    const component = shallow(<UnconnectedLink name="account.order" params={{id: 10}} dispatch={jest.fn()} />, {context: {router}});
    expect(component.find("a")).toHaveClassName("active");
  });

  it("does not render active class", () => {
    router.setState({
      name: "home",
      params: {},
      path: "/"
    });

    const component = shallow(<UnconnectedLink name="about" dispatch={jest.fn()} />, {context: {router}});
    expect(component.find("a")).not.toHaveClassName("active");
  });

  it("calls dispatch with correct arguments when clicked", () => {
    const dispatch = jest.fn();
    const component = shallow(<UnconnectedLink name="home" dispatch={dispatch} />, {context: {router}});
    expect(dispatch).not.toHaveBeenCalled();
    component.find("a").simulate("click", { preventDefault(): void {} });
    expect(dispatch).toHaveBeenCalledWith(actions.navigateTo("home"));
  });
});
