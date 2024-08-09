import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './CardSkeleton.module.scss';

function CardSkeleton() {
  return (
    <div className={styles.card_skeleton_container}>
      <div className={styles.card_skeleton}>
        <Skeleton height={350} />
      </div>
      <div className={styles.card_skeleton}>
        <Skeleton height={350} />
      </div>
      <div className={styles.card_skeleton}>
        <Skeleton height={350} />
      </div>
      <div className={styles.card_skeleton}>
        <Skeleton height={350} />
      </div>
    </div>
  );
}

export default CardSkeleton;
