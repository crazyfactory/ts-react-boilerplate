import {createAction} from "typesafe-actions";

export const increment = createAction("COUNTER/INCREMENT")();
export const decrement = createAction("COUNTER/DECREMENT")();
