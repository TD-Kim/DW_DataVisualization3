import React, { useState } from 'react';
import Button from './Button';
import './DiaryList.css';
import DiaryItem from './DiaryItem';
import { useNavigate } from 'react-router-dom';

const sortOptionList = [
{ name: '최신순', value: 'latest' },
{ name: '오래된 순', value: 'oldest' },
];
const filterOptionList = [
  { name: '전부다', value: 'all' },
  { name: '좋은 감정만', value: 'good' },
  { name: '안좋은 감정만', value: 'bad' },
];

function ControlMenu({ optionList, value, onChange }) {
  return (
    <select
      className='ControlMenu'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((option, idx) => {
        return (
          <option key={idx} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

function DiaryList({ diaryList }) {
  const [order, setOrder] = useState('latest');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const getSortedDiaryList = () => {
    // 필터링 함수
    const getFilteredList = (diary) => {
      if (filter === 'good') {
        // filter state가 good 이면(emotion의 값이 3보다 작거나 같을 때)
        return diary.emotion <= 3;
      } else {
        // filter state가 good 이 아니면(emotion의 값이 3보다 클 때)
        return diary.emotion > 3;
      }
    };
    // [1, 11, 21].sort((a,b) => b - a);
    // 정렬 함수
    const getOrderedList = (a, b) => {
      if (order === 'latest') {
        // order state가 latest 이면 b - a
        return b.date - a.date;
      } else {
        // order state가 latest 가 아니면 a - b
        return a.date - b.date;
      }
    };
    const filteredList =
      filter === 'all'
        ? diaryList
        : diaryList.filter((diary) => getFilteredList(diary));

    const sortedList = filteredList.sort(getOrderedList);
    return sortedList;
  };

  return (
    <div className='diaryList'>
      <div className='menu_wrapper'>
        <div className='control_menus'>
          <ControlMenu
            optionList={sortOptionList}
            value={order}
            onChange={setOrder}
          />
          <ControlMenu
            optionList={filterOptionList}
            value={filter}
            onChange={setFilter}
          />
        </div>
        <div className='new_btn'>
          <Button
            text={'새 일기쓰기'}
            type='positive'
            onClick={() => navigate('/new')}
          />
        </div>
      </div>
      {getSortedDiaryList().map((diary) => {
        return <DiaryItem key={diary.id} {...diary} />;
      })}
    </div>
  );
}

export default DiaryList;
