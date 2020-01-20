import * as React from "react";
import {connect} from "react-redux";
import {ConnectedLink} from "react-router5";
import {createSelector} from "reselect";
import {stylesheet} from "typestyle";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {IStore} from "../redux/IStore";
import {getRoutes} from "../routes/routes";
import {translationsSelector} from "../selectors/translationsSelector";

const classNames = stylesheet({
  activeLink: {
    textDecoration: "underline"
  },
  nav: {
    $nest: {
      ul: {
        $nest: {
          li: {
            display: "inline",
            padding: "5px"
          }
        },
        listStyleType: "none",
        padding: 0
      }
    }
  }
});

interface IStateToProps {
  translations: {
    aboutUs: string;
    counter: string;
    home: string;
    stars: string;
  };
}

class Header extends React.Component<IStateToProps> {
  public render(): JSX.Element {
    const {translations} = this.props;
    const routes = getRoutes();
    return (
      <nav className={classNames.nav}>
        <ul>
          <li>
            <ConnectedLink activeClassName={classNames.activeLink} routeName={routes.homePage.name}>
              {translations.home}
            </ConnectedLink>
          </li>
          <li>
            <ConnectedLink activeClassName={classNames.activeLink} routeName={routes.aboutPage.name}>
              {translations.aboutUs}
            </ConnectedLink>
          </li>
          <li>
            <ConnectedLink activeClassName={classNames.activeLink} routeName={routes.counterPage.name}>
              {translations.counter}
            </ConnectedLink>
          </li>
          <li>
            <ConnectedLink activeClassName={classNames.activeLink} routeName={routes.starsPage.name}>
              {translations.stars}
            </ConnectedLink>
          </li>
        </ul>
      </nav>
    );
  }
}

const componentTranslationsSelector = createSelector(
  translationsSelector,
  (translations) => {
    const translator: ITranslator = new Translator(translations);
    return {
      aboutUs: translator.translate("About us"),
      counter: translator.translate("Counter"),
      home: translator.translate("Home"),
      stars: translator.translate("Stars")
    };
  }
);

function mapStateToProps(state: Pick<IStore, "settings">): IStateToProps {
  return {
    translations: componentTranslationsSelector(state)
  };
}

const connected = connect(mapStateToProps)(Header);
export {connected as Header, Header as UnconnectedHeader, mapStateToProps};
