import React from 'react';
import styles from './CountProducts.module.scss';

function CountProducts() {
  return (
    <div className={styles.count_products}>
      <p>Showing: 6 items</p>
    </div>
  );
}

export default CountProducts;
