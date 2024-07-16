import React from 'react';
import Container from './Container';
import styles from './ListPage.module.css';
import cn from 'classnames';
import caltalogImg from '../assets/catalog.svg';

function ListPage(props) {
  return (
    <>
      <div className={cn(styles.bg, styles.community)}>
        <img className={styles.icon} src={caltalogImg} />
        <div className={styles.texts}>
          <h1 className={styles.heading}>모든 코스</h1>
          <p className={styles.description}>
            자체 제작된 코스들로 기초를 쌓으세요.
          </p>
        </div>
      </div>
      <Container className={styles.container}></Container>
    </>
  );
}

export default ListPage;
