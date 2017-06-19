import {Promise} from "es6-promise";
import {IStars} from "../models/starsModel";

export default class TestApi {
  public getStars(): Promise<IStars> {
    return fetch("https://api.github.com/repos/barbar/vortigern").then((res) => res.json());
  }
}
