import * as React from "react";
import {Link} from "react-router";
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

const Header = () => (
  <nav className={Styles.nav}>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="about">About</Link></li>
      <li><Link to="counter">Counter</Link></li>
      <li><Link to="stars">Stars</Link></li>
      <li><Link to="register">Register</Link></li>
    </ul>
  </nav>
);

export {Header, Styles};
