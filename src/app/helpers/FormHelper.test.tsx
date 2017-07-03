import {
  aol, email, matchedPwd, maxLength, minLength, minValue,
  numberType, renderField, required, tooOld
} from "../helpers/FormHelper";
import { TestHelper } from "../helpers/TestHelper";

describe("FormHelper", () => {

  describe("<renderField />", () => {
    it("without error and warning", () => {
      const props = {
        input: {},
        label: "username",
        meta: {
          active: false,
          error: false,
          touched: false,
          warning: false
        },
        type: "text"
      };
      const renderer = new TestHelper();
      const component = renderer.withProps(props).mount(renderField);
      expect(component).toMatchSnapshot();
    });

    it("with error when active or touched", () => {
      const props = {
        input: {},
        label: "username",
        meta: {
          active: true,
          error: true,
          touched: true,
          warning: false
        },
        type: "text"
      };
      const renderer = new TestHelper();
      const component = renderer.withProps(props).mount(renderField);
      expect(component).toMatchSnapshot();
    });

    it("with warning when active or touched", () => {
      const props = {
        input: {},
        label: "username",
        meta: {
          active: true,
          error: false,
          touched: true,
          warning: true
        },
        type: "text"
      };
      const renderer = new TestHelper();
      const component = renderer.withProps(props).mount(renderField);
      expect(component).toMatchSnapshot();
    });
  });

  describe("aol()", () => {
    it("invalidates aol email", () => {
      expect(aol("pai@aol.com")).toEqual("Really? You still use AOL for your email?");
    });

    it("validates email from other domains", () => {
      expect(aol("pai@pai.com")).toBeUndefined();
    });
  });

  describe("email()", () => {
    it("invalidates non email", () => {
      expect(email("abcd")).toEqual("Invalid email address");
    });
    it("validates email correctly", () => {
      expect(email("pai@pai.com")).toBeUndefined();
    });
  });

  describe("matchedPwd()", () => {
    it("invalidates unmatched passwords", () => {
      expect(matchedPwd("pass1", {password: "pass2"})).toEqual("Passwords not matched");
    });
    it("validates matched passwords", () => {
      expect(matchedPwd("pass", {password: "pass"})).toBeUndefined();
    });
  });

  describe("maxLength()", () => {
    it("invalidates too long string", () => {
      expect((maxLength(8)("123456789"))).toEqual("Must be 8 characters or less");
    });
    it("validates ok string", () => {
      expect((maxLength(8)("12345678"))).toBeUndefined();
    });
  });

  describe("minLength()", () => {
    it("invalidates too short string", () => {
      expect((minLength(8)("1234567"))).toEqual("Must be 8 characters or more");
    });
    it("validates ok string", () => {
      expect((minLength(8)("12345678"))).toBeUndefined();
    });
  });

  describe("minValue()", () => {
    it("invalidates too little value", () => {
      expect(minValue(5)(0)).toEqual("Must be at least 5");
    });

    it("validates ok value", () => {
      expect(minValue(5)(10)).toBeUndefined();
    });
  });

  describe("numberType()", () => {
    it("invalidates non number", () => {
      expect(numberType("abcd")).toEqual("Must be a number");
    });

    it("validates number", () => {
      expect(numberType(5)).toBeUndefined();
    });
  });

  describe("required()", () => {
    it("invalidates falsy value", () => {
      expect(required(0)).toEqual("Required");
    });

    it("validates truthy value", () => {
      expect(required("abcd")).toBeUndefined();
    });
  });

  describe("tooOld()", () => {
    it("invalidates number more than 65", () => {
      expect(tooOld(70)).toEqual("You might be too old for this");
    });

    it("validates number less than 65", () => {
      expect(tooOld(65)).toBeUndefined();
    });
  });

});
