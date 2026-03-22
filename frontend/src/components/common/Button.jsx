import React from 'react';

const Button = ({ children, className = '', disabled, ...props }) => (
  <button
    {...props}
    disabled={disabled}
    className={`px-6 py-3 rounded-2xl font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg ${className}`}
  >
    {children}
  </button>
);

export default Button;

