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
import {State as IRouteState} from "router5";
import {cssRaw, cssRule, style} from "typestyle";

import {Header} from "../components";
import {IStore} from "../redux/IStore";
import {IState} from "../redux/modules/baseModule";
import {ILanguage} from "../redux/modules/languageModule";
import {AboutPage} from "./AboutPage";
import {CounterPage} from "./CounterPage";
import {HomePage} from "./HomePage";
import {RegisterPage} from "./RegisterPage";
import {StarsPage} from "./StarsPage";

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

class App extends React.Component<IStateToProps, null> {
  private components: any = {
    about: AboutPage,
    counter: CounterPage,
    home: HomePage,
    register: RegisterPage,
    stars: StarsPage
  };

  constructor() {
    super();
    addLocaleData([...en, ...es, ...fr, ...de]);
  }

  public render(): JSX.Element {
    const {language, route} = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
      <IntlProvider locale={language.payload.locale} messages={language.payload.languageData}>
        <section className={Styles.container}>
          <Helmet {...appConfig.app.head}/>
          <Header />
          {segment && this.components[segment] ? React.createElement(this.components[segment]) : <div>Not found</div>}
        </section>
      </IntlProvider>
    );
  }
}

interface IStateToProps {
  language: IState<ILanguage>;
  route: IRouteState;
}

const mapStateToProps = (state: Partial<IStore>) => ({
  languages: state.language,
  ...routeNodeSelector("")(state)
});

const connectedApp = connect<IStateToProps, null, null>(mapStateToProps, null)(App);

export {connectedApp as App, App as UnconnectedApp, Styles}
