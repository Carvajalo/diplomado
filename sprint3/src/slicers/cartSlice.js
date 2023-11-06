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
      console.log(action)
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index === -1) {
        state.products.push({ ...action.payload, quantity: action.payload.quantity });
        state.value += action.payload.price;
        state.quantity += 1;
        return;
      }
      state.products[index].quantity += action.payload.quantity;
      state.value += state.products[index].price * action.payload.quantity;
    },
    decrease: (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index === -1) {
        return;
      }
      if (state?.products[index]?.quantity > action?.payload?.quantity) {
        state.products[index].quantity = state?.products?.[index]?.quantity - action?.payload?.quantity;
        state.value = state.value - action.payload.price * action.payload.quantity;
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
    editQuantity: (state, action) => {
      const product = state.products.find((product) => product.id === action.payload.id);
      if (product) {
        state.value -= product.price * product.quantity;
        product.quantity = action.payload.quantity;
        state.value += product.price * product.quantity;
        return;
      }
    },
  }
});

export const selectCart = (state) => state.cart;

export const { increase: addToCart, decrease: decreaseQuantity, remove: removeToCart, clear: clearCart, editQuantity } = cartSlice.actions;

export default cartSlice.reducer;

