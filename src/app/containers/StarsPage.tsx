import * as React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {IStore} from "../redux/IStore";
import {IDispatchToProps} from "../redux/modules/baseModule";
import {loadStars} from "../redux/modules/starsModule";

class StarsPage extends React.Component<IStateToProps & IDispatchToProps, null> {
  public componentWillMount(): void {
    if (this.props.stargazers_count === -1) {
      this.props.dispatch(loadStars());
    }
  }

  public render(): JSX.Element {
    const {isFetching, stargazers_count} = this.props;
    return (
      <div>
        {isFetching ? <FormattedMessage id="stars.fetching" defaultMessage="Fetching Stars.." /> : stargazers_count}
      </div>
    );
  }
}

interface IStateToProps {
  isFetching: boolean;
  stargazers_count: number;
}

const mapStateToProps = (state: Pick<IStore, "stars">) => ({
  isFetching: state.stars.isFetching,
  stargazers_count: state.stars.payload.stargazers_count
});
const connectedStars = connect<IStateToProps, IDispatchToProps, null>(mapStateToProps)(StarsPage);
export {StarsPage as UnconnectedStars, connectedStars as StarsPage, mapStateToProps};
