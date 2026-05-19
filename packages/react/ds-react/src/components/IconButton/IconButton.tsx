import type { ButtonHTMLAttributes } from 'react';
import styles from './IconButton.module.css';
import { Icon } from '../Icon/Icon';
import type { IconSize } from '../Icon/Icon';

export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'mono-primary'
  | 'mono-secondary'
  | 'mono-tertiary'
  | 'destructive'
  | 'destructive-secondary'
  | 'destructive-tertiary'
  | 'inverse';

export type IconButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type IconButtonShape = 'circular' | 'square';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Material Symbols icon name, e.g. "star" */
  icon: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  loading?: boolean;
  /** Required for accessibility — describes the button action */
  'aria-label': string;
}

const ICON_SIZE: Record<IconButtonSize, IconSize> = {
  xs: 'xs',
  s:  'xs',
  m:  's',
  l:  'm',
  xl: 'l',
};

export function IconButton({
  icon,
  variant = 'primary',
  size = 'l',
  shape = 'circular',
  loading = false,
  disabled,
  'aria-label': ariaLabel,
  className = '',
  ...rest
}: IconButtonProps) {
  return (
    <button
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      className={[styles.iconButton, className].filter(Boolean).join(' ')}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        <Icon name={icon} size={ICON_SIZE[size]} />
      )}
    </button>
  );
}
