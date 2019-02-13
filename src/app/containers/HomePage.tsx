import {color} from "csx";
import * as React from "react";
import {stylesheet} from "typestyle";

const classNames = stylesheet({
  container: {
    color: color("#125588").fade("80%").toString(),
    textAlign: "center"
  }
});

export class HomePage extends React.Component {
  public render(): JSX.Element {
    return (
      <div className={classNames.container}>
        <img alt={"barbar"} src={require("../images/barbar.png")}/>
        <p>Hello</p>
      </div>
    );
  }
}
