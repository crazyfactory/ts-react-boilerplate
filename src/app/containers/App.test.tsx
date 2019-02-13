import {shallow} from "enzyme";
import * as React from "react";
import {State as IRouteState} from "router5";
import {ISettingsState} from "../redux/modules/settingsModule";
import {classNames, mapStateToProps, UnconnectedApp} from "./App";
import {HomePage} from "./HomePage";

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
    language: "en",
    loaded: true,
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
    const wrapper = shallow(<UnconnectedApp route={route} translations={translations}/>);
    expect(wrapper.find("section")).toHaveClassName(classNames.container);
  });

  it("renders HomePage", () => {
    const wrapper = shallow(<UnconnectedApp route={route} translations={translations}/>);
    expect(wrapper.find(HomePage).length).toBe(1);
  });

  it("renders Not Found when route is null", () => {
    const wrapper = shallow(<UnconnectedApp route={null} translations={translations}/>);
    expect(wrapper.find("div")).toHaveText("Not Found");
  });

  it("renders Not Found when segment is undefined", () => {
    const wrapper = shallow(<UnconnectedApp route={routeUnavailable} translations={translations}/>);
    expect(wrapper.find("div")).toHaveText("Not Found");
  });
});
