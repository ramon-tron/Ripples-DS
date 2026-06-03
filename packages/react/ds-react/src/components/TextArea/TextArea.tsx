import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type TextareaHTMLAttributes } from 'react';
import { Chip } from '../Chip/Chip';
import { Icon } from '../Icon/Icon';
import styles from './TextArea.module.css';

// ─── Public types ─────────────────────────────────────────────────────────────

export type TextAreaType = 'default' | 'tags';

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'type'> {
  label?: string;
  helpIcon?: boolean;
  helperText?: string;
  error?: boolean;
  type?: TextAreaType;
  /** Controlled tag list (tags variant) */
  tags?: string[];
  /** Initial tags for uncontrolled usage (tags variant) */
  defaultTags?: string[];
  onTagsChange?: (tags: string[]) => void;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
}

// ─── TextArea ─────────────────────────────────────────────────────────────────

export function TextArea({
  label,
  helpIcon = false,
  helperText,
  error = false,
  type = 'default',
  tags: controlledTags,
  defaultTags,
  onTagsChange,
  id,
  disabled,
  placeholder,
  rows = 4,
  wrapperClassName = '',
  wrapperStyle,
  className = '',
  ...htmlProps
}: TextAreaProps) {
  const generatedId = useId();
  const textareaId = id ?? (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : generatedId);
  const helperId = `${textareaId}-helper`;

  // ── Tags state ──
  const [internalTags, setInternalTags] = useState<string[]>(defaultTags ?? []);
  const currentTags = controlledTags !== undefined ? controlledTags : internalTags;
  const [tagInput, setTagInput] = useState('');
  const tagInputRef = useRef<HTMLInputElement>(null);

  const commitTag = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || currentTags.includes(trimmed)) return;
    const next = [...currentTags, trimmed];
    setInternalTags(next);
    onTagsChange?.(next);
  };

  const removeTag = (index: number) => {
    const next = currentTags.filter((_, i) => i !== index);
    setInternalTags(next);
    onTagsChange?.(next);
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commitTag(tagInput);
      setTagInput('');
    } else if (e.key === 'Backspace' && !tagInput && currentTags.length > 0) {
      removeTag(currentTags.length - 1);
    }
  };

  // ── Shared sub-elements ──
  const labelEl = label && (
    <div className={styles.labelRow}>
      <label
        htmlFor={textareaId}
        className={[styles.label, disabled ? styles.labelDisabled : ''].filter(Boolean).join(' ')}
      >
        {label}
      </label>
      {helpIcon && (
        <span
          className={[styles.helpIconWrap, disabled ? styles.helpIconWrapDisabled : ''].filter(Boolean).join(' ')}
          aria-hidden="true"
        >
          <Icon name="help" style={{ fontSize: 12 }} />
        </span>
      )}
    </div>
  );

  const helperEl = helperText && (
    <span
      id={helperId}
      className={[styles.helperText, error ? styles.helperTextError : ''].filter(Boolean).join(' ')}
      role={error ? 'alert' : undefined}
    >
      {helperText}
    </span>
  );

  const containerClass = [
    styles.container,
    error ? styles.containerError : '',
    disabled ? styles.containerDisabled : '',
  ].filter(Boolean).join(' ');

  // ── Tags variant ──
  if (type === 'tags') {
    return (
      <div
        className={[styles.wrapper, wrapperClassName].filter(Boolean).join(' ')}
        style={wrapperStyle}
      >
        {labelEl}
        <div
          className={containerClass}
          onClick={() => !disabled && tagInputRef.current?.focus()}
        >
          <div className={styles.tagsContent}>
            {currentTags.map((tag, i) => (
              <Chip
                key={`${tag}-${i}`}
                size="sm"
                disabled={disabled}
                onDismiss={!disabled ? () => removeTag(i) : undefined}
              >
                {tag}
              </Chip>
            ))}
            {disabled ? (
              currentTags.length === 0 && placeholder && (
                <span className={styles.tagPlaceholder}>{placeholder}</span>
              )
            ) : (
              <input
                ref={tagInputRef}
                id={textareaId}
                className={styles.tagInput}
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onBlur={() => { if (tagInput) { commitTag(tagInput); setTagInput(''); } }}
                onKeyDown={handleTagKeyDown}
                placeholder={currentTags.length === 0 ? placeholder : undefined}
                aria-invalid={error || undefined}
                aria-describedby={helperText ? helperId : undefined}
              />
            )}
          </div>
        </div>
        {helperEl}
      </div>
    );
  }

  // ── Default variant ──
  return (
    <div
      className={[styles.wrapper, wrapperClassName].filter(Boolean).join(' ')}
      style={wrapperStyle}
    >
      {labelEl}
      <div className={containerClass}>
        <textarea
          id={textareaId}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          className={[styles.textarea, className].filter(Boolean).join(' ')}
          aria-invalid={error || undefined}
          aria-describedby={helperText ? helperId : undefined}
          {...htmlProps}
        />
      </div>
      {helperEl}
    </div>
  );
}
