import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import { DiaryStateContext } from '../App';
import { useSelector } from 'react-redux';

function HomePage(props) {
  const { auth } = useContext(DiaryStateContext);
  const diaryList = useSelector((state) => state.diary.items);
  const [curDate, setCurDate] = useState(new Date());
  const [sortedItem, setSortedItem] = useState([]);
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };
  useEffect(() => {
    // 1. curDate 를 활용하여 firstDay 와 lastDay 를 만들어준다.
    // new Date(2024, 8, 1, 시, 분, 초);
    // 2. firstDay와 lastDay를 밀리세컨즈 형태로 변환.
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth()
    ).getTime();
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getTime();
    // 3. diaryList 에서 date 필드가 firstDay 와 lastDay 사이에 있는 원소들만 뽑아서
    // 새로운 배열을 만든다.
    const newItem = diaryList.filter(
      (diary) => diary.date >= firstDay && diary.date <= lastDay
    );
    // 4. setSortedItem 함수 사용
    setSortedItem(newItem);
  }, [curDate, diaryList]);
  return (
    <div>
      <Header
        headText={headText}
        leftChild={<Button text={'<'} onClick={decreaseMonth} />}
        rightChild={<Button text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={sortedItem} auth={auth} />
    </div>
  );
}

export default HomePage;
