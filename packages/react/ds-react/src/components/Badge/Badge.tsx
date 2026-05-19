import type { ReactNode } from 'react';
import styles from './Badge.module.css';

type Variant =
  | 'default'
  | 'brand'
  | 'success'
  | 'error'
  | 'alert'
  | 'info'
  | 'revision'
  | 'completed'
  | 'review';

interface BadgeProps {
  variant?: Variant;
  children: ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[variant]].join(' ')}>
      {children}
    </span>
  );
}
