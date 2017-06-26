export interface IStars {
  error?: boolean;
  isFetching?: boolean;
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
