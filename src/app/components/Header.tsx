import * as React from "react";
import { Link } from "react-router";
import { style } from "typestyle";

const Styles = {
    nav: style({
        $nest: {
            ul: {
                listStyleType: "none",
                padding: 0,

                $nest: {
                    li: {
                        display: "inline",
                        padding: "5px",
                        color: "blue"
                    }
                }
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
    </ul>
  </nav>
);

export { Header, Styles };
