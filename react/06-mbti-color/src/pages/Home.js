import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import ColorSurvey from '../components/ColorSurvey';
import mockItems from '../lib/mock.json';
import { getAllDatas } from '../lib/firebase';

function Home(props) {
  const [items, setItems] = useState([]);
  const handleLoad = async () => {
    // 파이어베이스에서 데이터 가져오기
    const resultData = await getAllDatas("mbtiColor", "id");
    // items state에 셋팅
    setItems(resultData);
  }

  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <h1 className={styles.heading}>
            MBTI별
            <br />
            <span className={styles.accent}>좋아하는 컬러</span>
          </h1>
          <div>
            <div className={styles.filter}>
              <img className={styles.removeIcon} src='/images/x.svg' />
            </div>
          </div>
        </header>
      </div>
      <main className={styles.content}>
        <Link className={styles.addItem} to='/new'>
          + 새 컬러 등록하기
        </Link>
        <ul className={styles.items}>
          {items.map((item, idx) => {
            return <ColorSurvey key={idx} mbtiData={item}/>;
          })}
        </ul>
      </main>
    </div>
  );
}

export default Home;
