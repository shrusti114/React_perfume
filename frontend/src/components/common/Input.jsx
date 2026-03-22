import React from 'react';

const Input = ({ className = '', ...props }) => (
  <input
    {...props}
    className={`w-full px-4 py-3 rounded-2xl bg-white/80 backdrop-blur border border-gray-200/50 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all shadow-sm ${className}`}
  />
);

export default Input;

