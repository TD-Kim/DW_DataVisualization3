import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavCartBlock.module.scss';
import NavCartList from './nav-cart-list/NavCartList';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalPrice } from '../../../../store/cart/cartSlice';

function NavCartBlock() {
  const { totalPrice, products } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [products]);
  return (
    <div className={styles.nav_cart_block}>
      <NavCartList />
      <div className={styles.nav_cart_price}>
        <p>합계: $ {totalPrice.toFixed(2)}</p>
      </div>
      <div className={styles.nav_cart_link}>
        <Link>장바구니로 이동</Link>
      </div>
    </div>
  );
}

export default NavCartBlock;
