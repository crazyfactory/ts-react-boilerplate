import * as React from "react";
import {IStars, IStarsAction} from "../models/starsModel";
import {STARS_REQUEST} from "../redux/modules/starsModule";
const {connect} = require("react-redux");

interface IProps {
  stars: IStars;
  getStars: Redux.ActionCreator<IStarsAction>;
}

@connect(
  (state) => ({stars: state.stars}),
  (dispatch) => ({
    getStars: () => dispatch({type: STARS_REQUEST})
  })
)
class Stars extends React.Component<IProps, {}> {
  public componentWillMount(): void {
    this.props.getStars();
  }

  public render(): JSX.Element {
    const {stars} = this.props;

    return (
      <div>
        {stars.isFetching ? "Fetching Stars" : stars.payload.stargazers_count}
      </div>
    );
  }
}

export {Stars}
