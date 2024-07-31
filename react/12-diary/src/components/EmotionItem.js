import React from 'react';
import './EmotionItem.css';

function EmotionItem({
  emotion_img,
  emotion_id,
  emotion_description,
  name,
  onChange,
  isSelected,
}) {
  const handleClick = () => {
    onChange(name, emotion_id);
  };
  const emotionClass = `emotionItem ${
    isSelected ? 'emotionItem_on_' + emotion_id : 'emotionItem_off'
  }`;
  return (
    <div className={emotionClass} onClick={handleClick}>
      <img src={emotion_img} />
      <span>{emotion_description}</span>
    </div>
  );
}

export default EmotionItem;
