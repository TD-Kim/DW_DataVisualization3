import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Checkout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalPrice } from '../../../store/cart/cartSlice';

function Checkout() {
  const { totalPrice } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, []);
  return (
    <div className={styles.checkout}>
      <div>
        <p>
          <span>합계: $ {totalPrice.toFixed(2)}</span>
        </p>
        {/* <button className={styles.checkout_button}>계산하기</button> */}
        <Link className={styles.checkout_button}>로그인</Link>
      </div>
    </div>
  );
}

export default Checkout;
