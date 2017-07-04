import * as React from "react";
import {connect} from "react-redux";
import {actions} from "redux-router5";

class Link extends React.Component<any, null> {
  public render(): JSX.Element {
    const {children, name, params, options} = this.props;

    // const href = router.buildUrl(name, params);
    const onClick = (evt) => {
      evt.preventDefault();
      this.props.dispatch(actions.navigateTo(name, params, options));
    };
    // const className = router.isActive(name, params) ? "active" : "";

    return <a {...{onClick}}>{children}</a>;
  }
}

const connectedLink = connect()(Link);

export {connectedLink as Link};
