export interface IStars {
  isFetching?: boolean;
  error?: boolean;
  message?: string;
  payload?: {
    stargazers_count: number;
  };
}

export interface IStarsAction {
  type: string;
  message?: string;
  payload?: {
    stargazers_count: number;
  };
}
