import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {createSelector} from "reselect";
import {Button} from "../components/Button";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {IStore} from "../redux/IStore";
import {setLanguage as setLanguageActionCreator} from "../redux/modules/settingsActionCreators";
import {TLanguage} from "../redux/modules/settingsModule";
import {translationsSelector} from "../selectors/translationsSelector";

interface IStateToProps {
  language: string;
  translations: {
    aboutUs: string;
    change: string;
    currentLanguage: string;
  };
}

interface IDispatchToProps {
  setLanguage: (language: string) => void;
}

interface IProps extends IStateToProps, IDispatchToProps {}

class AboutPage extends React.Component<IProps> {
  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  public render(): JSX.Element {
    const {language, translations} = this.props;
    return (
      <div>
        <h3>{translations.aboutUs}: {language}</h3>
        <Button onClick={this.handleLanguageChange}>
          {translations.change}
        </Button>
        <h4>{translations.currentLanguage}</h4>
      </div>
    );
  }

  private handleLanguageChange(): void {
    const language = this.props.language === "en" ? "de" : "en";
    this.props.setLanguage(language);
  }
}

const componentTranslationsSelector = createSelector(
  translationsSelector,
  (translations) => {
    const translator: ITranslator = new Translator(translations);
    return {
      aboutUs: translator.translate("About us"),
      change: translator.translate("Change language"),
      currentLanguage: translator.translate("Current language")
    };
  }
);

export const mapStateToProps = (state: Pick<IStore, "settings">): IStateToProps => ({
  language: state.settings.language,
  translations: componentTranslationsSelector(state)
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => {
  return {
    setLanguage: (language: TLanguage) => dispatch(setLanguageActionCreator.invoke(language))
  };
};

const connected = connect(mapStateToProps, mapDispatchToProps)(AboutPage);
export {AboutPage as UnconnectedAboutPage, connected as AboutPage};
