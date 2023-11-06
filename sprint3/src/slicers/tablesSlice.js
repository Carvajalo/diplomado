import { createSlice } from '@reduxjs/toolkit';


export const tablesSlice = createSlice({
  name: 'tables',
  initialState: {
    pages: {
      products: 1,
      users: 1,
      orders: 1,
    },
  },
  reducers: {
    setPages: (state, action) => {
      console.log({ action })
      state.pages = action.payload;
    },
  },
});


export const { setPages } = tablesSlice.actions;

export const selectPages = (state) => state.tables.pages;

export default tablesSlice.reducer;