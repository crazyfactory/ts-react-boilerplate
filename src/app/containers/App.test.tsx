import {shallow} from "enzyme";
import * as React from "react";
import {IntlProvider} from "react-intl";
import {State as IRouteState} from "router5";
import {IState} from "../redux/modules/baseModule";
import {ILanguage} from "../redux/modules/languageModule";
import {styles, UnconnectedApp} from "./App";

describe("<App />", () => {
  const language: IState<ILanguage> = {
    payload: {
      languageData: {greeting: "Hello!"},
      locale: "en-GB"
    }
  };
  const route: IRouteState = {
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

  it("renders with correct style", () => {
    const component = shallow(<UnconnectedApp language={language} route={route}/>);
    expect(component.find("section")).toHaveClassName(styles.container);
  });

  it("renders IntlProvider with correct props", () => {
    const component = shallow(<UnconnectedApp language={language} route={route} />);
    expect(component.find(IntlProvider)).toHaveProp("locale", language.payload.locale);
    expect(component.find(IntlProvider)).toHaveProp("messages", language.payload.languageData);
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
