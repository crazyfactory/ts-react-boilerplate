import {IFS} from "../../../__mocks__/.fs";

jest.mock("fs");
import {LanguageHelper} from "./LanguageHelper";

const languages: string[] = ["en-US, en", "en-GB, en;q=0.7", "de"];

describe("LanguageHelper", () => {

  it("constructor accepts language and we're able to get it", () => {
    const lang = new LanguageHelper(languages[0]);
    expect(lang.getRequestLang()).toBe("en-US, en");
  });

  describe("getPreferredLanguage()", () => {
    it("returns the most preferred language", () => {
      const lang = new LanguageHelper(languages[0]);
      expect(lang.getPreferredLanguage()).toBe("en-US");
    });
  });

  describe("getDefaultLanguage()", () => {
    it("should return en-GB", () => {
      expect(LanguageHelper.getDefaultLanguage()).toBe("en-GB");
    });
  });

  describe("isSupported()", () => {
    it("should return true for 'de'", () => {
      expect(LanguageHelper.isSupported("de")).toBeTruthy();
      expect(LanguageHelper.isSupported("blah")).toBeFalsy();
    });
  });

  // not hundred percent sure how to test this one.
  describe("getRequestLanguageData()", () => {
    let fs: IFS;

    beforeEach(() => {
      fs = require("fs");
    });

    it("should return a language data object for a valid requested language", () => {
      const lang = new LanguageHelper("de");
      fs.__setFileContents("de.json", JSON.stringify({hello: "world"}));
      expect(lang.getRequestLanguageData()).toEqual({hello: "world"});
    });

    it("should return a default language data object for an invalid requested language", () => {
      fs.__setFileContents("en-gb.json", JSON.stringify({hello: "world"}));
      const lang = new LanguageHelper("invalid language");
      expect(lang.getRequestLanguageData()).toEqual({hello: "world"});
    });
  });
});
