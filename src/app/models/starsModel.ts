export interface IStars {
  isFetching?: boolean;
  error?: boolean;
  payload?: {
    stargazers_count: number;
  };
}

export interface IStarsAction {
  type: string;
  payload?: {
    stargazers_count: number;
  };
}
