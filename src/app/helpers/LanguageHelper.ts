import * as fs from "fs";

export class LanguageHelper {
  private readonly preferredLang: string;

  constructor(private requestedLanguage: string) {
    this.preferredLang = this.requestedLanguage.split(",")[0];
  }

  public static getDefaultLanguage(): string {
    return "en";
  }

  public static isSupported(language: string): boolean {
    return LanguageHelper.getSupportedLanguages().indexOf(language) !== -1;
  }

  private static getLanguageFileLocation(language: string): string {
    return `${__dirname}/../translations/${language.toLowerCase()}.json`;
  }

  private static getSupportedLanguages(): string[] {
    return ["en", "de"];
  }

  private static getLanguageData(language: string): object {
    return JSON.parse(fs.readFileSync(LanguageHelper.getLanguageFileLocation(language)).toString());
  }

  public getRequestLanguageData(): any {
    return LanguageHelper.getLanguageData(LanguageHelper.isSupported(this.preferredLang) ? this.preferredLang : "en");
  }

  public getRequestedLang(): string {
    return this.requestedLanguage;
  }

  public getPreferredLanguage(): string {
    return this.preferredLang;
  }
}
