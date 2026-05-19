import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './ButtonPill.module.css';

export type ButtonPillVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'mono-primary'
  | 'mono-secondary'
  | 'mono-tertiary'
  | 'destructive'
  | 'destructive-secondary'
  | 'destructive-tertiary';

export type ButtonPillSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonPillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonPillVariant;
  size?: ButtonPillSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
}

export function ButtonPill({
  variant = 'primary',
  size = 'md',
  loading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  className = '',
  children,
  ...rest
}: ButtonPillProps) {
  return (
    <button
      data-variant={variant}
      data-size={size}
      className={[styles.buttonPill, className].filter(Boolean).join(' ')}
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
