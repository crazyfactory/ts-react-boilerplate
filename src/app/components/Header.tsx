import * as React from "react";
import {style} from "typestyle";
import {Link} from "./Link";

const classNames = {
  nav: style({
    $nest: {
      ul: {
        $nest: {
          li: {
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

export const Header = () => (
  <nav className={classNames.nav}>
    <ul>
      <li><Link name="home">Home</Link></li>
      <li><Link name="about">About Us</Link></li>
      <li><Link name="counter">Counter</Link></li>
      <li><Link name="stars">Stars</Link></li>
    </ul>
  </nav>
);
