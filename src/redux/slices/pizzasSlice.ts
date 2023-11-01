import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

interface PizzaSliceState {
  items: PizzaItem[];
  isPizzasFetched: 'loading' | 'success' | 'error';
}

type FetchPizzasProps = Record<string, string>
 
const initialState: PizzaSliceState = {
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
  extraReducers: (builder) => {
    builder.addCase(fetchPizzasRTK.pending, (state) => {
      state.items = [];
      state.isPizzasFetched = 'loading';
    })
    builder.addCase(fetchPizzasRTK.fulfilled, (state,action) => {
      state.items = action.payload;
      state.isPizzasFetched = 'success';
    })
    builder.addCase(fetchPizzasRTK.rejected, (state) => {
      state.isPizzasFetched = 'error';
      state.items = [];
    })
  },
});

export const fetchPizzasRTK = createAsyncThunk('pizzas/fetchAllPizzas', async (params: FetchPizzasProps) => {
  const { sortBy, order, category, search, currentPage } = params;

  const { data } = await axios.get<PizzaItem[]>(
    `https://630118e3e71700618a347338.mockapi.io/Pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&search=${search}`,
  );

  return data as PizzaItem[];
});

export const selectPizzasData = (state: RootState) => state.pizzas;

// Action creators are generated for each case reducer function
// export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
