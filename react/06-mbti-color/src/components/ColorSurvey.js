import React from 'react';
import styles from './ColorSurvey.module.css';

function ColorSurvey(props) {
  return (
    <div className={styles.colorSurvey}>
      <div className={styles.id}>1</div>
      <div className={styles.mbti}>INTJ</div>
      <div className={styles.arrow}>
        <img className={styles.arrowIcon} src='/images/arrow.svg' />
      </div>
      <div
        className={styles.colorChip}
        style={{ backgroundColor: '#d9d9d9' }}
      ></div>
      <div className={styles.colorCode}>#D9D9D9</div>
    </div>
  );
}

export default ColorSurvey;
