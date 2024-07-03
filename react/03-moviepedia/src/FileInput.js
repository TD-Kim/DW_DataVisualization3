import React from 'react';
import placeholderImg from './assets/preview-placeholder.png';
import "./FileInput.css";
import resetImg from "./assets/ic-reset.png";

function FileInput(props) {
  return (
    <div className='FileInput'>
      <img className='FileInput-preview' src={placeholderImg} />
      <input className='FileInput-hidden-overlay' type='file' />
      <button className='FileInput-clear-button'>
        <img src={resetImg} />
      </button>
    </div>
  );
}

export default FileInput;
