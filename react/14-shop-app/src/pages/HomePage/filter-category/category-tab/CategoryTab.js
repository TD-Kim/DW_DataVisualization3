import React from 'react';
import styles from './CategoryTab.module.scss';

function CategoryTab({ text, categoryName }) {
  const category = '';
  return (
    <button
      className={
        categoryName === category
          ? styles.active_category
          : styles.category_button
      }
    >
      {text}
    </button>
  );
}

export default CategoryTab;
