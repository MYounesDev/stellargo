'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover
    ? 'hover:scale-105 hover:shadow-cyber-500/20 transition-all duration-300'
    : '';

  return (
    <div
      className={`glass-dark rounded-2xl shadow-xl ${paddings[padding]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

