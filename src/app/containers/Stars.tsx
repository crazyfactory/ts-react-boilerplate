import * as React from "react";
import {IAction, IState} from "../redux/modules/baseModule";
import {IStars, LOAD_STARS} from "../redux/modules/starsModule";
const {connect} = require("react-redux");

interface IProps {
  stars: IState<IStars>;
  getStars: Redux.ActionCreator<IAction<IStars>>;
}

@connect(
  (state) => ({stars: state.stars}),
  (dispatch) => ({
    getStars: () => dispatch({type: LOAD_STARS})
  })
)
class Stars extends React.Component<IProps, {}> {
  public componentWillMount(): void {
    if (this.props.stars.payload.stargazers_count === -1) {
      this.props.getStars();
    }
  }

  public render(): JSX.Element {
    const {stars} = this.props;
    return (
      <div>
        {stars.isFetching ? "Fetching Stars.." : stars.payload.stargazers_count}
      </div>
    );
  }
}

export {Stars}
