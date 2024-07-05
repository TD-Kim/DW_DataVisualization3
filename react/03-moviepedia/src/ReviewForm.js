import React, { useState } from 'react';
import FileInput from './FileInput';
import RatingInput from './RatingInput';
import './ReviewForm.css';

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  content: "",
  imgUrl: null
}

function ReviewForm({addData, handleAddSuccess}) {
  const [values, setValues] = useState(INITIAL_VALUE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 버튼 비활성화
    setIsSubmitting(true);
    const result = await addData("movie", values);
    handleAddSuccess(result);

    // 버튼 활성화
    setIsSubmitting(false);

    setValues(INITIAL_VALUE);
  }

  return (
    <form className='ReviewForm' onSubmit={handleSubmit}>
      <div>
        <FileInput
          inputName='imgUrl'
          setFile={handleChange}
          value={values.imgUrl}
        />
      </div>
      <div className='Form-container'>
        <input
          type='text'
          name='title'
          placeholder='제목을 입력해주세요.'
          onChange={handleInputChange}
        />
        <RatingInput
          inputName='rating'
          setRating={handleChange}
          value={values.rating}
        />
        <textarea
          name='content'
          placeholder='내용을 입력해주세요.'
          onChange={handleInputChange}
        />
        <button type='submit' disabled={isSubmitting}>확인</button>
      </div>
    </form>
  );
}

export default ReviewForm;
