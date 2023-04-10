import React from 'react';

const Rating = ({ value, text, color }) => {
  const setClassName = (upperBound, lowerBound) => {
    if (value >= upperBound) {
      return 'fas fa-star';
    } else if (value >= lowerBound) {
      return 'fas fa-star-half-alt';
    } else {
      return 'far fa-star';
    }
  };

  return (
    <div className='rating'>
      <span>
        <i style={{ color }} className={setClassName(1, 0.5)}></i>
      </span>
      <span>
        <i style={{ color }} className={setClassName(2, 1.5)}></i>
      </span>
      <span>
        <i style={{ color }} className={setClassName(3, 2.5)}></i>
      </span>
      <span>
        <i style={{ color }} className={setClassName(4, 3.5)}></i>
      </span>
      <span>
        <i style={{ color }} className={setClassName(5, 4.5)}></i>
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

export default Rating;
