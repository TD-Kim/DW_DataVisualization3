import React from 'react';
import CourseIcon from './CourseIcon';
import { Link } from 'react-router-dom';
import styles from './CourseItem.module.css';
import Card from './Card';
import getCourseColor from '../utils/getCourseColor';

const DIFFICULTY = ['입문', '초급', '중급', '고급'];

function CourseItem({ course }) {
  const { title, summary, language, difficulty, code, photoUrl } = course;
  const courseColor = getCourseColor(code);
  const thumbStyle = {
    borderColor: courseColor,
  };
  return (
    <Card className={styles.courseItem}>
      <div className={styles.thumb} style={thumbStyle}>
        <CourseIcon photoUrl={photoUrl} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link>{title}</Link>
        </h2>
        <p className={styles.description}>{summary}</p>
        <div>
          <ul className={styles.tags}>
            <li>{language}</li>
            <li>{DIFFICULTY[difficulty]}</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default CourseItem;
