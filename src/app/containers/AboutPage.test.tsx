import {shallow} from "enzyme";
import * as React from "react";
import {IAction, IState} from "../redux/modules/baseModule";
import {ILanguage, SWITCH_LANGUAGE} from "../redux/modules/languageModule";
import {mapStateToProps, UnconnectedAbout} from "./AboutPage";

/* tslint:disable:no-empty jsx-no-lambda */
describe("<AboutPage />", () => {
  const language: IState<ILanguage> = {
    payload: {
      languageData: {greeting: "Hello!"},
      locale: "en-GB"
    }
  };

  it("matches snapshot", () => {
    const shallowComponent = shallow(<UnconnectedAbout dispatch={() => {}} locale=""/>);
    expect(shallowComponent).toMatchSnapshot();
  });

  it("maps state to props correctly", () => {
    const props = mapStateToProps({language});
    expect(props.locale).toEqual("en-GB");
  });

  it("calls switchLanguage() when button is clicked", () => {
    const spy = jest.spyOn(UnconnectedAbout.prototype, "switchLanguage");
    const shallowComponent = shallow(<UnconnectedAbout dispatch={() => {}} locale=""/>);

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
