import createRouter, {Router} from "router5";
import browserPlugin from "router5-plugin-browser";
import {MiddlewareFactory} from "router5/types/types/router";
import routes from "./routes";

export function configureRouter(): Router {
  const router = createRouter(routes);
  router.usePlugin(browserPlugin({useHash: false}));

  const middlewares: MiddlewareFactory[] = [];

  router.useMiddleware(...middlewares);

  return router;
}
