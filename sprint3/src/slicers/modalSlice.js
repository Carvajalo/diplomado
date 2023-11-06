import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    data: null
  },
  reducers: {
    edit: (state, action) => {
      state.data = action.payload;
    },
    clear: (state) => {
      state.data = null;
    }
  }
});

export const selectModal = (state) => state.modal.data;

export const { edit: editProduct, clear: clearProductData } = modalSlice.actions;

export default modalSlice.reducer;