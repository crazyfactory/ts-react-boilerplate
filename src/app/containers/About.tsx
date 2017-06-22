import * as React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {SWITCH_LANGUAGE} from "../redux/modules/languageModule";

class About extends React.Component<any, any> {
  constructor() {
    super();
    this.switchLang = this.switchLang.bind(this);
  }

  public switchLang(): void {
    this.props.switchLanguage((this.props.locale === "en-GB") ? "de" : "en-GB");
  }

  public render(): JSX.Element {
    return (
      <div>
        <h3><FormattedMessage id="current.language" defaultMessage="Current Language" />: {this.props.locale}</h3>
        <button onClick={this.switchLang}>Change Language</button>
        <h4><FormattedMessage id="about.us" defaultMessage="About Us" /></h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({locale: state.language.locale});
const mapDispatchToProps = (dispatch) => (
  {
    switchLanguage: (lang: string) => {
      dispatch({type: SWITCH_LANGUAGE, payload: lang});
    }
  });
const connectedAbout = connect(mapStateToProps, mapDispatchToProps)(About);
export {connectedAbout as About}
