declare module "react-router5" {
  import { Component, Props } from "react";
  import { Router } from "router5";

  interface IRouteOptions {
    reload?: boolean;
  }

  interface ILinkProps extends Props<Link> {
    router?: Router;
    routeName: string;
    routeParams?: {};
    routeOptions?: IRouteOptions;
    activeClassName?: string;
    activeStrict?: boolean;
    onClick?: () => any;
  }

  interface IRouterProviderProps {
    router: Router;
  }

  class BaseLink extends Component<ILinkProps, {}> { }
  // noinspection TsLint
  class Link extends Component<ILinkProps, {}> { }
  // noinspection TsLint
  class RouterProvider extends Component<IRouterProviderProps, {}> { }

  function routeNode(nodeName: string, register?: boolean): (hoc: any) => any;

  function withRoute<C>(BaseComponent: C): C;

  export {
    BaseLink,
    routeNode,
    RouterProvider,
    withRoute,
    Link
  };
}
