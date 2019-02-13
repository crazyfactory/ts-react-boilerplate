import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {IStore} from "../redux/IStore";
import {loadStars as loadStarsActionCreator} from "../redux/modules/starsModule";

interface IStateToProps {
  count: number;
  error: string;
  loaded: boolean;
  pending: boolean;
}

interface IDispatchToProps {
  loadStars: () => void;
}

interface IProps extends IStateToProps, IDispatchToProps {}

class StarsPage extends React.Component<IProps> {
  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
    if (!this.props.loaded) {
      this.props.loadStars();
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
    const {count, error, pending} = this.props;
    if (pending) {
      return <div>Fetching stars...</div>;
    } else {
      return error ? error : count;
    }
  }
}

function mapStateToProps(state: Pick<IStore, "stars">): IStateToProps {
  return {
    count: state.stars.count,
    error: state.stars.error,
    loaded: state.stars.loaded,
    pending: state.stars.pending
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    loadStars: () => dispatch(loadStarsActionCreator.invoke(null))
  };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(StarsPage);
export {connected as StarsPage, mapDispatchToProps, mapStateToProps, StarsPage as UnconnectedStars};
