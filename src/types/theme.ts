export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ContainerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: React.ElementType;
}

export interface PlaceholderImageProps extends BaseComponentProps {
  src?: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill';
  category?: 'ambiance' | 'cuisine' | 'dining' | 'chef' | 'architecture';
  priority?: boolean;
}
