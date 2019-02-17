import {shallow} from "enzyme";
import * as React from "react";
import {ISettingsState} from "../redux/modules/settingsModule";
import {mapStateToProps, UnconnectedHeader} from "./Header";
import {Link} from "./Link";

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
    expect(wrapper.containsMatchingElement(<Link name="home">Home</Link>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<Link name="about">About Us</Link>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<Link name="counter">Counter</Link>)).toBeTruthy();
    expect(wrapper.containsMatchingElement(<Link name="stars">Stars</Link>)).toBeTruthy();
  });
});
