import {shallow} from "enzyme";
import * as React from "react";
import {ConnectedLink} from "react-router5";
import {ISettingsState} from "../redux/modules/settingsModule";
import {getRoutes} from "../routes/routes";
import {mapStateToProps, UnconnectedHeader} from "./Header";

describe("<Header />", () => {
  const translations = {
    aboutUs: "About Us",
    counter: "Counter",
    home: "Home",
    stars: "Stars"
  };

  it("maps state to props", () => {
    const settings: ISettingsState = {
      error: "",
      language: "en",
      loaded: true,
      pending: false,
      translations: {
        "About us": "About Us",
        "Counter": "Counter",
        "Home": "Home",
        "Stars": "Stars"
      }
    };
    const props = mapStateToProps({settings});
    expect(props).toEqual({
      translations
    });
  });

  it("contains links", () => {
    const wrapper = shallow(<UnconnectedHeader translations={translations}/>);
    const routes = getRoutes();
    expect(wrapper.containsMatchingElement(
      <ConnectedLink routeName={routes.homePage.name}>Home</ConnectedLink>)
    ).toBeTruthy();
    expect(wrapper.containsMatchingElement(
      <ConnectedLink routeName={routes.aboutPage.name}>About Us</ConnectedLink>)
    ).toBeTruthy();
    expect(wrapper.containsMatchingElement(
      <ConnectedLink routeName={routes.counterPage.name}>Counter</ConnectedLink>)
    ).toBeTruthy();
    expect(wrapper.containsMatchingElement(
      <ConnectedLink routeName={routes.starsPage.name}>Stars</ConnectedLink>)
    ).toBeTruthy();
  });
});
