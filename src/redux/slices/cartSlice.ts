import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: number; 
  size: number;
  pizzasAmountInCart?: number;
}

interface CartSliceState {
  totalPrice: number;
  totalPizzasInCart: number;
  products: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalPizzasInCart: 0,
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem> ){
      const findProduct = state.products.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

      if (findProduct && findProduct.pizzasAmountInCart) {
        findProduct.pizzasAmountInCart += 1;
      } else {
        state.products.push({
          ...action.payload,
          pizzasAmountInCart: 1,
        });
      }
      state.totalPizzasInCart += 1;

      state.totalPrice += action.payload.price;
    },
    removeProduct(state, action: PayloadAction<CartItem> ) {
      const findProduct = state.products.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

      if (findProduct) {
        state.products = state.products.filter(
          (product) =>
            product.id !== findProduct.id ||
            product.type !== findProduct.type ||
            product.size !== findProduct.size,
        );
      }
      if (action.payload.pizzasAmountInCart) {
        state.totalPrice -= action.payload.price * action.payload.pizzasAmountInCart;
        state.totalPizzasInCart -= action.payload.pizzasAmountInCart;
      }
    },
    removeOneProduct(state, action: PayloadAction<CartItem> ) {
      const findProduct = state.products.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      if (findProduct && findProduct.pizzasAmountInCart) {
        findProduct.pizzasAmountInCart -= 1;
      }
      if (findProduct) {
        state.totalPrice -= findProduct.price;
        state.totalPizzasInCart -= 1;
      }
    },
    clearCart(state) {
      state.products = [];
      state.totalPizzasInCart = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, clearCart, removeOneProduct } = cartSlice.actions;

export default cartSlice.reducer;
