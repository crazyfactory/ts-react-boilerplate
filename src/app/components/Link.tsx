import {object} from "prop-types";
import * as React from "react";
import {connect} from "react-redux";
import {actions} from "redux-router5";
import {Router, State as IRouterState} from "router5";

class Link extends React.Component<IStateToProps & IDispatchToProps & IOwnProps, null> {
  public static contextTypes: React.ValidationMap<any> = {
    router: object.isRequired
  };

  public context: {
    router: Router;
  };

  public render(): JSX.Element {
    const {children, name, params, options} = this.props;
    const {navigateTo} = actions;

    const href = this.context.router.buildPath(name, params);
    const onClick = (evt) => {
      evt.preventDefault();
      this.props.dispatch(navigateTo(name, params, options));
    };
    const className = this.context.router.isActive(name, params) ? "active" : "";

    return <a {...{className, href, onClick}}>{children}</a>;
  }
}

interface IStateToProps {
  route: IRouterState;
}

interface IDispatchToProps {
  dispatch: any;
}

interface IOwnProps {
  name: string;
  params?: {[key: string]: string};
  options?: any;
}

const mapStateToProps = (state) => ({
  route: state.router.route
});

const connectedLink = connect<IStateToProps, IDispatchToProps, IOwnProps>(mapStateToProps)(Link);

export {connectedLink as Link};
