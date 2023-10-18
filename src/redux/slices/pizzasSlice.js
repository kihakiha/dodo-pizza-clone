import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzasRTK = createAsyncThunk('pizzas/fetchAllPizzas', async (params) => {
  const { sortBy, order, category, search, currentPage } = params;

  const { data } = await axios.get(
    `https://630118e3e71700618a347338.mockapi.io/Pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&search=${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  isPizzasFetched: 'loading', // loading || succes || error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    // setPizzas(state, action) {
    //   state.items = action.payload;
    // },
  },
  extraReducers: {
    [fetchPizzasRTK.pending]: (state) => {
      state.items = [];
      state.isPizzasFetched = 'loading';
    },
    [fetchPizzasRTK.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isPizzasFetched = 'succes';
    },
    [fetchPizzasRTK.rejected]: (state) => {
      state.isPizzasFetched = 'error';
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
