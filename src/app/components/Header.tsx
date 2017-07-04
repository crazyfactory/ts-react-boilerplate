import * as React from "react";
import {style} from "typestyle";
import {Link} from "./Link";

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

const Header = () => (
  <nav className={Styles.nav}>
    <ul>
      <li><Link name="home">Home</Link></li>
      <li><Link name="about">About</Link></li>
      <li><Link name="counter">Counter</Link></li>
      <li><Link name="stars">Stars</Link></li>
    </ul>
  </nav>
);

export {Header, Styles};
