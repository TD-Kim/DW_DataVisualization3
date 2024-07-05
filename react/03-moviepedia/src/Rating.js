import React from 'react';
import './Rating.css';

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selectRating, rating, selected, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = selectRating ? () => selectRating(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  );
}

function Rating({ selectRating, hoverRating, onHover, onMouseOut }) {
  return (
    <div onMouseOut={onMouseOut}>
      {RATINGS.map((arrNum) => (
        <Star
          key={arrNum}
          selectRating={selectRating}
          rating={arrNum}
          selected={hoverRating >= arrNum}
          onHover={onHover}
        />
      ))}
    </div>
  );
}

export default Rating;
