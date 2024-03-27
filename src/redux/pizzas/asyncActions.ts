import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pizza, SearchPizzasParams } from './types';
import axios from 'axios';

export type DataItem = {
  items: Pizza[];
  meta: {};
};
export const fetchPizzas = createAsyncThunk<DataItem, SearchPizzasParams>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { searchCategory, searchTitle, currentPage, sortBy } = params;
    const response = await axios.get(
      `https://afeee7ffe1f0418f.mokky.dev/items?${searchCategory}&sortBy=${sortBy}&page=${currentPage}&limit=8&${searchTitle}`,
    );
    return response.data;
  },
);
