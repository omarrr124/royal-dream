import React from 'react';
import type { ContainerProps } from '../../types/theme';
import { cn } from '../../lib/utils';

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'xl',
  as: Component = 'div',
}) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
};
