import {createAction} from "typesafe-actions";

export const increment = createAction("COUNTER/INCREMENT", (resolve) => {
  return () => resolve();
});

export const decrement = createAction("COUNTER/DECREMENT", (resolve) => {
  return () => resolve();
});
