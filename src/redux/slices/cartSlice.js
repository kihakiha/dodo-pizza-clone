import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalPizzasInCart: 0,
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const findProduct = state.products.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

      if (findProduct) {
        findProduct.pizzasAmountInCart += 1;
      } else {
        state.products.push({
          ...action.payload,
          pizzasAmountInCart: 1,
        });
      }
      state.totalPizzasInCart += 1;

      state.totalPrice += action.payload.price;
      // state.totalPrice = state.products.reduce((sum, product) => {
      //   return (product.price * product.pizzasAmountInCart) + sum;
      // }, 0);
    },
    removeProduct(state, action) {
      state.products = state.products.filter((product) => product.id !== action.payload.id);
      state.totalPrice -= action.payload.price * action.payload.pizzasAmountInCart;
      state.totalPizzasInCart -= action.payload.pizzasAmountInCart;
    },
    removeOneProduct(state, action) {
      const findProduct = state.products.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

      findProduct.pizzasAmountInCart -= 1;
      state.totalPrice -= findProduct.price;
      state.totalPizzasInCart -= 1;
    },
    clearCart(state) {
      state.products = [];
      state.totalPizzasInCart = 0;
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, clearCart, removeOneProduct } = cartSlice.actions;

export default cartSlice.reducer;
