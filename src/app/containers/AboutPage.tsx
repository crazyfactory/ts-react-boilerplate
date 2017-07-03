import * as React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {IStore} from "../redux/IStore";
import {IDispatchToProps} from "../redux/modules/baseModule";
import {switchLanguage} from "../redux/modules/languageModule";

class AboutPage extends React.Component<IStateToProps & IDispatchToProps, null> {
  constructor() {
    super();
    this.switchLanguage = this.switchLanguage.bind(this);
  }

  public switchLanguage(): void {
    const locale = this.props.locale === "en-GB" ? "de" : "en-GB";
    this.props.dispatch(switchLanguage(locale));
  }

  public render(): JSX.Element {
    return (
      <div>
        <h3><FormattedMessage id="current.language" defaultMessage="Current Language" />: {this.props.locale}</h3>
        <button onClick={this.switchLanguage}>Change Language</button>
        <h4><FormattedMessage id="about.us" defaultMessage="About Us" /></h4>
      </div>
    );
  }
}

interface IStateToProps {
  locale: string;
}

const mapStateToProps = (state: IStore) => ({
  locale: state.language.payload.locale
});
const connectedAbout = connect<IStateToProps, IDispatchToProps, null>(mapStateToProps)(AboutPage);
export {AboutPage as UnconnectedAbout, connectedAbout as AboutPage};
