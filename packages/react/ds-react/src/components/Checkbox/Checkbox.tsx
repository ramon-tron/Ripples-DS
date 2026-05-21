import { useRef, useEffect } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Renders a dash instead of a checkmark — used for parent checkboxes with a partial child selection. */
  indeterminate?: boolean;
  /** Optional label rendered to the right of the box. */
  label?: ReactNode;
}

export function Checkbox({
  indeterminate = false,
  disabled,
  label,
  className = '',
  ...rest
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      className={[styles.checkbox, disabled ? styles.disabled : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.control}>
        <input
          ref={inputRef}
          type="checkbox"
          disabled={disabled}
          className={styles.input}
          {...rest}
        />
        <span className={styles.box} aria-hidden="true">
          {/* Checkmark */}
          <svg className={styles.iconCheck} viewBox="0 0 12 9" fill="none">
            <path
              d="M1 4.5L4.5 8L11 1"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Indeterminate dash */}
          <svg className={styles.iconIndeterminate} viewBox="0 0 10 2" fill="none">
            <path d="M1 1H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </span>
      {label != null && <span className={styles.label}>{label}</span>}
    </label>
  );
}
