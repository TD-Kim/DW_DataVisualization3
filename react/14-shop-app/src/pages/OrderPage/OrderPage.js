import React from 'react';
import OrdersList from './orders-list/OrdersList';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function OrderPage() {
  const { isAuthenticated } = useSelector((state) => state.userSlice);

  if (!isAuthenticated) return <Navigate to='/login' />;

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
