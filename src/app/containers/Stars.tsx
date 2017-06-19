import * as React from "react";
import {IStars, IStarsAction} from "../models/starsModel";
import {STARS_LOAD} from "../redux/modules/starsModule";
const {connect} = require("react-redux");
const {asyncConnect} = require("redux-connect");

interface IProps {
  stars: IStars;
  getStars: Redux.ActionCreator<IStarsAction>;
}

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch({type: STARS_LOAD});
  }
}])
@connect(
  (state) => ({stars: state.stars})
)
class Stars extends React.Component<IProps, {}> {
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
