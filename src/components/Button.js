import React from 'react';

function Button({ name, onClick, className, label }) {
  return (
    <button name={name} onClick={onClick} className={className}>
      {label}
    </button>
  );
}

export default Button;
