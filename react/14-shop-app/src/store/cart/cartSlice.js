import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: localStorage.getItem('cartProducts')
    ? JSON.parse(localStorage.getItem('cartProducts'))
    : [],
  totalPrice: 0,
  userId: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push({
        ...action.payload,
        quantity: 1,
        total: action.payload.price,
      });
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
