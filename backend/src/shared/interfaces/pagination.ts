export interface Pagination<T> {
  items: T[];
  totalCount: number;
  totalPage: number;
  skip: number;
}
