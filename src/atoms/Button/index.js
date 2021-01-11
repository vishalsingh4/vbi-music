import React from 'react';

const Button = ({title = 'CREATE', isDisabled = false, onClick}) => {
  return (
    <div className="submit-section">
      <button type="button" className="submit-btn" disabled={isDisabled} onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default Button;
