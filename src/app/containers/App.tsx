import {normalize, setupPage} from "csstips";
import * as React from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {routeNodeSelector} from "redux-router5";
import {cssRaw, cssRule, style} from "typestyle";

import {Header} from "../components";
import {About, Counter, Home, Stars} from "./index";

const appConfig = require("../../../config/main");

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
  private components: any = {
    about: About,
    counter: Counter,
    home: Home,
    stars: Stars
  };

  public render(): JSX.Element {
    const { route } = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
      <section className={Styles.container}>
        <Helmet {...appConfig.app.head}/>
        <Header />
        {React.createElement(this.components[segment]) || <div>Not found</div>}
      </section>
    );
  }
}

const connectedApp = connect(() => routeNodeSelector(""))(App);

export {connectedApp as App, Styles}
