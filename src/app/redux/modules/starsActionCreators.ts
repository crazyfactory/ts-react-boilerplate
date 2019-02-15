import {createAsyncActions} from "./baseModule";

// tslint:disable-next-line:export-name
export const loadStarsCount = createAsyncActions(
  "STARS/LOAD_STARS_COUNT",
  "STARS/LOAD_STARS_COUNT_PENDING",
  "STARS/LOAD_STARS_COUNT_FULFILLED",
  "STARS/LOAD_STARS_COUNT_REJECTED"
)<null, null, number, null>();
