import * as React from "react";
import * as Helmet from "react-helmet";
import { IStore } from "redux/IStore";
import { getStyles } from "typestyle";

interface IHtmlProps {
  manifest?: object;
  markup?: string;
  store?: Redux.Store<IStore>;
}

class Html extends React.Component<IHtmlProps, {}> {
  public render(): JSX.Element {
    const head = Helmet.rewind();
    const { markup, store } = this.props;

    // Styles
    const renderStyles = <style id="styles-target">{getStyles()}</style>;

    // Scripts
    const scripts = this.resolve(["vendor.js", "app.js"]);
    const renderScripts = scripts.map((src, i) =>
      <script src={src} key={i} />
    );

    /* tslint:disable */
    const initialState = (<script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(store.getState())};` }} charSet="UTF-8" />);
    /* tslint:enable */
    return (
      <html>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          {renderStyles}
          <link rel="shortcut icon" href="/favicon.ico" />
        </head>
        <body>
          {/* tslint:disable */}
          <main id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          {/* tslint:enable */}
          {initialState}
          {renderScripts}
        </body>
      </html>
    );
  }
  private resolve(files: string[]): string[] {
    return files.map((src) => {
      if (!this.props.manifest[src]) { return; }
      return "/public/" + this.props.manifest[src];
    }).filter((file) => file !== undefined);
  }

}

export { Html }
