import * as React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {SWITCH_LANGUAGE} from "../redux/modules/languageModule";

class About extends React.Component<any, any> {
  constructor() {
    super();
    this.switchLanguage = this.switchLanguage.bind(this);
  }

  public switchLanguage(): void {
    this.props.dispatch({
      payload: this.props.locale === "en-GB" ? "de" : "en-GB",
      type: SWITCH_LANGUAGE
    });
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

const mapStateToProps = (state) => ({locale: state.language.payload.locale});
const connectedAbout = connect(mapStateToProps)(About);
export {About as UnconnectedAbout, connectedAbout as About};
