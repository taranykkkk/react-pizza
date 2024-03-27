import { DataItem } from './asyncActions';

export type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

export type SearchPizzasParams = {
  [x: string]: any;
  searchCategory: string;
  searchTitle: string;
  currentPage: string;
  sortBy: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzasSliceState {
  items: DataItem;
  status: Status;
}
