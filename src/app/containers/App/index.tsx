const appConfig = require('../../../../config/main');

import * as React from 'react';
import * as Helmet from 'react-helmet';
import { style, cssRule } from 'typestyle';
import { SiteStyles } from '../../SiteStyles';
import { Header } from 'components';

// Define base stylings here
// Registering a CSS rule cannot use properties with nested styles

cssRule('html', {
    boxSizing: 'border-box',
});

cssRule('*, *:before, *:after', {
    boxSizing: 'inherit',
});

cssRule('body',
    SiteStyles.backgroundColor,
);

cssRule('a',
    SiteStyles.linkColor,
    { textDecoration: 'none' },
);

cssRule('a:hover',
    SiteStyles.linkColorOnHovered,
);

const Styles = {
    container: style({
        padding: 0,
        margin: 0,
        textAlign: 'center',
    }),
};

class App extends React.Component<any, any> {
  public render() {
    return (
      <section className={Styles.container}>
        <Helmet {...appConfig.app} {...appConfig.app.head}/>
        <Header />
        {this.props.children}
      </section>
    );
  }
}

export { App, Styles }
