import React, { useEffect, useState } from 'react';
import placeholderImg from '../assets/preview-placeholder.png';
import resetImg from '../assets/ic-reset-white.png';
import './FileInput.css';

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);
  return (
    <div className='FileInput'>
      <img
        className={`FileInput-preview ${preview ? 'selected' : ''}`}
        src={preview || placeholderImg}
      />
      <input
        className='FileInput-hidden-overlay'
        type='file'
        onChange={handleChange}
      />
      {value && (
        <button
          className='FileInput-clear-button'
          onClick={handleClearClick}
          type='button'
        >
          <img src={resetImg} />
        </button>
      )}
    </div>
  );
}

export default FileInput;
