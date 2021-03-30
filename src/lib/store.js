import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import {
  appSlice,
  userSlice,
} from '../slices';

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
