import * as React from "react";
import {Helmet} from "react-helmet";
import {getStyles} from "typestyle";

interface IHtmlProps {
  manifest?: object;
  markup?: string;
  initialState?: any;
}

class Html extends React.Component<IHtmlProps, {}> {
  public render(): JSX.Element {
    const head = Helmet.renderStatic();
    const {markup, initialState} = this.props;

    // Styles
    const renderStyles = <style id="styles-target">{getStyles()}</style>;

    // Scripts
    const scripts = this.resolve(["vendor.js", "app.js"]);
    const renderScripts = scripts.map((src, i) =>
      <script src={src} key={i}/>
    );

    /* tslint:disable:react-no-dangerous-html */
    const initialStateScript = (
      <script
        dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${JSON.stringify(initialState)};`}}
              charSet="UTF-8"
      />
    );
    /* tslint:enable:react-no-dangerous-html */

    return (
      <html>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {renderStyles}
        <link rel="shortcut icon" href="/favicon.ico"/>
      </head>
      <body>
      {/* tslint:disable-next-line:react-no-dangerous-html */}
      <main id="app" dangerouslySetInnerHTML={{__html: markup}}/>
      {initialStateScript}
      {renderScripts}
      </body>
      </html>
    );
  }

  private resolve(files: string[]): string[] {
    return files.map((src) => {
      if (!this.props.manifest[src]) {
        return;
      }
      return this.props.manifest[src];
    }).filter((file) => file !== undefined);
  }

}

export {Html};
