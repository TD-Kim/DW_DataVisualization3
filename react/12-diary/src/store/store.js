import { configureStore } from '@reduxjs/toolkit';
import diarySlice from './diarySlice';

const store = configureStore({
  reducer: {
    diary: diarySlice.reducer,
  },
});

export default store;
