import React from 'react';
import styles from './OrdersList.module.scss';
import OrderItem from './order-item/OrderItem';
import mockData from '../../../orderMock.json';

function OrdersList() {
  return (
    <div className={styles.orders}>
      {mockData.map((order) => {
        <div>
          <div className={styles.order_header}>
            <h3>주문 번호</h3>
            <h3>주문 날짜</h3>
            <p>합계: $ 999.00</p>
          </div>
          <ul>
            <OrderItem />
          </ul>
        </div>;
      })}
    </div>
  );
}

export default OrdersList;
