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
    ? 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200'
    : '';

  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-accent-200 ${paddings[padding]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

