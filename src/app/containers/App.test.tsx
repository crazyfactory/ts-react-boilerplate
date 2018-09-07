import {shallow} from "enzyme";
import * as React from "react";
import {IntlProvider} from "react-intl";
import {State as IRouteState} from "router5";
import {IState} from "../redux/modules/baseModule";
import {IMeta as ISettingsMeta, ISettings} from "../redux/modules/settingsModule";
import {mapStateToProps, styles, UnconnectedApp} from "./App";

describe("<App />", () => {
  const language: IState<ISettings, ISettingsMeta> = {
    meta: {
      locale: "en-GB"
    },
    payload: {
      translations: {greeting: "Hello!"}
    }
  };
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

  it("matches snapshot", () => {
    const component = shallow(<UnconnectedApp language={language} route={route}/>);
    expect(component).toMatchSnapshot();
  });

  it("maps state to props correctly", () => {
    const props = mapStateToProps({
      router: {route, previousRoute: route, transitionRoute: null, transitionError: null},
      settings: language
    });
    expect(props.language).toEqual(language);
    expect(props.route).toEqual(route);
  });

  it("renders with correct style", () => {
    const component = shallow(<UnconnectedApp language={language} route={route}/>);
    expect(component.find("section")).toHaveClassName(styles.container);
  });

  it("renders IntlProvider with correct props", () => {
    const component = shallow(<UnconnectedApp language={language} route={route} />);
    expect(component.find(IntlProvider)).toHaveProp("locale", language.meta.locale);
    expect(component.find(IntlProvider)).toHaveProp("messages", language.payload.translations);
  });

  it("renders Not Found when route is null", () => {
    const component = shallow(<UnconnectedApp language={language} route={null} />);
    expect(component.find("div")).toHaveText("Not found");
  });

  it("renders Not Found when segment is undefined", () => {
    const component = shallow(<UnconnectedApp language={language} route={routeUnavailable} />);
    expect(component.find("div")).toHaveText("Not found");
  });
});
