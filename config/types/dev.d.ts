/**
 * Type declerations for global development variables
 */

// tslint:disable:interface-name

interface Window {
  // A hack for the Redux DevTools Chrome extension.
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  __INITIAL_STATE__?: any;
}

type Set<T> = any;

declare namespace jest {
  interface Matchers<R> {
    toBeChecked(): void;
    toBeDisabled(): void;
    toBeEmptyRender(): void;
    toContainReact(component: React.ReactElement<any>): void;
    toExist(): void;
    toHaveClassName(className: string): void;
    toHaveHTML(html: string): void;
    toHaveProp(propKey: object|string, propValue?: any): void;
    toHaveRef(refName: string): void;
    toHaveState(stateKey: object|string, stateValue?: any): void;
    toHaveStyle(styleKey: object|string, styleValue?: any): void;
    toHaveTagName(tagName: string): void;
    toHaveText(text: string): void;
    toHaveValue(value: any): void;
    toIncludeText(text: string): void;
    toMatchElement(element: React.ReactElement<any>): void;
    toMatchSelector(selector: string): void;
  }
}
