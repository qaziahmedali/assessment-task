import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-lg transition-shadow ${className}`}
  >
    {children}
  </div>
);

export default Card;
