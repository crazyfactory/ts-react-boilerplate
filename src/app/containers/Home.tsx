import * as React from "react";
import {style} from "typestyle";

const Styles = {
  home: style({
    textAlign: "center"
  })
};

class Home extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={Styles.home}>
        <img src={require("./barbar.png")}/>
        <p>Hello!</p>
      </div>
    );
  }
}

export {Home, Styles}
