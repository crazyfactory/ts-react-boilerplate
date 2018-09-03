import {normalize, setupPage} from "csstips";
import * as React from "react";
import {Helmet} from "react-helmet";
import {addLocaleData, IntlProvider} from "react-intl";
import * as de from "react-intl/locale-data/de";
import * as en from "react-intl/locale-data/en";
import * as es from "react-intl/locale-data/es";
import * as fr from "react-intl/locale-data/fr";
import {connect} from "react-redux";
import {createRouteNodeSelector} from "redux-router5";
import {State as IRouteState} from "router5";
import {cssRaw, cssRule, style} from "typestyle";

import {Header} from "../components";
import {IStore} from "../redux/IStore";
import {IState} from "../redux/modules/baseModule";
import {IMeta as ISettingsMeta, ISettings} from "../redux/modules/settingsModule";
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
const styles = {
  container: style({
    margin: 0,
    padding: 0,
    textAlign: "center"
  })
};

class App extends React.Component<IStateToProps> {
  private components: {[key: string]: React.ComponentClass} = {
    about: AboutPage,
    counter: CounterPage,
    home: HomePage,
    register: RegisterPage,
    stars: StarsPage
  };

  constructor(props: IStateToProps) {
    super(props);
    addLocaleData([...en, ...es, ...fr, ...de]);
  }

  public render(): JSX.Element {
    const {language, route} = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
      <IntlProvider locale={language.meta.locale} messages={language.payload.translations}>
        <section className={styles.container}>
          <Helmet {...appConfig.app.head}/>
          <Header/>
          {segment && this.components[segment] ? React.createElement(this.components[segment]) : <div>Not found</div>}
        </section>
      </IntlProvider>
    );
  }
}

interface IStateToProps {
  language: IState<ISettings, ISettingsMeta>;
  route: IRouteState;
}

const mapStateToProps = (state: Pick<IStore, "settings" | "router">) => ({
  language: state.settings,
  ...createRouteNodeSelector("")(state)
});

const connectedApp = connect<IStateToProps>(mapStateToProps)(App);

export {connectedApp as App, App as UnconnectedApp, mapStateToProps, styles};
