import React, { useState } from 'react';
import styles from './New.module.css';
import { Link } from 'react-router-dom';
import MBTISelect from '../components/MBTISelect';
import ColorInput from '../components/ColorInput';

function New(props) {
  const [formValue, setFormValue] = useState({
    mbti: 'ESTP',
    colorCode: '#f2f2f2',
  });

  const handleChange = (name, value) => {
    setFormValue((prevFormValue) => {
      return { ...prevFormValue, [name]: value };
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerHeading}>새 컬러 등록하기</h1>
        <Link className={styles.cancel} to='/'>
          <img className={styles.cancelIcon} src='/images/x.svg' />
        </Link>
      </header>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>MBTI</h2>
        <MBTISelect
          mbtiValue={formValue.mbti}
          handleChange={(newMbti) => handleChange('mbti', newMbti)}
        />
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>
          컬러
          <button className={styles.random}>
            <img className={styles.repeatIcon} src='/images/repeat.svg' />
          </button>
        </h2>
        <ColorInput />
      </section>
      <button className={styles.submit}>컬러 등록</button>
    </div>
  );
}

export default New;
