import React from 'react';
import styles from './Warn.module.css';
import cn from 'classnames';
import warnImg from '../assets/warn.svg';

function Warn({ className, variant = '', title = '', description = '' }) {
  return (
    <div className={cn(styles.warn, className)}>
      <img className={styles.icon} src={warnImg} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default Warn;
