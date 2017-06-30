import * as React from "react";
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
        <p>Hello!</p>
      </div>
    );
  }
}

export {HomePage, Styles}
