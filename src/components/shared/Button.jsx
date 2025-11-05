import React from 'react';

function Button({ text, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer transition-all bg-acent text-white px-6 py-2 rounded-lg border-[#cc7c21] border-b-[4px] 
        hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
        mt-5
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {text}
    </button>
  );
}

export default Button;
  