import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './cart-item/CartItem';
import styles from './CartList.module.scss';

function CartList() {
  const { products } = useSelector((state) => state.cartSlice);
  return (
    <div className={styles.cart_list}>
      {products.map((product) => (
        <CartItem key={product.id} {...product} />
      ))}
    </div>
  );
}

export default CartList;
