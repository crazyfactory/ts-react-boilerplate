import * as React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {IStore} from "../redux/IStore";
import {IDispatchToProps} from "../redux/modules/baseModule";
import {decrement, increment} from "../redux/modules/counterModule";

class CounterPage extends React.Component<IStateToProps & IDispatchToProps, null> {
  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
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
        <h4><FormattedMessage id="counter" defaultMessage="Counter"/></h4>
        <button name="incBtn" onClick={this.handleIncrement}>
          <FormattedMessage id="counter.increment" defaultMessage="Increment"/>
        </button>
        <button name="decBtn" onClick={this.handleDecrement} disabled={count <= 0}>
          <FormattedMessage id="counter.decrement" defaultMessage="Decrement"/>
        </button>
        <p>{count}</p>
      </div>
    );
  }
}

interface IStateToProps {
  count: number;
}

const mapStateToProps = (state: Pick<IStore, "counter">) => ({
  count: state.counter.payload.count
});

const connectedCounter = connect<IStateToProps, IDispatchToProps, null>(mapStateToProps)(CounterPage);

export {CounterPage as UnconnectedCounter, connectedCounter as CounterPage, mapStateToProps}
