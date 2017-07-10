import {shallow} from "enzyme";
import * as React from "react";
import {IState} from "../redux/modules/baseModule";
import {ILanguage} from "../redux/modules/languageModule";
import {
aol, email, mapStateToProps, matchedPwd, maxLength, minLength,
minValue, numberType, required, tooOld, UnconnectedCustomField
} from "./FormHelper";

describe("FormHelper", () => {

  describe("<CustomField />", () => {
    it("matches snapshot without error and warning", () => {
      const props = {
        defaultMessage: "Username",
        languageData: {
          username: "Username"
        },
        languageId: "username",
        meta: {
          active: false,
          error: false,
          touched: false,
          warning: false
        },
        type: "text"
      };
      const component = shallow(<UnconnectedCustomField {...props} />);
      expect(component).toMatchSnapshot();
    });

    it("matches snapshot with error when active or touched", () => {
      const props = {
        defaultMessage: "Username",
        languageData: {
          username: "Username"
        },
        languageId: "username",
        meta: {
          active: true,
          error: {id: "error", defaultMessage: "some error occurs"},
          touched: true,
          warning: false
        },
        type: "text"
      };
      const component = shallow(<UnconnectedCustomField {...props} />);
      expect(component).toMatchSnapshot();
    });

    it("matches snapshot with warning when active or touched", () => {
      const props = {
        defaultMessage: "Username",
        languageData: {
          username: "Username"
        },
        languageId: "username",
        meta: {
          active: true,
          error: false,
          touched: true,
          warning: {id: "warning", defaultMessage: "something needs to be warned"}
        },
        type: "text"
      };
      const component = shallow(<UnconnectedCustomField {...props} />);
      expect(component).toMatchSnapshot();
    });

    it("matches snapshot when placeholder falls back to defaultMessage when languageData key does not exist", () => {
      const props = {
        defaultMessage: "Username",
        languageData: {},
        languageId: "username",
        meta: {
          active: false,
          error: false,
          touched: false,
          warning: false
        },
        type: "text"
      };
      const component = shallow(<UnconnectedCustomField {...props} />);
      expect(component).toMatchSnapshot();
    });

    it("maps state to props correctly", () => {
      const language: IState<ILanguage> = {
        payload: {
          languageData: {greeting: "Hello!"},
          locale: "en-GB"
        }
      };
      const props = mapStateToProps({language});
      expect(props.languageData).toEqual(language.payload.languageData);
    });
  });

  describe("aol()", () => {
    it("invalidates aol email", () => {
      expect(aol("aol", "Really? You still use AOL for your email?")("pai@aol.com")).toEqual({
        defaultMessage: "Really? You still use AOL for your email?",
        id: "aol"
      });
    });

    it("validates email from other domains", () => {
      expect(aol("aol" , "Really? You still use AOL for your email?")("pai@pai.com")).toBeUndefined();
    });
  });

  describe("email()", () => {
    it("invalidates non email", () => {
      expect(email("invalidemail", "Invalid email format")("abcd")).toEqual({
        defaultMessage: "Invalid email format",
        id: "invalidemail"
      });
    });
    it("validates email correctly", () => {
      expect(email("invalidemail", "Invalid email format")("pai@pai.com")).toBeUndefined();
    });
  });

  describe("matchedPwd()", () => {
    it("invalidates unmatched passwords", () => {
      expect(matchedPwd("pwdunmatched", "Passwords not matched")("pass1", {password: "pass2"})).toEqual({
        defaultMessage: "Passwords not matched",
        id: "pwdunmatched"
      });
    });
    it("validates matched passwords", () => {
      expect(matchedPwd("pwdunmatched", "Passwords not matched")("pass", {password: "pass"})).toBeUndefined();
    });
  });

  describe("maxLength()", () => {
    it("invalidates too long string", () => {
      expect((maxLength("maxchar", "Must be {max} characters or less")(8)("123456789"))).toEqual({
        defaultMessage: "Must be {max} characters or less",
        id: "maxchar",
        values: {
          max: 8
        }
      });
    });
    it("validates ok string", () => {
      expect((maxLength("maxchar", "Must be {max} characters or less")(8)("12345678"))).toBeUndefined();
    });
  });

  describe("minLength()", () => {
    it("invalidates too short string", () => {
      expect((minLength("minchar", "Must be {min} characters or more")(8)("1234567"))).toEqual({
        defaultMessage: "Must be {min} characters or more",
        id: "minchar",
        values: {
          min: 8
        }
      });
    });
    it("validates ok string", () => {
      expect((minLength("minchar", "Must be {min} characters or more")(8)("12345678"))).toBeUndefined();
    });
  });

  describe("minValue()", () => {
    it("invalidates too little value", () => {
      expect(minValue("minvalue", "Must be at least {min}")(5)(0)).toEqual({
        defaultMessage: "Must be at least {min}",
        id: "minvalue",
        values: {
          min: 5
        }
      });
    });

    it("validates ok value", () => {
      expect(minValue("minvalue", "Must be at least {min}")(5)(10)).toBeUndefined();
    });
  });

  describe("numberType()", () => {
    it("invalidates non number", () => {
      expect(numberType("number", "Must be a number")("abcd")).toEqual({
        defaultMessage: "Must be a number",
        id: "number"
      });
    });

    it("validates number", () => {
      expect(numberType("number", "Must be a number")(5)).toBeUndefined();
    });
  });

  describe("required()", () => {
    it("invalidates falsy value", () => {
      expect(required("required", "This is required")(0)).toEqual({
        defaultMessage: "This is required",
        id: "required"
      });
    });

    it("validates truthy value", () => {
      expect(required("required", "This is required")("abcd")).toBeUndefined();
    });
  });

  describe("tooOld()", () => {
    it("invalidates number more than 65", () => {
      expect(tooOld("tooold", "You are too old for this")(70)).toEqual({
        defaultMessage: "You are too old for this",
        id: "tooold"
      });
    });

    it("validates number less than 65", () => {
      expect(tooOld("tooold", "You are too old for this")(65)).toBeUndefined();
    });
  });

});
