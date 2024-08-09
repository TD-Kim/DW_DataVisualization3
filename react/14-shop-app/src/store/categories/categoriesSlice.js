import { createSlice } from '@reduxjs/toolkit';
import { CategoriesName } from './categories';

const initialState = CategoriesName.All;

const categoriesSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      return action.payload;
    },
  },
});

export default categoriesSlice.reducer;
export const { setActiveCategory } = categoriesSlice.actions;
