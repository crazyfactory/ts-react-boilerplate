import * as React from "react";
import {BaseLink} from "react-router5";
import {style} from "typestyle";

const Styles = {
  nav: style({
    $nest: {
      ul: {
        $nest: {
          li: {
            color: "blue",
            display: "inline",
            padding: "5px"
          }
        },
        listStyleType: "none",
        padding: 0
      }
    }
  })
};

class Header extends React.Component <any, any> {
  constructor(props: any) {
    super(props);
  }
  public render(): JSX.Element {
    return (
      <nav className={Styles.nav}>
        <ul>
          <li><BaseLink routeName="main">Home</BaseLink></li>
          <li><BaseLink routeName="about">About</BaseLink></li>
          <li><BaseLink routeName="counter">Counter</BaseLink></li>
          <li><BaseLink routeName="stars">Stars</BaseLink></li>
        </ul>
      </nav>
    );
  }
}

export {Header, Styles};
