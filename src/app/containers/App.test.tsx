import {shallow} from "enzyme";
import * as React from "react";
import {State as IRouteState} from "router5";
import {ISettingsState} from "../redux/modules/settingsModule";
import {mapStateToProps, styles, UnconnectedApp} from "./App";

describe("<App />", () => {
  const route: IRouteState = {
    meta: {id: 1, params: {}, options: {}, redirected: false},
    name: "home",
    params: {},
    path: "/"
  };
  const routeUnavailable: IRouteState = {
    name: "unavailable",
    params: {},
    path: "/"
  };
  const settings: ISettingsState = {
    error: "",
    language: "en-US",
    pending: false,
    translations: {"Not Found": "Not Found"}
  };
  const translations = {notFound: "Not Found"};

  it("maps state to props correctly", () => {
    const props = mapStateToProps({
      router: {route, previousRoute: route, transitionRoute: null, transitionError: null},
      settings
    });
    expect(props.route).toEqual(route);
    expect(props.translations).toEqual({notFound: "Not Found"});
  });

  it("renders with correct style", () => {
    const component = shallow(<UnconnectedApp route={route} translations={translations}/>);
    expect(component.find("section")).toHaveClassName(styles.container);
  });

  it("renders Not Found when route is null", () => {
    const component = shallow(<UnconnectedApp route={null} translations={translations}/>);
    expect(component.find("div")).toHaveText("Not Found");
  });

  it("renders Not Found when segment is undefined", () => {
    const component = shallow(<UnconnectedApp route={routeUnavailable} translations={translations}/>);
    expect(component.find("div")).toHaveText("Not Found");
  });
});
