import React from 'react';
import styles from './Card.module.css';
import cn from 'classnames';

function Card({ className, children }) {
  return <div className={cn(styles.card, className)}>{children}</div>;
}

export default Card;
