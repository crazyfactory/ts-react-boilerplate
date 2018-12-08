import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {createSelector} from "reselect";
import {oc} from "../helpers/oc";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {IStore} from "../redux/IStore";
import {invokeChangeLanguage} from "../redux/modules/settingsModule";

class AboutPage extends React.Component<IStateToProps & IDispatchToProps> {
  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
    this.switchLanguage = this.switchLanguage.bind(this);
  }

  public switchLanguage(): void {
    const language = this.props.language === "en-US" ? "de" : "en-US";
    this.props.invokeChangeLanguage(language);
  }

  public render(): JSX.Element {
    const {language, translations: {aboutUs, change, currentLanguage}} = this.props;
    return (
      <div>
        <h3>{aboutUs}: {language}</h3>
        <button onClick={this.switchLanguage}>
          {change}
        </button>
        <h4>{currentLanguage}</h4>
      </div>
    );
  }
}

interface IStateToProps {
  language: string;
  translations: {
    aboutUs: string;
    change: string;
    currentLanguage: string;
  };
}

interface IDispatchToProps {
  invokeChangeLanguage: (language: string) => void;
}

const translationsSelector = (state: Pick<IStore, "settings">) => oc(state).settings.translations();

const componentTranslationsSelector = createSelector(
  translationsSelector,
  (translations) => {
    const translator: ITranslator = new Translator(translations);
    return {
      aboutUs: translator.translate("about.us"),
      change: translator.translate("about.change"),
      currentLanguage: translator.translate("current.language")
    };
  }
);

export const mapStateToProps = (state: Pick<IStore, "settings">): IStateToProps => ({
  language: state.settings.language,
  translations: componentTranslationsSelector(state)
});

export const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => {
  return {
    invokeChangeLanguage: (language: string) => dispatch(invokeChangeLanguage(language))
  };
};

const connectedAbout = connect<IStateToProps, IDispatchToProps>(mapStateToProps, mapDispatchToProps)(AboutPage);

export {AboutPage as UnconnectedAbout, connectedAbout as AboutPage};
