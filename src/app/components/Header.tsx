import * as React from "react";
import {FormattedMessage} from "react-intl";
import {style} from "typestyle";
import {Link} from "./Link";

const styles = {
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

const Header = () => (
  <nav className={styles.nav}>
    <ul>
      <li><Link name="home"><FormattedMessage id="home" defaultMessage="Home" /></Link></li>
      <li><Link name="about"><FormattedMessage id="about" defaultMessage="About Us" /></Link></li>
      <li><Link name="counter"><FormattedMessage id="counter" defaultMessage="Counter" /></Link></li>
      <li><Link name="stars"><FormattedMessage id="stars" defaultMessage="Stars" /></Link></li>
      <li><Link name="register"><FormattedMessage id="register" defaultMessage="Register" /></Link></li>
    </ul>
  </nav>
);

export {Header};
