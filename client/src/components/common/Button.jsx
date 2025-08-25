import React from 'react';
import './Button.css';

const Button = ({ imageSrc, text, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      <div className="button-content">
        <img src={imageSrc} alt="" className="button-image" />
        <span className="button-text font-sans">{text}</span>
      </div>
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;