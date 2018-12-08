import {ITranslations} from "../redux/modules/settingsModule";

// Don't forget to enable this in production!
// tslint:disable:no-http-string

export const dummyApi = {
  getTranslations: (payload: string): Promise<ITranslations> => {
    return fetch(`http://localhost:8889/translation/${payload}`).then((res) => res.json());
  }
};
