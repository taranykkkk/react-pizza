import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PizzasSliceState, Status } from './types';
import { DataItem, fetchPizzas } from './asyncActions';

const initialState: PizzasSliceState = {
  items: {
    items: [],
    meta: {},
  },
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<DataItem>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
