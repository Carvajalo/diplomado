import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {}
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      return {}
    }
  }
});

export const selectUser = state => state.user.user;

export const { login, logout } = userSlice.actions;

export default userSlice.reducer