import { configureStore } from '@reduxjs/toolkit';
import foodSlice from './foodSlice';

const store = configureStore({
  reducer: {
    food: foodSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
