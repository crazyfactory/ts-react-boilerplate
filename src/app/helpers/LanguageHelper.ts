import fs from "fs";

export class LanguageHelper {
  private readonly preferredLanguage: string;

  constructor(private requestedLanguage: string) {
    this.preferredLanguage = this.requestedLanguage.split(",")[0];
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

  private static getTranslations(language: string): object {
    return JSON.parse(fs.readFileSync(LanguageHelper.getLanguageFileLocation(language)).toString());
  }

  public getPreferredLanguage(): string {
    return this.preferredLanguage;
  }

  public getRequestedLanguage(): string {
    return this.requestedLanguage;
  }

  public getTranslations(): any {
    return LanguageHelper.getTranslations(
      LanguageHelper.isSupported(this.preferredLanguage) ? this.preferredLanguage : "en"
    );
  }
}
