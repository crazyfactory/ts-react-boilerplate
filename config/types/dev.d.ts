/**
 * Type declerations for global development variables
 */

interface Window {
  // A hack for the Redux DevTools Chrome extension.
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  __INITIAL_STATE__?: any;
}

interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}
