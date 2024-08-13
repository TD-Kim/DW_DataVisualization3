import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import styles from './NavCartItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCartItem,
  deleteFromCart,
} from '../../../../../../store/cart/cartSlice';

function NavCartItem({ image, title, price, category, quantity, total, id }) {
  const dispatch = useDispatch();
  const { uid, isAuthenticated } = useSelector((state) => state.userSlice);

  const deleteProduct = () => {
    if (isAuthenticated) {
      dispatch(
        deleteCartItem({
          collectionName: ['users', uid, 'cart'],
          productId: id,
        })
      );
    } else {
      dispatch(deleteFromCart(id));
    }
  };
  return (
    <div className={styles.nav_cart_item}>
      <Link>
        <img src={image} />
      </Link>
      <div className={styles.nav_cart_description}>
        <h3>{category}</h3>
        <h2>{title}</h2>
        <span>
          {price} x {quantity} = $ {total.toFixed(2)}
        </span>
      </div>
      <button className={styles.nav_cart_delete} onClick={deleteProduct}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default NavCartItem;
