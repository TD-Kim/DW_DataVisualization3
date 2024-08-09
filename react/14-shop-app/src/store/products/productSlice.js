import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from '../../firebase';

const initialState = {
  product: {},
  isLoading: false,
  error: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getData(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      return null;
    }
  }
);

export default productSlice.reducer;
export { fetchProduct };
