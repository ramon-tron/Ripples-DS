import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './MegaButton.module.css';

export type MegaButtonVariant = 'mono' | 'brand';

export interface MegaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MegaButtonVariant;
  icon: string;
  loading?: boolean;
  children: ReactNode;
}

export function MegaButton({
  variant = 'mono',
  icon,
  loading = false,
  disabled,
  className = '',
  children,
  ...rest
}: MegaButtonProps) {
  return (
    <button
      data-variant={variant}
      className={[styles.megaButton, className].filter(Boolean).join(' ')}
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
          <span className={styles.iconSlot}>
            <Icon name={icon} size="l" aria-hidden={true} />
          </span>
          <span className={styles.label}>{children}</span>
        </>
      )}
    </button>
  );
}
