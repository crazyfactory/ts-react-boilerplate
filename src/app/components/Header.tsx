import * as React from "react";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import {style} from "typestyle";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {IStore} from "../redux/IStore";
import {translationsSelector} from "../selectors/translationsSelector";
import {Link} from "./Link";

const classNames = {
  nav: style({
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
  })
};

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
    return (
      <nav className={classNames.nav}>
        <ul>
          <li><Link name="home">{translations.home}</Link></li>
          <li><Link name="about">{translations.aboutUs}</Link></li>
          <li><Link name="counter">{translations.counter}</Link></li>
          <li><Link name="stars">{translations.stars}</Link></li>
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
export {connected as Header, Header as UnconnectedHeader};
