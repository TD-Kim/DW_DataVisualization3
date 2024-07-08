import React, { useContext, useState } from 'react';
import FileInput from './FileInput';
import RatingInput from './RatingInput';
import './ReviewForm.css';
import { LocaleContext, useLocale } from './contexts/LocaleConext';
import useTranslate from './hooks/useTranslate';

const INITIAL_VALUE = {
  title: '',
  rating: 0,
  content: '',
  imgUrl: null,
};

function ReviewForm({
  onSubmit,
  handleSubmitSuccess,
  initialPreview,
  initialValues = INITIAL_VALUE,
  handleCancel,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslate();

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
    const result = await onSubmit('movie', values);
    handleSubmitSuccess(result);

    // 버튼 활성화
    setIsSubmitting(false);

    setValues(INITIAL_VALUE);
  };

  return (
    <form className='ReviewForm' onSubmit={handleSubmit}>
      <div>
        <FileInput
          inputName='imgUrl'
          setFile={handleChange}
          value={values.imgUrl}
          initialPreview={initialPreview}
        />
      </div>
      <div className='Form-container'>
        <input
          type='text'
          name='title'
          placeholder={t("title placeholder")}
          onChange={handleInputChange}
          value={values.title}
        />
        <RatingInput
          inputName='rating'
          setRating={handleChange}
          value={values.rating}
        />
        <textarea
          name='content'
          placeholder={t("content placeholder")}
          onChange={handleInputChange}
          value={values.content}
        />
        {handleCancel && (
          <button onClick={() => handleCancel(null)}>{t("cancel button")}</button>
        )}
        <button type='submit' disabled={isSubmitting}>
        {t("confirm button")}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
