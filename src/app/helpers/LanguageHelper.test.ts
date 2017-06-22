import {IFS} from "../../../__mocks__/.fs";

jest.mock("fs");
import {LanguageHelper} from "./LanguageHelper";

const languages: string[] = ["en-US, en", "en-GB, en;q=0.7", "de"];

describe("LanguageHelper", () => {

  it("constructor accepts language and we're able to get it", () => {
    const lang = new LanguageHelper(languages[0]);
    expect(lang.getRequestLang()).toBe("en-US, en");
  });

  describe("getLanguage", () => {

    it("returns the most preferred language", () => {
      const lang = new LanguageHelper(languages[0]);
      expect(lang.getPreferedLanguage()).toBe("en-US");
    });

  });

  describe("getDefaultLanguage()", () => {
    it("should return en-GB", () => {
      expect(LanguageHelper.getDefaultLanguage()).toBe("en-GB");
    });
  });

  describe("isSupported", () => {

    it("should return true for 'de'", () => {
      expect(LanguageHelper.isSupported("de")).toBeTruthy();
      expect(LanguageHelper.isSupported("blah")).toBeFalsy();
    });

  });

  // not hundred percent sure how to test this one.
  describe("getLanguageData", () => {

    let fs: IFS;

    beforeEach(() => {
      fs = require("fs");
    });

    it("should return an object for a valid language", () => {
      const lang = new LanguageHelper("de");
      fs.__setFileContents("de.json", JSON.stringify({hello: "world"}));
      expect(lang.getRequestLanguageData()).toBeDefined();
    });

    it("should return for invalid languages", () => {
      fs.__setFileContents("en-gb.json", JSON.stringify({hello: "world"}));
      const lang = new LanguageHelper("<invalid language>");
      expect(lang.getRequestLanguageData()).toBeDefined();
    });

    it("should return default language data for invalid languages", () => {
      const defaultLangInstance = new LanguageHelper(LanguageHelper.getDefaultLanguage());
      const invalidLangInstance = new LanguageHelper("invalid language");
      expect(invalidLangInstance.getRequestLanguageData()).toEqual(defaultLangInstance.getRequestLanguageData());
    });
  });
});
