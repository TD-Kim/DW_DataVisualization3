import React from 'react';
import styles from './NavCartList.module.scss';
import NavCartItem from './nav-cart-item/NavCartItem';
import { useSelector } from 'react-redux';

function NavCartList() {
  const { products } = useSelector((state) => state.cartSlice);
  return (
    <div className={styles.nav_cart_list}>
      {products.map((product) => (
        <NavCartItem key={product.id} {...product} />
      ))}
    </div>
  );
}

export default NavCartList;
