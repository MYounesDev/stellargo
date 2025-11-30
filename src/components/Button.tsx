
import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-500 disabled:opacity-50 disabled:cursor-not-allowed btn-hover relative';

  const variants = {
    primary:
      'bg-gradient-to-r from-cyber-500 to-cyan-500 text-dark-950 hover:from-cyber-600 hover:to-cyan-600 focus:ring-cyber-500 shadow-lg hover:shadow-cyber-500/50 hover:scale-105 font-bold',
    secondary:
      'bg-cyber-700 text-white hover:bg-cyber-600 focus:ring-cyber-500 border border-cyber-600',
    outline:
      'bg-dark-900/80 border-2 border-cyber-500 text-cyber-500 hover:bg-dark-800/60 focus:ring-cyber-500 hover:text-cyber-400',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-red-500/50',
    ghost:
      'bg-dark-800/60 text-cyber-400 hover:text-white hover:bg-dark-700/80',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

