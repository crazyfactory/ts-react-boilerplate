import {connect} from "react-redux";

const appConfig = require("../../../config/main");

import {Header} from "components";
import {normalize, setupPage} from "csstips";
import * as React from "react";
import {Helmet} from "react-helmet";
import {IntlProvider} from "react-intl";
import {addLocaleData} from "react-intl";
import * as de from "react-intl/locale-data/de";
import * as en from "react-intl/locale-data/en";
import * as es from "react-intl/locale-data/es";
import * as fr from "react-intl/locale-data/fr";

import {cssRaw, cssRule, style} from "typestyle";

// Global style
cssRaw(`@import url(https://fonts.googleapis.com/css?family=Roboto);`);
normalize();
cssRule(`body`, {
  fontFamily: "Roboto"
});
setupPage("#app");

// App container style
const Styles = {
  container: style({
    margin: 0,
    padding: 0,
    textAlign: "center"
  })
};

class App extends React.Component<any, any> {
  constructor() {
    super();
    addLocaleData([...en, ...es, ...fr, ...de]);
  }

  public render(): JSX.Element {
    return (
      <IntlProvider locale={this.props.languages.locale} messages={this.props.languages.languageData}>
        <section className={Styles.container}>
          <Helmet {...appConfig.app.head}/>
          <Header />
          {this.props.children}
        </section>
      </IntlProvider>
    );
  }
}

const connectedApp = connect((state) => ({languages: state.language}))(App);
export {connectedApp as App, Styles}
