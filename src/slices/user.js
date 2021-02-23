import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setData: (state, action) => ({ ...state, ...action.payload }),
  },
});

export default userSlice;