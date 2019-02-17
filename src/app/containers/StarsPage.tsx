import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {IStore} from "../redux/IStore";
import {loadStarsCount as loadStarsActionCreator} from "../redux/modules/starsActionCreators";

interface IStateToProps {
  count: number;
  error: string;
  loaded: boolean;
  pending: boolean;
}

interface IDispatchToProps {
  loadStarsCount: () => void;
}

interface IProps extends IStateToProps, IDispatchToProps {}

class StarsPage extends React.Component<IProps> {
  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
    if (!this.props.loaded) {
      this.props.loadStarsCount();
    }
  }

  public render(): JSX.Element {
    const {count, error, pending} = this.props;
    if (pending) {
      return <div>Fetching stars...</div>;
    } else {
      return error ? <div>{error}</div> : <div>{count}</div>;
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
    loadStarsCount: () => dispatch(loadStarsActionCreator.invoke(null))
  };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(StarsPage);
export {connected as StarsPage, mapDispatchToProps, mapStateToProps, StarsPage as UnconnectedStars};
