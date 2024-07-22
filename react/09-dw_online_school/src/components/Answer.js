import React from 'react';
import Card from './Card';
import Writer from './Writer';
import styles from "./Answer.module.css";
import cn from "classnames";
import DateText from './DateText';

function Answer({ className, answer }) {
  const { content, createdAt, writer } = answer;
  return (
    <Card className={cn(styles.answer, className)}>
      <p>{content}</p>
      <div className={styles.answerInfo}>
        <div className={styles.date}>
          <DateText value={createdAt} />
        </div>
        <Writer writer={writer} />
      </div>
    </Card>
  );
}

export default Answer;
