import React from 'react';
import './Button.css';

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  style = {},
  className = "",
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
