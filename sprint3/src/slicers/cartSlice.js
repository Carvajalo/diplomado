import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: 0,
    quantity: 0,
    products: [],
  },
  reducers: {
    increase: (state, action) => {
      console.log(action.payload)
      const product = state.products.find((product) => product.id === action.payload.id);
      state.value += action.payload.price;
      if (product) return product.quantity += 1;
      state.products.push({
        ...action.payload,
        quantity: 1,
      });
      state.quantity += 1;
    },
    /* Ahora el reducer para disminuir la cantidad */
    decrease: (state, action) => {
      const product = state.products.find((product) => product.id === action.payload.id);
      if (product) {
        product.quantity -= 1;
        state.value -= product.price;
        state.quantity -= 1;
      }
    },
    remove: (state, action) => {
      const product = state.products.find((product) => product.id === action.payload.id);
      state.products = state.products.filter((product) => product.id !== action.payload.id);
      state.value -= action.payload.price * product.quantity;
      state.quantity -= 1;
    },
    clear: (state) => {
      state.products = [];
      state.value = 0;
      state.quantity = 0;
    },
  }
});

export const selectCart = (state) => state.cart;

export const { increase: addToCart, decrease: decreaseQuantity, remove: removeToCart, clear: ClearCart } = cartSlice.actions;

export default cartSlice.reducer;

