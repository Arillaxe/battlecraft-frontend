import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token'),
  },
  reducers: {
    setData: (state, action) => ({ ...state, ...action.payload }),
    clearData: () => ({}),
  },
});

export default userSlice;
