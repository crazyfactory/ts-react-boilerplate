import * as fs from "fs";

export class LanguageHelper {
  private preferedLang: string;
  constructor(private requestLanguage: string) {
    this.preferedLang = this.requestLanguage.split(",")[0];
  }

  public static getDefaultLanguage(): string {
    return "en-GB";
  }

  public static isSupported(language: string): boolean {
    return LanguageHelper.getSupportedLanguagesArray().indexOf(language) !== -1;
  }

  private static getLanguageFileLocation(language: string): string {
    return `${__dirname}/../translations/${language.toLowerCase()}.json`;
  }

  private static getSupportedLanguagesArray(): string[] {
    return ["en-GB", "en-US", "de"];
  }

  private static getLanguageData(language: string): object {
    return JSON.parse(fs.readFileSync(LanguageHelper.getLanguageFileLocation(language)).toString());
  }

  public getRequestLanguageData(): any {
    return LanguageHelper.getLanguageData(LanguageHelper.isSupported(this.preferedLang) ? this.preferedLang : "en-GB");
  }

  public getRequestLang(): string {
    return this.requestLanguage;
  }

  public getPreferredLanguage(): string {
    return this.preferedLang;
  }
}
