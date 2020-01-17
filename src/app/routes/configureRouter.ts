import createRouter, {Router} from "router5";
import browserPlugin from "router5-plugin-browser";
import {MiddlewareFactory} from "router5/types/types/router";
import {getRoutes} from "./routes";

export function configureRouter(baseUrl: string = ""): Router {
  const router = createRouter(Object.keys(getRoutes(baseUrl)).map((key) => getRoutes(baseUrl)[key]));
  router.usePlugin(browserPlugin({useHash: false}));

  const middlewares: MiddlewareFactory[] = [];

  router.useMiddleware(...middlewares);

  return router;
}
