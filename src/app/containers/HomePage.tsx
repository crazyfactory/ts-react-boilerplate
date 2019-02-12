import {color} from "csx";
import * as React from "react";
import {style} from "typestyle";

const styles = {
  home: style({
    color: color("#125588").fade("80%").toString(),
    textAlign: "center"
  })
};

class HomePage extends React.Component {
  public render(): JSX.Element {
    return (
      <div className={styles.home}>
        <img src={require("../images/barbar.png")}/>
        <p>Hello</p>
      </div>
    );
  }
}

export {HomePage};
