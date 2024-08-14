import React from 'react';
import styles from './OrderItem.module.scss';
import { Link } from 'react-router-dom';

function OrderItem() {
  return (
    <li className={styles.order_item}>
      <Link>
        <img />
      </Link>
      <div className={styles.order_description}>
        <h4>{'카테고리'}</h4>
        <h3>{'상품명'}</h3>
      </div>
      <div className={styles.order_price}>
        <h4>가격: </h4>
        <span>
          $ {'100'} x {'2'}
        </span>
      </div>
      <div className={styles.order_total}>
        <h4>합계: </h4>
        <span>$ {'200'}</span>
      </div>
    </li>
  );
}

export default OrderItem;
