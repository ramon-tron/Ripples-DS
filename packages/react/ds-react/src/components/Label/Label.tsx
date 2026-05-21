import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './Label.module.css';

export type LabelVariant =
  | 'default'
  | 'brand'
  | 'success'
  | 'error'
  | 'alert'
  | 'info'
  | 'revision'
  | 'completed'
  | 'review';

export type LabelAppearance = 'subtle' | 'filled' | 'outlined';
export type LabelSize = 'lg' | 'md' | 'sm';

export interface LabelProps {
  variant?: LabelVariant;
  appearance?: LabelAppearance;
  size?: LabelSize;
  icon?: string;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
  className?: string;
}

const ICON_FONT_SIZE: Record<LabelSize, number> = { lg: 18, md: 16, sm: 12 };

export function Label({
  variant = 'default',
  appearance = 'subtle',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
}: LabelProps) {
  const iconEl = icon ? (
    <Icon name={icon} size="xs" style={{ fontSize: ICON_FONT_SIZE[size] }} aria-hidden />
  ) : null;

  return (
    <span
      className={[styles.label, styles[variant], styles[appearance], styles[size], className]
        .filter(Boolean)
        .join(' ')}
    >
      {icon && iconPosition === 'left' && iconEl}
      {children}
      {icon && iconPosition === 'right' && iconEl}
    </span>
  );
}
