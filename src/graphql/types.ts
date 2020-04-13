export interface IReactQuery<T> {
  data?: T;
  status?: string;
  error?: any;
  isFetching?: boolean;
}
