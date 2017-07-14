declare module "redux-router5/lib/router5Middleware" {
  function router5ReduxMiddleware(router: any): any;
  // noinspection TsLint
  export default router5ReduxMiddleware;
}

declare module "redux-router5/lib/router5Reducer" {
  import {Reducer} from "redux";
  const router5Reducer: Reducer<any>;
  // noinspection TsLint
  export default router5Reducer;
}

declare module "redux-router5/lib/routeNodeSelector" {
  function routeNodeSelector(routeNode: any, reducerKey?: string): any;
  // noinspection TsLint
  export default routeNodeSelector;
}

declare module "redux-router5/lib/actions" {
  import {Action} from "redux";
  export function navigateTo(name: string, params?: object, opts?: object): Action;
  export function cancelTransition(): Action;
  export function clearErrors(): Action;
  export function transitionStart(route: string, previousRoute: string): Action;
  export function transitionSuccess(route: string, previousRoute: string): Action;
  export function transitionError(route: string, previousRoute: string, transitionError: string): Action;
}

declare module "redux-router5/lib/actionTypes" {
  export const NAVIGATE_TO;
  export const CANCEL_TRANSITION;
  export const TRANSITION_ERROR;
  export const TRANSITION_SUCCESS;
  export const TRANSITION_START;
  export const CLEAR_ERRORS;
}
declare module "redux-router5" {
  import * as actions from "redux-router5/lib/actions";
  import * as actionTypes from "redux-router5/lib/actionTypes";
  import routeNodeSelector from "redux-router5/lib/routeNodeSelector";
  import router5Middleware from "redux-router5/lib/router5Middleware";
  import router5Reducer from "redux-router5/lib/router5Reducer";

  export {
    router5Middleware,
    router5Reducer,
    actions,
    actionTypes,
    routeNodeSelector
  };
}
