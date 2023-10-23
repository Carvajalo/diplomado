import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    logout: state => {
      state = null;
    }
  }
});

export const selectUser = state => state.user;

export const { login, logout } = userSlice.actions;

export default userSlice.reducer