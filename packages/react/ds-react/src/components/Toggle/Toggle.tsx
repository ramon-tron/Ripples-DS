import { useCallback, useState, type CSSProperties } from 'react';
import styles from './Toggle.module.css';

// ─── Public types ─────────────────────────────────────────────────────────────

export type ToggleSize = 'default' | 'sm';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: ToggleSize;
  disabled?: boolean;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  style?: CSSProperties;
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

export function Toggle({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  size = 'default',
  disabled = false,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  className = '',
  style,
}: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleClick = useCallback(() => {
    const next = !isChecked;
    setInternalChecked(next);
    onChange?.(next);
  }, [isChecked, onChange]);

  const trackClass = [
    styles.track,
    size === 'sm' ? styles.trackSm : styles.trackDefault,
    isChecked
      ? (disabled ? styles.trackOnDisabled : styles.trackOn)
      : (disabled ? styles.trackOffDisabled : styles.trackOff),
    className,
  ].filter(Boolean).join(' ');

  const thumbClass = [
    styles.thumb,
    size === 'sm' ? styles.thumbSm : styles.thumbDefault,
    isChecked ? (size === 'sm' ? styles.thumbOnSm : styles.thumbOnDefault) : '',
    disabled ? styles.thumbDisabled : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      disabled={disabled}
      className={trackClass}
      style={style}
      onClick={handleClick}
    >
      <span className={thumbClass} aria-hidden />
    </button>
  );
}
