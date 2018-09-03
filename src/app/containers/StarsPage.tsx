import * as React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {IStore} from "../redux/IStore";
import {IDispatchToProps} from "../redux/modules/baseModule";
import {loadStars} from "../redux/modules/starsModule";

class StarsPage extends React.Component<IStateToProps & IDispatchToProps> {
  public componentWillMount(): void {
    if (this.props.stargazersCount === -1) {
      this.props.dispatch(loadStars());
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.renderStars()}
      </div>
    );
  }

  private renderStars(): JSX.Element | string | number {
    const {errorMessage, isFetching, stargazersCount} = this.props;
    if (isFetching) {
      return <FormattedMessage id="stars.fetching" defaultMessage="Fetching Stars.." />;
    } else {
      return errorMessage ? errorMessage : stargazersCount;
    }
  }
}

interface IStateToProps {
  isFetching: boolean;
  stargazersCount: number;
  errorMessage?: string;
}

const mapStateToProps = (state: Pick<IStore, "stars">) => ({
  errorMessage: state.stars.message,
  isFetching: state.stars.isFetching,
  stargazersCount: state.stars.payload.stargazers_count
});
const connectedStars = connect<IStateToProps, IDispatchToProps>(mapStateToProps)(StarsPage);
export {StarsPage as UnconnectedStars, connectedStars as StarsPage, mapStateToProps};
