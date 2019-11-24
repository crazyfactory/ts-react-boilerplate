import autobind from "autobind-decorator";
import * as React from "react";
import {Helmet} from "react-helmet";
import serialize from "serialize-javascript";
import {getStyles} from "typestyle";
import {IStore} from "../redux/IStore";

interface IHtmlProps {
  initialState?: Partial<IStore>;
  manifest?: {[key: string]: string};
  markup?: string;
}

export class Html extends React.Component<IHtmlProps> {
  public render(): JSX.Element {
    const head = Helmet.renderStatic();
    const {markup, initialState} = this.props;

    // styles from typestyle
    const renderStyles = <style id="styles-target">{getStyles()}</style>;

    // styles from css files
    const links = this.getFileNames(".css").map(
      (href, i) => <link key={i} href={href} rel="stylesheet" type="text/css"/>
    );

    // scripts
    const scripts = this.getFileNames(".js").map((src, i) => <script src={src} key={i}/>);

    const initialStateScript = (
      // tslint:disable-next-line:react-no-dangerous-html
      <script
        dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${serialize(initialState, {isJSON: true})};`}}
        charSet="UTF-8"
      />
    );

    return (
      <html>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          {renderStyles}
          {links}
          <link rel="shortcut icon" href="/favicon.ico"/>
        </head>
        <body>
          {/* tslint:disable-next-line:react-no-dangerous-html */}
          <main id="app" dangerouslySetInnerHTML={{__html: markup}}/>
          {initialStateScript}
          {scripts}
        </body>
      </html>
    );
  }

  @autobind
  private getFileNames(endsWith: string): string[] {
    const {manifest} = this.props;
    const scriptFileNames: string[] = [];
    Object.keys(manifest).forEach((key: string) => {
      if (manifest[key].endsWith(endsWith)) {
        scriptFileNames.push(manifest[key]);
      }
    });
    return scriptFileNames;
  }
}
