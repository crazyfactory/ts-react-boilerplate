import {Promise} from "es6-promise";
import {ILanguage} from "../redux/modules/languageModule";
import {IStars} from "../redux/modules/starsModule";

export const dummyApi = {
  getLanguageData: (payload: string): Promise<ILanguage> => {
    return fetch(`http://localhost:8889/translation/${payload}`).then((res) => res.json());
  },
  getStars: () : Promise<IStars> => {
    return fetch("https://api.github.com/repos/barbar/vortigern").then((res) => res.json());
  }
};
