import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Checkout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalPrice, postOrder } from '../../../store/cart/cartSlice';

function Checkout() {
  const { totalPrice, products } = useSelector((state) => state.cartSlice);
  const { isAuthenticated, uid } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const sendOrder = () => {
    const orderObj = {
      totalPrice,
      products,
    };
    dispatch(postOrder({ uid, cart: orderObj }));
  };

  useEffect(() => {
    dispatch(getTotalPrice());
  }, []);
  return (
    <div className={styles.checkout}>
      <div>
        <p>
          <span>합계: $ {totalPrice.toFixed(2)}</span>
        </p>
        {isAuthenticated ? (
          <button className={styles.checkout_button} onClick={sendOrder}>
            계산하기
          </button>
        ) : (
          <Link className={styles.checkout_button} to={'/login'}>
            로그인
          </Link>
        )}
      </div>
    </div>
  );
}

export default Checkout;
