import {shallow} from "enzyme";
import * as React from "react";
import {TestHelper} from "../helpers/TestHelper";
import {IAction} from "../redux/modules/baseModule";
import {ILanguage, SWITCH_LANGUAGE} from "../redux/modules/languageModule";
import {About, UnconnectedAbout} from "./About";

describe("<About />", () => {
  const component = new TestHelper()
    .withTranslation({locale: "en-GB", languageData: {"about.us": "About Us", "current.language": "Current Language"}})
    .mount(About);

  it("renders header with text", () => {
    expect(component.find("h4 FormattedMessage")).toHaveProp("id", "about.us");
  });

  it("calls switchLanguage() when button is clicked", () => {
    const spy = jest.spyOn(UnconnectedAbout.prototype, "switchLanguage");
    const shallowComponent = shallow(<UnconnectedAbout dispatch={jest.fn()} locale=""/>);

    expect(shallowComponent.find("button")).toBeDefined();
    expect(spy).not.toHaveBeenCalled();
    shallowComponent.find("button").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  describe("switchLanguage()", () => {
    it("dispatches SWITCH_LANGUAGE action to en-GB", () => {
      const dispatch = jest.fn();
      const shallowComponent = shallow(<UnconnectedAbout dispatch={dispatch} locale="" />);
      const expectedValue: IAction<ILanguage> = {
        payload: {
          languageData: {},
          locale: "en-GB"
        },
        type: SWITCH_LANGUAGE
      };

      expect(dispatch).not.toHaveBeenCalled();
      (shallowComponent as any).instance().switchLanguage();
      expect(dispatch).toHaveBeenCalledWith(expectedValue);
    });

    it("dispatches SWITCH_LANGUAGE action to de", () => {
      const dispatch = jest.fn();
      const shallowComponent = shallow(<UnconnectedAbout dispatch={dispatch} locale="en-GB"/>);
      const expectedValue: IAction<ILanguage> = {
        payload: {
          languageData: {},
          locale: "de"
        },
        type: SWITCH_LANGUAGE
      };

      expect(dispatch).not.toHaveBeenCalled();
      (shallowComponent as any).instance().switchLanguage();
      expect(dispatch).toHaveBeenCalledWith(expectedValue);
    });
  });

});
