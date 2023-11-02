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

export enum IsPizzasFetched {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchProperties = {
  sortBy: string;
  order: string;
  categoryId:string;
  search:string;
  currentPage: string;
}

interface PizzaSliceState {
  items: PizzaItem[];
  isPizzasFetched: IsPizzasFetched;
}
 

const initialState: PizzaSliceState = {
  items: [],
  isPizzasFetched: IsPizzasFetched.LOADING,
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
      state.isPizzasFetched = IsPizzasFetched.LOADING;
    })
    builder.addCase(fetchPizzasRTK.fulfilled, (state,action) => {
      state.items = action.payload;
      state.isPizzasFetched = IsPizzasFetched.SUCCESS;
    })
    builder.addCase(fetchPizzasRTK.rejected, (state) => {
      state.isPizzasFetched = IsPizzasFetched.ERROR;
      state.items = [];
    })
  },
});

export const fetchPizzasRTK = createAsyncThunk('pizzas/fetchAllPizzas', async (params: SearchProperties) => {
  const { sortBy, order, categoryId, search, currentPage } = params;

  const { data } = await axios.get<PizzaItem[]>(
    `https://630118e3e71700618a347338.mockapi.io/Pizzas?page=${currentPage}&limit=8&${categoryId}&sortBy=${sortBy}&order=${order}&search=${search}`,
  );

  return data as PizzaItem[];
});

export const selectPizzasData = (state: RootState) => state.pizzas;

// Action creators are generated for each case reducer function
// export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
