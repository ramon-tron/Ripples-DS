import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'mono-primary'
  | 'mono-secondary'
  | 'mono-tertiary'
  | 'destructive'
  | 'destructive-secondary'
  | 'destructive-tertiary'
  | 'text'
  | 'text-mono'
  | 'text-destructive';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      data-variant={variant}
      data-size={size}
      className={[styles.button, className].filter(Boolean).join(' ')}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          <span className={styles.srOnly}>{children}</span>
        </>
      ) : (
        <>
          {leadingIcon && <span className={styles.iconSlot}>{leadingIcon}</span>}
          {children}
          {trailingIcon && <span className={styles.iconSlot}>{trailingIcon}</span>}
        </>
      )}
    </button>
  );
}
