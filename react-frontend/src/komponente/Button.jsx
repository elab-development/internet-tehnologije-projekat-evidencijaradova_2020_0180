import React from 'react';

const Button = ({ className, onClick, disabled, style, children }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
};

export default Button;
