import * as React from "react";
import {FormattedMessage} from "react-intl";
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
      <li><Link to="about"><FormattedMessage id="about" defaultMessage="About Us" /></Link></li>
      <li><Link to="counter"><FormattedMessage id="counter" defaultMessage="Counter" /></Link></li>
      <li><Link to="stars"><FormattedMessage id="stars" defaultMessage="Stars" /></Link></li>
      <li><Link to="register"><FormattedMessage id="register" defaultMessage="Register" /></Link></li>
    </ul>
  </nav>
);

export {Header, Styles};
