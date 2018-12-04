import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
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
    return (
      <div>
        <h3><FormattedMessage id="current.language" defaultMessage="Current Language" />: {this.props.language}</h3>
        <button onClick={this.switchLanguage}>
          <FormattedMessage id="about.change" defaultMessage="Change language"/>
        </button>
        <h4><FormattedMessage id="about.us" defaultMessage="About Us" /></h4>
      </div>
    );
  }
}

interface IStateToProps {
  language: string;
}

interface IDispatchToProps {
  invokeChangeLanguage: (language: string) => void;
}

const mapStateToProps = (state: Pick<IStore, "settings">): IStateToProps => ({
  language: state.settings.language
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => {
  return {
    invokeChangeLanguage: (language: string) => dispatch(invokeChangeLanguage(language))
  };
};

const connectedAbout = connect<IStateToProps, IDispatchToProps>(mapStateToProps, mapDispatchToProps)(AboutPage);

export {AboutPage as UnconnectedAbout, connectedAbout as AboutPage, mapStateToProps};
