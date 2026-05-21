import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Radio.module.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

export function Radio({
  disabled,
  label,
  className = '',
  ...rest
}: RadioProps) {
  return (
    <label
      className={[styles.radio, disabled ? styles.disabled : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.control}>
        <input
          type="radio"
          disabled={disabled}
          className={styles.input}
          {...rest}
        />
        <span className={styles.box} aria-hidden="true" />
      </span>
      {label != null && <span className={styles.label}>{label}</span>}
    </label>
  );
}
