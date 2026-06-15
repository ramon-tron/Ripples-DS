import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, InputHTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { Tooltip } from '../Tooltip/Tooltip';
import styles from './Input.module.css';

export type InputSize = 'default' | 'sm';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helpIcon?: boolean;
  helpIconTooltip?: string;
  helperText?: string;
  error?: boolean;
  size?: InputSize;
  leadingIcon?: string;
  trailingIcon?: string;
  actionIcon?: string;
  actionAriaLabel?: string;
  onActionClick?: () => void;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
}

const CONTENT_PADDING: Record<InputSize, string> = {
  default: styles.contentDefault,
  sm: styles.contentSm,
};

export function Input({
  label,
  helpIcon = false,
  helpIconTooltip,
  helperText,
  error = false,
  size = 'default',
  leadingIcon,
  trailingIcon,
  actionIcon,
  actionAriaLabel,
  onActionClick,
  id,
  type = 'text',
  disabled,
  wrapperClassName = '',
  wrapperStyle,
  className = '',
  value: controlledValue,
  defaultValue,
  onChange: externalOnChange,
  ...htmlProps
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [helpTooltipOpen, setHelpTooltipOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const helpIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!helpTooltipOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!helpIconRef.current?.contains(e.target as Node)) setHelpTooltipOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setHelpTooltipOpen(false); };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [helpTooltipOpen]);

  const [numDisplay, setNumDisplay] = useState<string>(() => {
    const v = controlledValue ?? defaultValue;
    return v != null ? String(v) : '';
  });

  useEffect(() => {
    if (type === 'number' && controlledValue !== undefined) {
      setNumDisplay(String(controlledValue));
    }
  }, [type, controlledValue]);

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumDisplay(e.target.value);
    externalOnChange?.(e);
  };

  const [searchValue, setSearchValue] = useState<string>(() => {
    if (type !== 'search') return '';
    const v = controlledValue ?? defaultValue;
    return v != null ? String(v) : '';
  });

  useEffect(() => {
    if (type === 'search' && controlledValue !== undefined) {
      setSearchValue(String(controlledValue ?? ''));
    }
  }, [type, controlledValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    externalOnChange?.(e);
  };

  const handleSearchClear = () => {
    const el = inputRef.current;
    setSearchValue('');
    if (el) {
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      nativeSetter?.call(el, '');
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.focus();
    }
  };

  const handleStep = (dir: 1 | -1) => {
    const el = inputRef.current;
    if (!el) return;
    dir === 1 ? el.stepUp() : el.stepDown();
    const newVal = el.value;
    setNumDisplay(newVal);
    // Trigger React's synthetic onChange via native event dispatch
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    nativeSetter?.call(el, newVal);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const helperId = inputId ? `${inputId}-helper` : undefined;
  const effectiveType = type === 'password' && showPassword ? 'text' : type;
  const effectiveTrailingIcon = error ? 'error' : trailingIcon;

  const labelRow = label && (
    <div className={styles.labelRow}>
      <label
        htmlFor={inputId}
        className={[styles.label, disabled ? styles.labelDisabled : ''].filter(Boolean).join(' ')}
      >
        {label}
      </label>
      {helpIcon && (
        <div ref={helpIconRef} className={styles.helpTooltipWrap}>
          <IconButton
            icon="help"
            iconFill={0}
            variant="mono-tertiary"
            size="2xs"
            shape="circular"
            disabled={disabled}
            aria-label="Help"
            {...(helpIconTooltip
              ? { 'aria-expanded': helpTooltipOpen, onClick: () => setHelpTooltipOpen(v => !v) }
              : { tabIndex: -1, 'aria-hidden': true }
            )}
          />
          {helpIconTooltip && helpTooltipOpen && (
            <Tooltip title={helpIconTooltip} arrow="left" className={styles.helpTooltip} />
          )}
        </div>
      )}
    </div>
  );

  const helperTextEl = helperText && (
    <span
      id={helperId}
      className={[styles.helperText, error ? styles.helperTextError : ''].filter(Boolean).join(' ')}
      role={error ? 'alert' : undefined}
    >
      {helperText}
    </span>
  );

  if (type === 'number') {
    return (
      <div
        className={[styles.wrapper, wrapperClassName].filter(Boolean).join(' ')}
        style={wrapperStyle}
      >
        {labelRow}
        <div
          className={[
            styles.container,
            styles.containerNumber,
            error ? styles.containerError : '',
            disabled ? styles.containerDisabled : '',
          ].filter(Boolean).join(' ')}
        >
          <div className={[styles.content, CONTENT_PADDING[size]].join(' ')}>
            <button
              type="button"
              className={styles.numStepBtn}
              onClick={() => handleStep(-1)}
              disabled={disabled}
              tabIndex={-1}
              aria-label="Decrement"
            >
              <Icon name="remove" size="xs" aria-hidden style={{ fontSize: 12 }} />
            </button>
            <input
              ref={inputRef}
              id={inputId}
              type="number"
              value={numDisplay}
              onChange={handleNumChange}
              disabled={disabled}
              className={styles.numValueInput}
              style={{ width: `${Math.max(1, numDisplay.length || 1)}ch` }}
              aria-invalid={error || undefined}
              aria-describedby={helperText && helperId ? helperId : undefined}
              {...htmlProps}
            />
            <button
              type="button"
              className={styles.numStepBtn}
              onClick={() => handleStep(1)}
              disabled={disabled}
              tabIndex={-1}
              aria-label="Increment"
            >
              <Icon name="add" size="xs" aria-hidden style={{ fontSize: 12 }} />
            </button>
          </div>
        </div>
        {helperTextEl}
      </div>
    );
  }

  return (
    <div
      className={[styles.wrapper, wrapperClassName].filter(Boolean).join(' ')}
      style={wrapperStyle}
    >
      {labelRow}

      <div
        className={[
          styles.container,
          error ? styles.containerError : '',
          disabled ? styles.containerDisabled : '',
        ].filter(Boolean).join(' ')}
      >
        <div className={[styles.content, CONTENT_PADDING[size]].join(' ')}>
          {leadingIcon && (
            <Icon
              name={leadingIcon}
              size="xs"
              color={disabled ? 'var(--ds-color-text-disabled)' : 'var(--ds-color-text-tertiary)'}
              aria-hidden
            />
          )}
          <input
            ref={inputRef}
            id={inputId}
            type={effectiveType}
            disabled={disabled}
            value={controlledValue}
            defaultValue={defaultValue}
            onChange={type === 'search' ? handleSearchChange : externalOnChange}
            aria-invalid={error || undefined}
            aria-describedby={helperText && helperId ? helperId : undefined}
            className={[styles.inputEl, className].filter(Boolean).join(' ')}
            {...htmlProps}
          />
          {type === 'password' && !error ? (
            <IconButton
              icon={showPassword ? 'visibility_off' : 'visibility'}
              variant="mono-tertiary"
              size="s"
              shape="square"
              disabled={disabled}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword(v => !v)}
            />
          ) : type === 'search' && !error ? (
            <IconButton
              icon="close"
              variant="mono-tertiary"
              size="s"
              shape="square"
              aria-label="Clear search"
              onClick={handleSearchClear}
              style={{ visibility: searchValue ? 'visible' : 'hidden' }}
            />
          ) : effectiveTrailingIcon ? (
            <Icon
              name={effectiveTrailingIcon}
              size="xs"
              color={
                disabled ? 'var(--ds-color-text-disabled)' :
                error ? 'var(--ds-color-icon-error)' :
                'var(--ds-color-text-tertiary)'
              }
              aria-hidden
            />
          ) : null}
        </div>

        {actionIcon && (
          <>
            <div className={styles.actionDivider} aria-hidden="true" />
            <button
              type="button"
              className={styles.actionBtn}
              onClick={onActionClick}
              disabled={disabled}
              aria-label={actionAriaLabel ?? actionIcon}
            >
              <Icon name={actionIcon} size="xs" aria-hidden />
            </button>
          </>
        )}
      </div>

      {helperTextEl}
    </div>
  );
}
