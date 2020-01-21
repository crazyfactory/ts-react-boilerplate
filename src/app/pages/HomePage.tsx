import * as React from "react";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import {stylesheet} from "typestyle";
import {Color} from "../constants/Color";
import crazyImage from "../images/crazy.png";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {IStore} from "../redux/IStore";
import {translationsSelector} from "../selectors/translationsSelector";

const classNames = stylesheet({
  container: {
    color: Color.BLUE,
    textAlign: "center"
  }
});

interface IStateToProps {
  translations: {
    hello: string;
  };
}

class HomePage extends React.Component<IStateToProps> {
  public render(): JSX.Element {
    const {translations} = this.props;
    return (
      <div className={classNames.container}>
        <a href={"https://www.crazy-factory.com"}>
          <img alt={"crazy logo"} src={crazyImage}/>
        </a>
        <p>{translations.hello}</p>
      </div>
    );
  }
}

const componentTranslationsSelector = createSelector(
  translationsSelector,
  (translations) => {
    const translator: ITranslator = new Translator(translations);
    return {
      hello: translator.translate("Hello")
    };
  }
);

function mapStateToProps(state: Pick<IStore, "settings">): IStateToProps {
  return {
    translations: componentTranslationsSelector(state)
  };
}

const connected = connect(mapStateToProps)(HomePage);
export {connected as HomePage, HomePage as UnconnectedHomePage, mapStateToProps};
