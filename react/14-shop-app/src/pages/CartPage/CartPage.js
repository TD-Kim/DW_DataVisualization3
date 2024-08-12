import React from 'react';
import CartList from './cart-list/CartList';
import Checkout from './checkout/Checkout';

function CartPage() {
  return (
    <div className='page'>
      <div className='container'>
        <h1>장바구니</h1>
        <CartList />
        <Checkout />
      </div>
    </div>
  );
}

export default CartPage;
