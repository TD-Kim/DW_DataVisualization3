import React, { useEffect, useState } from 'react';
import ListPage from '../components/ListPage';
import searchImg from '../assets/search.svg';
import styles from './CourseListPage.module.css';
import CourseItem from '../components/CourseItem';
import { getDatas } from '../api/firebase';

let listItems;

function CourseListPage(props) {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState('');

  const handleKeywordChange = (e) => {
    // 사용자가 입력한 키워드를 state에 저장한다.
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 전체 데이터를 가지고 있는 listItems 를 활용해
    // 사용자가 입력한 키워드를 title에 포함하고 있는 객체를 원소로 가지는 배열을 만든다.
    // const searchItems = listItems.filter(function(item) {
    //     return item.title.includes(keyword);
    // });
    // // 만든 배열을 items state 에 set 해준다.
    // setItems(searchItems);
    setItems(listItems.filter(({ title }) => title.includes(keyword)));
  };

  const handleLoad = async () => {
    // 파이어베이스의 courses 컬렉션의 데이터를 가져온다.
    const resultData = await getDatas('courses');
    // 전체데이터 변수에 저장
    listItems = resultData;
    // 가져온 데이터 콘솔로 확인.
    console.log(resultData);
    // items state에 set 해준다.
    setItems(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPage variant='catalog'>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={keyword}
          onChange={handleKeywordChange}
          placeholder='검색으로 코스 찾기'
        />
        <button>
          <img src={searchImg} />
        </button>
      </form>

      <p className={styles.count}>총 {items.length}개 코스</p>

      <div className={styles.courseList}>
        {items.map((course) => {
          return <CourseItem key={course.docId} course={course} />;
        })}
      </div>
    </ListPage>
  );
}

export default CourseListPage;
