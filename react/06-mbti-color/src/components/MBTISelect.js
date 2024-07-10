import React from 'react';
import styles from "./MBTISelect.module.css";

const mbtiArr = [
  { mbti: 'E', desc: '외향형' },
  { mbti: 'I', desc: '내향형' },
  { mbti: 'S', desc: '감각형' },
  { mbti: 'N', desc: '직관형' },
  { mbti: 'F', desc: '감정형' },
  { mbti: 'T', desc: '사고형' },
  { mbti: 'P', desc: '인식형' },
  { mbti: 'J', desc: '판단형' },
];

function MBTIOption({ option }) {
  const { mbti, desc } = option;
  return (
    <div className={styles.mbtiOption}>
      <span className={styles.mbtiChar}>{mbti}</span>
      {desc}
    </div>
  );
}

function MBTISelect(props) {
  return (
    <div className={styles.mbtiOptions}>
      {mbtiArr.map((option, idx) => {
        return <MBTIOption key={idx} option={option} />;
      })}
    </div>
  );
}

export default MBTISelect;
