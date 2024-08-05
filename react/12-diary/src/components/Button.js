import React from 'react';
import './Button.css';

function Button({ text, onClick, type, className }) {
  const btnClass = ['positive', 'negative'].includes(type) ? type : 'default';
  return (
    <button className={`btn btn_${btnClass} ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
