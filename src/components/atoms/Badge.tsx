import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  const variantStyles = {
    default: 'bg-gray-700 text-gray-200',
    success: 'bg-green-600/20 text-green-400 border border-green-600/30',
    warning: 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30',
    danger: 'bg-red-600/20 text-red-400 border border-red-600/30',
    purple: 'bg-purple-600/20 text-purple-400 border border-purple-600/30',
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
