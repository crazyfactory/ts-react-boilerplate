import {shallow} from "enzyme";
import * as React from "react";
import {IAction, IState} from "../redux/modules/baseModule";
import {CHANGE_LOCALE, IMeta as ISettingsMeta, ISettings} from "../redux/modules/settingsModule";
import {mapStateToProps, UnconnectedAbout} from "./AboutPage";

/* tslint:disable:no-empty jsx-no-lambda */
describe("<AboutPage />", () => {
  const language: IState<ISettings, ISettingsMeta> = {
    meta: {
      locale: "en-GB"
    },
    payload: {
      translations: {greeting: "Hello!"}
    }
  };

  it("matches snapshot", () => {
    const shallowComponent = shallow(<UnconnectedAbout dispatch={jest.fn()} locale=""/>);
    expect(shallowComponent).toMatchSnapshot();
  });

  it("maps state to props correctly", () => {
    const props = mapStateToProps({settings: language});
    expect(props.locale).toEqual("en-GB");
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
    it("dispatches CHANGE_LOCALE action to en-GB", () => {
      const dispatch = jest.fn();
      const shallowComponent = shallow(<UnconnectedAbout dispatch={dispatch} locale="" />);
      const expectedValue: IAction<ISettings, ISettingsMeta> = {
        meta: {
          locale: "en-GB"
        },
        type: CHANGE_LOCALE
      };

      expect(dispatch).not.toHaveBeenCalled();
      (shallowComponent as any).instance().switchLanguage();
      expect(dispatch).toHaveBeenCalledWith(expectedValue);
    });

    it("dispatches CHANGE_LOCALE action to de", () => {
      const dispatch = jest.fn();
      const shallowComponent = shallow(<UnconnectedAbout dispatch={dispatch} locale="en-GB"/>);
      const expectedValue: IAction<ISettings, ISettingsMeta> = {
        meta: {
          locale: "de"
        },
        type: CHANGE_LOCALE
      };

      expect(dispatch).not.toHaveBeenCalled();
      (shallowComponent as any).instance().switchLanguage();
      expect(dispatch).toHaveBeenCalledWith(expectedValue);
    });
  });

});
