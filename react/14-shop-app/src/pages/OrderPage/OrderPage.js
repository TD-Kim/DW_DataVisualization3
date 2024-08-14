import React from 'react';
import OrdersList from './orders-list/OrdersList';

function OrderPage() {
  return (
    <div className='page'>
      <div className='container'>
        <h1>주문 히스토리</h1>
        <OrdersList />
      </div>
    </div>
  );
}

export default OrderPage;
