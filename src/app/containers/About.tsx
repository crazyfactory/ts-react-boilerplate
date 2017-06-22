import * as React from "react";
import {FormattedMessage} from "react-intl";

class About extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <h4><FormattedMessage id="about" defaultMessage="About Us" /></h4>
      </div>
    );
  }
}

export {About}
