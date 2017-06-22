import {Promise} from "es6-promise";
import {IStars} from "../models/starsModel";
import {ILanguageState} from "../redux/modules/languageModule";

export const dummyApi = {
  getLanguageData: (payload): Promise<ILanguageState> => {
    return fetch(`http://localhost:8889/translation/${payload}`).then((res) => res.json());
  },
  getStars: () : Promise<IStars> => {
    return fetch("https://api.github.com/repos/barbar/vortigern").then((res) => res.json());
  }
};
