import * as Sentry from "@sentry/browser";
import {Middleware, Store} from "redux";
import {IStore} from "../IStore";

export const sentryMiddleware: Middleware = (store: Store<IStore>) => (next) => (action) => {
  Sentry.addBreadcrumb({
    category: "redux-action",
    data: {
      action,
      store: store.getState()
    },
    message: action.type
  });
  return next(action);
};
