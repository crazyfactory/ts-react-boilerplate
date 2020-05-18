import {ConnectedComponent} from "react-redux";
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
export type RoutePageMap = Record<RoutablePages, ConnectedComponent<any, any>>;
type RouteNavigate = Record<RoutablePages, (...params: any[]) => Action>;

const config: RouteConfig = {
  aboutPage: {path: "/about"},
  counterPage: {path: "/counter"},
  homePage: {path: "/"},
  starsPage: {path: "/stars"}
};

export function getRoutes(baseUrl: string = ""): Record<RoutablePages, IRoute> {
  return Object.keys(config)
    .map((key) => ({
      name: key,
      path: baseUrl + config[key].path
    }))
    .reduce((a, c) => ({...a, [c.name]: c}), {} as any);
}

function getNavigateAction<T extends {[key: string]: any}>(routeName: RoutablePages, params?: T): Action {
  return actions.navigateTo(routeName, params);
}

const routes = getRoutes();

export const navigate: RouteNavigate = {
  aboutPage: () => getNavigateAction(routes.aboutPage.name),
  counterPage: () => getNavigateAction(routes.counterPage.name),
  homePage: () => getNavigateAction(routes.homePage.name),
  starsPage: () => getNavigateAction(routes.starsPage.name)
};
