import { configureStore } from '@reduxjs/toolkit';
import diarySlice from './diarySlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    diary: diarySlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
