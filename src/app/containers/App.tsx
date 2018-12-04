import {normalize, setupPage} from "csstips";
import * as React from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {createRouteNodeSelector, RouterState} from "redux-router5";
import {State as IRouteState} from "router5";
import {cssRaw, cssRule, style} from "typestyle";
import {Header} from "../components";
import {IStore} from "../redux/IStore";
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
  }

  public render(): JSX.Element {
    const {route} = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
      <section className={styles.container}>
        <Helmet {...appConfig.app.head}/>
        <Header/>
        {segment && this.components[segment] ? React.createElement(this.components[segment]) : <div>Not found</div>}
      </section>
    );
  }
}

interface IStateToProps {
  route: IRouteState;
}

const mapStateToProps = (state: Pick<IStore, "settings" | "router">): IStateToProps & Partial<RouterState> => ({
  ...createRouteNodeSelector("")(state)
});

const connectedApp = connect<IStateToProps>(mapStateToProps)(App);

export {connectedApp as App, App as UnconnectedApp, mapStateToProps, styles};
