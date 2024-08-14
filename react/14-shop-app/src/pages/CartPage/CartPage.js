import React from 'react';
import CartList from './cart-list/CartList';
import Checkout from './checkout/Checkout';
import { useSelector } from 'react-redux';
import CartEmpty from '../../components/cart-empty/CartEmpty';

function CartPage() {
  const { products } = useSelector((state) => state.cartSlice);
  return (
    <div className='page'>
      {products.length == 0 ? (
        <CartEmpty title={'장바구니'} />
      ) : (
        <div className='container'>
          <h1>장바구니</h1>
          <CartList />
          <Checkout />
        </div>
      )}
    </div>
  );
}

export default CartPage;
