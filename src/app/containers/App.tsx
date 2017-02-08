const appConfig = require('../../../config/main');

import * as React from 'react';
import * as Helmet from 'react-helmet';
import {cssRaw, style, cssRule} from 'typestyle';
import { normalize, setupPage } from 'csstips';
import { Header } from 'components';

// Global style
cssRaw(`@import url('https://fonts.googleapis.com/css?family=Roboto');`);
normalize();
cssRule(`body`, {
    fontFamily: 'Roboto',
});
setupPage('#app');

// App container style
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
