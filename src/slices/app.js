import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: localStorage.getItem('theme') || 'light',
    news: [],
  },
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem('theme', action.payload);
      
      return { ...state, theme: action.payload };
    },
    setNews: (state, action) => ({ ...state, news: action.payload }),
  },
});

export default appSlice;
