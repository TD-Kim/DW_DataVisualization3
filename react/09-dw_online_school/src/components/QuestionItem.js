import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import styles from './QuestionItem.module.css';
import DateText from './DateText';

function QuestionItem({ question }) {
  const { title, answers, createdAt, writer } = question;
  return (
    <Card className={styles.questionItem}>
      <div className={styles.info}>
        <p className={styles.title}>
          <Link to={`/questions/${question.docId}`} state={{ question }}>
            {title}
          </Link>
          <span className={styles.count}>[{answers.length}]</span>
        </p>
        <p className={styles.date}>
          <DateText value={createdAt} />
        </p>
      </div>
      <div className={styles.writer}>
        <Avatar photoUrl={writer.profile.photo} name={writer.name} />
      </div>
    </Card>
  );
}

export default QuestionItem;
