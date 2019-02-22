import {ITranslations} from "../redux/modules/settingsModule";
import {ITranslator} from "./TranslatorInterfaces";

export class Translator implements ITranslator {
  private readonly translations: ITranslations;

  constructor(translations: ITranslations) {
    this.translations = translations;
  }

  public translate(key: string): string {
    if (this.translations[key]) {
      return this.translations[key];
    }
    console.warn(`Translations: no key: "${key}" found`);
    return key;
  }
}
