import { ICounter } from 'models/counterModel';
import { IStars } from 'models/starsModel';

export interface IStore {
  counter: ICounter;
  stars: IStars;
};
