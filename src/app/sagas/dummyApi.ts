import {ISettings} from "../redux/modules/settingsModule";
import {IStars} from "../redux/modules/starsModule";

// Don't forget to enable this in production!
// tslint:disable:no-http-string

export const dummyApi = {
  getStars: (): Promise<IStars | {error: string}> => {
    return fetch("https://api.github.com/repos/barbar/vortigern").then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((json) => ({error: json.message}));
    });
  },
  getTranslations: (payload: string): Promise<ISettings> => {
    return fetch(`http://localhost:8889/translation/${payload}`).then((res) => res.json());
  }
};
