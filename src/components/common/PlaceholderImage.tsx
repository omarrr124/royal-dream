import React, { useState } from 'react';
import type { PlaceholderImageProps } from '../../types/theme';
import { cn } from '../../lib/utils';

// Curated high-resolution placeholder fallback URLs for Royal Dream luxury restaurant
const DEFAULT_PLACEHOLDERS: Record<string, string> = {
  ambiance: 'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/7.jpg',
  cuisine: 'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/10.jpg',
  dining: 'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/13.jpg',
  chef: 'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/26.jpg',
  architecture: 'https://jwoirtxwaddmumcgoxjj.supabase.co/storage/v1/object/public/mediaa/18.jpg',
};

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  src,
  alt,
  aspectRatio = 'auto',
  objectFit = 'cover',
  category = 'cuisine',
  className,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageSrc = src || DEFAULT_PLACEHOLDERS[category] || DEFAULT_PLACEHOLDERS.cuisine;

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    auto: '',
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-noir-surface border border-noir-border/50 rounded-sm',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {/* Loading Skeleton Pulse */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-noir-surface via-noir-card to-noir-surface animate-pulse" />
      )}

      <img
        src={imageSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'w-full h-full transition-all duration-700 ease-out',
          objectFitClasses[objectFit],
          isLoaded ? 'opacity-100 scale-100 grayscale-[15%] hover:grayscale-0' : 'opacity-0 scale-105'
        )}
      />

      {/* Subtle Luxury Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-noir/40 via-transparent to-transparent" />
    </div>
  );
};
