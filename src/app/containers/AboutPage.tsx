import * as React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {IStore} from "../redux/IStore";
import {IDispatchToProps} from "../redux/modules/baseModule";
import {changeLocale} from "../redux/modules/settingsModule";

class AboutPage extends React.Component<IStateToProps & IDispatchToProps> {
  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
    this.switchLanguage = this.switchLanguage.bind(this);
  }

  public switchLanguage(): void {
    const locale = this.props.locale === "en-GB" ? "de" : "en-GB";
    this.props.dispatch(changeLocale(locale));
  }

  public render(): JSX.Element {
    return (
      <div>
        <h3><FormattedMessage id="current.language" defaultMessage="Current Language" />: {this.props.locale}</h3>
        <button onClick={this.switchLanguage}><FormattedMessage id="about.change" defaultMessage="Change language"/></button>
        <h4><FormattedMessage id="about.us" defaultMessage="About Us" /></h4>
      </div>
    );
  }
}

interface IStateToProps {
  locale: string;
}

const mapStateToProps = (state: Pick<IStore, "settings">) => ({
  locale: state.settings.meta.locale
});
const connectedAbout = connect<IStateToProps, IDispatchToProps>(mapStateToProps)(AboutPage);
export {AboutPage as UnconnectedAbout, connectedAbout as AboutPage, mapStateToProps};
