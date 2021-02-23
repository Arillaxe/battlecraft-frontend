import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import {
  userSlice,
} from '../slices';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
