import {ISettings} from "../redux/modules/settingsModule";
import {IStars} from "../redux/modules/starsModule";

// Don't forget to enable this in production!
// tslint:disable:no-http-string

export const dummyApi = {
  getStars: (): Promise<IStars> => {
    return fetch("https://api.github.com/repos/barbar/vortigern").then((res) => res.json());
  },
  getTranslations: (payload: string): Promise<ISettings> => {
    return fetch(`http://localhost:8889/translation/${payload}`).then((res) => res.json());
  }
};
