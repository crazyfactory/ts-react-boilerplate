import {normalize, setupPage} from "csstips";
import * as React from "react";
import {Helmet} from "react-helmet";
import {addLocaleData, IntlProvider} from "react-intl";
import * as de from "react-intl/locale-data/de";
import * as en from "react-intl/locale-data/en";
import * as es from "react-intl/locale-data/es";
import * as fr from "react-intl/locale-data/fr";
import {connect} from "react-redux";
import {routeNodeSelector} from "redux-router5";

import {cssRaw, cssRule, style} from "typestyle";

import {Header} from "../components";
import {AboutPage, CounterPage, HomePage, StarsPage} from "./index";

const appConfig = require("../../../config/main");

// Global style
cssRaw(`@import url(https://fonts.googleapis.com/css?family=Roboto);`);
normalize();
setupPage("#app");
cssRule(`html, body`, {
  fontFamily: "Roboto",
  height: "auto"
});

// App container style
const Styles = {
  container: style({
    margin: 0,
    padding: 0,
    textAlign: "center"
  })
};

class App extends React.Component<any, any> {
  private components: any = {
    about: AboutPage,
    counter: CounterPage,
    home: HomePage,
    stars: StarsPage
  };
  constructor() {
    super();
    addLocaleData([...en, ...es, ...fr, ...de]);
  }

  public render(): JSX.Element {
    const { route } = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
      <IntlProvider locale={this.props.languages.payload.locale} messages={this.props.languages.payload.languageData}>
        <section className={Styles.container}>
          <Helmet {...appConfig.app.head}/>
          <Header />
          {React.createElement(this.components[segment]) || <div>Not found</div>}
        </section>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  languages: state.language,
  ...routeNodeSelector("")(state)
});

const connectedApp = connect(mapStateToProps)(App);

export {connectedApp as App, Styles}
