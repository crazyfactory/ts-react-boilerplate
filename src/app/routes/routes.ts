import {ComponentClass} from "react";
import {Action} from "redux";
import {actions} from "redux-router5";
import {AboutPage} from "../pages/AboutPage";
import {CounterPage} from "../pages/CounterPage";
import {HomePage} from "../pages/HomePage";
import {StarsPage} from "../pages/StarsPage";

interface IRoute {
  name: RoutablePages;
  path: string;
}
type RoutablePages = "homePage"
| "aboutPage"
| "counterPage"
| "starsPage";

type RouteConfig = Record<RoutablePages, Omit<IRoute, "name">>;
type RoutePageMap = Record<RoutablePages, ComponentClass>;
type RouteNavigate = Record<RoutablePages, (...params: any[]) => Action>;

function getRoutes(routeConfig: RouteConfig): Record<RoutablePages, IRoute> {
  return Object.keys(routeConfig)
    .map((key) => ({
      name: key,
      path: routeConfig[key].path
    }))
    .reduce(
      (a, c) => {
        a[c.name] = c;
        return a;
      },
      {} as any
    );
}

function getNavigateAction<T extends {[key: string]: any}>(routeName: RoutablePages, params?: T): Action {
  return actions.navigateTo(routeName, params);
}

const config: RouteConfig = {
  aboutPage: {path: "/about"},
  counterPage: {path: "/counter"},
  homePage: {path: "/"},
  starsPage: {path: "/stars"}
};

export const routes = getRoutes(config);

export const routePageMap: RoutePageMap = {
  aboutPage: AboutPage,
  counterPage: CounterPage,
  homePage: HomePage,
  starsPage: StarsPage
};

export const navigate: RouteNavigate = {
  aboutPage: () => getNavigateAction(routes.aboutPage.name),
  counterPage: () => getNavigateAction(routes.counterPage.name),
  homePage: () => getNavigateAction(routes.homePage.name),
  starsPage: () => getNavigateAction(routes.starsPage.name)
};
