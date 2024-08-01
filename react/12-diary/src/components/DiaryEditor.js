import React, { useContext, useRef, useState } from 'react';
import Header from './Header';
import Button from './Button';
import { emotionList } from '../util/emotion';
import EmotionItem from './EmotionItem';
import './DiaryEditor.css';
import { DiaryDispatchContext } from '../App';
import { useNavigate } from 'react-router-dom';

const INITIAL_VALUES = {
  date: '',
  content: '',
  emotion: 3,
};

function DiaryEditor(props) {
  const { onCreate } = useContext(DiaryDispatchContext);
  const contentRef = useRef();
  const navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_VALUES);
  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = () => {
    if (values.content.trim().length < 1) {
      handleChange('content', '');
      contentRef.current.focus();
      return;
    }
    if (window.confirm('새로운 일기를 저장하시겠습니까?')) {
      onCreate(values);
    }
    navigate('/', { replace: true });
  };
  return (
    <div className='diaryEditor'>
      <Header
        headText={'새 일기 작성하기'}
        leftChild={<Button text={'< 뒤로가기'} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className='input_box'>
            <input
              className='input_date'
              type='date'
              name='date'
              onChange={handleInputChange}
              value={values.date}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className='input_box emotion_list_wrapper'>
            {emotionList.map((emotion) => {
              return (
                <EmotionItem
                  key={emotion.emotion_id}
                  {...emotion}
                  name='emotion'
                  onChange={handleChange}
                  isSelected={emotion.emotion_id === values.emotion}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className='input_box text_wrapper'>
            <textarea
              placeholder='오늘은 어땠나요'
              name='content'
              onChange={handleInputChange}
              value={values.content}
              ref={contentRef}
            />
          </div>
        </section>
        <section>
          <div className='control_box'>
            <Button text={'취소하기'} />
            <Button
              text={'작성완료'}
              type={'positive'}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
