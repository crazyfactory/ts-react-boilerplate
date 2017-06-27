import * as React from "react";
import {IAction, IState} from "../redux/modules/baseModule";
import {DECREMENT, ICounter, INCREMENT} from "../redux/modules/counterModule";
const {connect} = require("react-redux");

interface IProps {
  counter: IState<ICounter>;
  increment: Redux.ActionCreator<IAction<ICounter>>;
  decrement: Redux.ActionCreator<IAction<ICounter>>;
}

@connect(
  (state) => ({counter: state.counter}),
  (dispatch) => ({
    decrement: () => dispatch({type: DECREMENT}),
    increment: () => dispatch({type: INCREMENT})
  })
)

class Counter extends React.Component<IProps, null> {
  public render(): JSX.Element {
    const {increment, decrement, counter} = this.props;

    return (
      <div>
        <h4>Counter Example</h4>
        <button name="incBtn" onClick={increment}>
          INCREMENT
        </button>
        <button name="decBtn" onClick={decrement} disabled={counter.payload.count <= 0}>
          DECREMENT
        </button>
        <p>{counter.payload.count}</p>
      </div>
    );
  }
}

export {Counter}
