import * as React from "react";
import {connect} from "react-redux";
import {IStore} from "../redux/IStore";
import {IDispatchToProps} from "../redux/modules/baseModule";
import {decrement, increment} from "../redux/modules/counterModule";

class CounterPage extends React.Component<IStateToProps & IDispatchToProps, null> {
  constructor() {
    super();
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  public handleIncrement(): void {
    this.props.dispatch(increment());
  }

  public handleDecrement(): void {
    this.props.dispatch(decrement());
  }

  public render(): JSX.Element {
    const {count} = this.props;

    return (
      <div>
        <h4>Counter Example</h4>
        <button name="incBtn" onClick={this.handleIncrement}>
          INCREMENT
        </button>
        <button name="decBtn" onClick={this.handleDecrement} disabled={count <= 0}>
          DECREMENT
        </button>
        <p>{count}</p>
      </div>
    );
  }
}

interface IStateToProps {
  count: number;
}

const mapStateToProps = (state: IStore) => ({
  count: state.counter.payload.count
});

const connectedCounter = connect<IStateToProps, IDispatchToProps, null>(mapStateToProps)(CounterPage);

export {CounterPage as UnconnectedCounter, connectedCounter as CounterPage}
