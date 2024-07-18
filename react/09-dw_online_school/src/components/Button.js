import React from 'react';
import styles from './Button.module.css';
import cn from 'classnames';

function Button({ variant, ...restProps }) {
  return (
    <button
      {...restProps}
      className={cn(styles.button, variant && styles[variant])}
    />
  );
}

export default Button;
