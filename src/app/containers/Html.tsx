import autobind from "autobind-decorator";
import React from "react";
import {Helmet} from "react-helmet";
import serialize from "serialize-javascript";
import {getStyles} from "typestyle";
import {IStore} from "../redux/IStore";

interface IHtmlProps {
  manifest?: {[key: string]: string};
  markup?: string;
  initialState?: Partial<IStore>;
}

export class Html extends React.Component<IHtmlProps> {
  public render(): JSX.Element {
    const head = Helmet.renderStatic();
    const {markup, initialState} = this.props;

    // Styles
    const renderStyles = <style id="styles-target">{getStyles()}</style>;

    // Scripts
    const scripts = this.getScriptFileNames().map((src, i) => <script src={src} key={i}/>);

    const initialStateScript = (
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
  private getScriptFileNames(): string[] {
    const {manifest} = this.props;
    const scriptFileNames: string[] = [];
    Object.keys(manifest).forEach((key: string) => {
      if (manifest[key].endsWith(".js")) {
        scriptFileNames.push(manifest[key]);
      }
    });
    return scriptFileNames;
  }
}
