import createRouter, {Router} from "router5";
import browserPlugin from "router5-plugin-browser";
import {MiddlewareFactory} from "router5/dist/types/router";
import {getRoutes} from "./routes";

export function configureRouter(baseUrl: string = ""): Router {
  const routes = getRoutes(baseUrl);
  const router = createRouter(Object.keys(routes).map((key) => routes[key]));
  router.usePlugin(browserPlugin({useHash: false}));

  const middlewares: MiddlewareFactory[] = [];

  router.useMiddleware(...middlewares);

  return router;
}
