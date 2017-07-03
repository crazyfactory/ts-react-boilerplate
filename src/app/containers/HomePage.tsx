import * as React from "react";
import {FormattedMessage} from "react-intl";
import {style} from "typestyle";

const Styles = {
  home: style({
    textAlign: "center"
  })
};

class HomePage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={Styles.home}>
        <img src={require("../images/barbar.png")}/>
        <p><FormattedMessage id="hello" defaultMessage="Hello!" /></p>
      </div>
    );
  }
}

export {HomePage}
