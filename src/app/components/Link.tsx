import * as React from "react";
import {isEqual} from "lodash";
import {connect} from "react-redux";
import {actions} from "redux-router5";
import {State as IRouterState} from "router5";

class Link extends React.Component<IStateToProps & IDispatchToProps & IOwnProps, null> {
  public render(): JSX.Element {
    const {children, name, params, options, route} = this.props;

    const href = this.buildUrl(name, params);
    const onClick = (evt) => {
      evt.preventDefault();
      this.props.dispatch(actions.navigateTo(name, params, options));
    };
    const className = (route.name === name && (!params || isEqual(route.params, params))) ? "active" : "";

    return <a {...{className, href, onClick}}>{children}</a>;
  }

  // todo: now only assume query params, will implement other types of params
  private buildUrl(name: string, params: {[key: string]: string}): string {
    let url: string = name;
    if (params) {
      Object.keys(params).forEach((key) => {
        url += `?${key}=${params[key]}`;
      });
    }
    return url;
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
