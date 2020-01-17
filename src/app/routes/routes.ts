import {ComponentClass} from "react";
import {Action} from "redux";
import {actions} from "redux-router5";

interface IRoute {
  name: RoutablePages;
  path: string;
}
type RoutablePages = "homePage"
| "aboutPage"
| "counterPage"
| "starsPage";

type RouteConfig = Record<RoutablePages, Omit<IRoute, "name">>;
export type RoutePageMap = Record<RoutablePages, ComponentClass>;
type RouteNavigate = Record<RoutablePages, (...params: any[]) => Action>;

const config: RouteConfig = {
  aboutPage: {path: "/about"},
  counterPage: {path: "/counter"},
  homePage: {path: "/"},
  starsPage: {path: "/stars"}
};

let cachedRoutes: Record<RoutablePages, IRoute> = null;
let cachedBaseUrl = "";

export function getRoutes(baseUrl: string = ""): Record<RoutablePages, IRoute> {
  if (!cachedRoutes || cachedBaseUrl !== baseUrl) {
    cachedRoutes = Object.keys(config)
      .map((key) => ({
        name: key,
        path: baseUrl + config[key].path
      }))
      .reduce((a, c) => ({...a, [c.name]: c}), {} as any);
    cachedBaseUrl = baseUrl;
  }
  return cachedRoutes;
}

function getNavigateAction<T extends {[key: string]: any}>(routeName: RoutablePages, params?: T): Action {
  return actions.navigateTo(routeName, params);
}

export const navigate: RouteNavigate = {
  aboutPage: () => getNavigateAction(getRoutes().aboutPage.name),
  counterPage: () => getNavigateAction(getRoutes().counterPage.name),
  homePage: () => getNavigateAction(getRoutes().homePage.name),
  starsPage: () => getNavigateAction(getRoutes().starsPage.name)
};
