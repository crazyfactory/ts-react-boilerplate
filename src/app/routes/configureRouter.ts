import createRouter, {loggerPlugin, Router} from "router5";
import browserPlugin from "router5/plugins/browser";
import listenersPlugin from "router5/plugins/listeners";
import routes from "./routes";

export default function configureRouter(useListenersPlugin: boolean = false): Router {
  const router = createRouter(routes)
    .usePlugin(loggerPlugin)
    .usePlugin(browserPlugin({useHash: false}));

  if (useListenersPlugin) {
    router.usePlugin(listenersPlugin());
  }

  return router;
}
