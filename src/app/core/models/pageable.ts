export interface Pageable<T> {
  data?: T;
  hasNext: boolean;
  hasPrevious: boolean;
  countAll: number;
  countData: number;
}
