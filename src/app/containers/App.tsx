import {normalize, setupPage} from "csstips";
import * as React from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {createRouteNodeSelector, RouterState} from "redux-router5";
import {createSelector} from "reselect";
import {State as IRouteState} from "router5";
import {cssRaw, cssRule, style} from "typestyle";
import {Header} from "../components";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {IStore} from "../redux/IStore";
import {translationsSelector} from "../selectors/translationsSelector";
import {AboutPage} from "./AboutPage";
import {CounterPage} from "./CounterPage";
import {HomePage} from "./HomePage";
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

const classNames = {
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
    stars: StarsPage
  };

  public render(): JSX.Element {
    const {route, translations: {notFound}} = this.props;
    const segment = route ? route.name.split(".")[0] : undefined;
    return (
      <section className={classNames.container}>
        <Helmet {...appConfig.app.head}/>
        <Header/>
        {segment && this.components[segment] ? React.createElement(this.components[segment]) : <div>{notFound}</div>}
      </section>
    );
  }
}

interface IStateToProps {
  route: IRouteState;
  translations: {
    notFound: string;
  };
}

const componentTranslationsSelector = createSelector(
  translationsSelector,
  (translations) => {
    const translator: ITranslator = new Translator(translations);
    return {
      notFound: translator.translate("Not found")
    };
  }
);

const mapStateToProps = (state: Pick<IStore, "router" | "settings">): IStateToProps & Partial<RouterState> => ({
  ...createRouteNodeSelector("")(state),
  translations: componentTranslationsSelector(state)
});

const connected = connect(mapStateToProps)(App);

export {classNames, connected as App, App as UnconnectedApp, mapStateToProps};
