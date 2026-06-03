import {
  useCallback,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import type { IconButtonSize } from '../IconButton/IconButton';
import styles from './SegmentedControl.module.css';

// ─── Public types ─────────────────────────────────────────────────────────────

export type SegmentedControlSize = 'medium' | 'sm';
export type SegmentedControlStyle = 'framed' | 'frameless';

export interface SegmentedControlOption {
  value: string;
  /** Text label — omit for icon-only segments */
  label?: string;
  /** Material Symbols icon name */
  icon?: string;
  /** Where the icon appears relative to the label (default: left) */
  iconPosition?: 'left' | 'right';
  /** Required for icon-only options — used as the button's accessible label */
  ariaLabel?: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  /** Controlled selected value */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: SegmentedControlSize;
  style?: SegmentedControlStyle;
  /** Accessible label for the control group */
  'aria-label'?: string;
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCornerRadius(
  i: number,
  total: number,
  size: SegmentedControlSize,
  style: SegmentedControlStyle,
): string {
  const r = size === 'medium'
    ? 'var(--ds-border-radius-s)'
    : 'var(--ds-border-radius-xs)';

  if (style === 'frameless') return r;

  const first = i === 0;
  const last = i === total - 1;

  if (first && last) return r;
  if (first) return `${r} 0 0 ${r}`;
  if (last) return `0 ${r} ${r} 0`;
  return '0';
}

// ─── SegmentedControl ─────────────────────────────────────────────────────────

export function SegmentedControl({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  size = 'medium',
  style = 'framed',
  'aria-label': ariaLabel,
  className = '',
}: SegmentedControlProps) {
  const uid = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const isIconOnly = options.length > 0 && options.every(o => !!o.icon && !o.label);
  const isFramed = style === 'framed';

  // ── Value state ──
  const firstEnabled = options.find(o => !o.disabled)?.value ?? options[0]?.value ?? '';
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? firstEnabled);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;


  const handleSelect = useCallback(
    (value: string) => {
      setInternalValue(value);
      onChange?.(value);
    },
    [onChange],
  );

  // ── Arrow-key navigation ──
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();

      const btns = Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? [],
      );
      if (!btns.length) return;

      const focused = document.activeElement as HTMLElement;
      const focusedIdx = btns.indexOf(focused);
      if (focusedIdx === -1) return;

      let nextIdx = focusedIdx;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIdx = (focusedIdx + 1) % btns.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIdx = (focusedIdx - 1 + btns.length) % btns.length;
      } else if (e.key === 'Home') {
        nextIdx = 0;
      } else if (e.key === 'End') {
        nextIdx = btns.length - 1;
      }

      const nextBtn = btns[nextIdx];
      nextBtn.focus();
      const val = nextBtn.dataset.value;
      if (val) handleSelect(val);
    },
    [handleSelect],
  );

  // ── Sizing maps ──
  const iconBtnSize: IconButtonSize = size === 'medium' ? 'm' : 's';
  const iconSize = size === 'medium' ? 20 : 16;

  const outerClass = [
    styles.root,
    isFramed ? styles.rootFramed : styles.rootFrameless,
    size === 'medium' ? styles.rootMedium : styles.rootSmall,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={ariaLabel}
      id={uid}
      className={outerClass}
      onKeyDown={handleKeyDown}
    >
      {/* Block-level grid so 1fr columns have a definite width to divide equally */}
      <div className={styles.innerGrid}>
      {options.map((option, i) => {
        const isSelected = option.value === currentValue;
        const cornerRadius = getCornerRadius(i, options.length, size, style);

        const optionClass = [
          styles.option,
          isFramed && i > 0 ? styles.optionSeparator : '',
        ].filter(Boolean).join(' ');

        if (isIconOnly) {
          return (
            <div key={option.value} className={optionClass}>
              <IconButton
                icon={option.icon!}
                aria-label={option.ariaLabel ?? option.icon!}
                aria-pressed={isSelected}
                data-value={option.value}
                variant={isSelected ? 'mono-secondary' : 'mono-tertiary'}
                size={iconBtnSize}
                shape="square"
                disabled={option.disabled}
                tabIndex={isSelected && !option.disabled ? 0 : -1}
                onClick={() => handleSelect(option.value)}
                style={{ '--_radius': cornerRadius, width: '100%' } as CSSProperties}
              />
            </div>
          );
        }

        // Text (with optional icon)
        const btnClass = [
          styles.btn,
          size === 'medium' ? styles.btnMedium : styles.btnSmall,
          isSelected ? styles.btnSelected : styles.btnUnselected,
          isFramed && i === 0 ? styles.btnFirst : '',
          isFramed && i === options.length - 1 ? styles.btnLast : '',
          !isFramed ? styles.btnFrameless : '',
        ].filter(Boolean).join(' ');

        return (
          <div key={option.value} className={optionClass}>
            <button
              type="button"
              aria-pressed={isSelected}
              data-value={option.value}
              disabled={option.disabled}
              tabIndex={isSelected && !option.disabled ? 0 : -1}
              className={btnClass}
              onClick={() => handleSelect(option.value)}
            >
              {option.icon && option.iconPosition !== 'right' && (
                <Icon
                  name={option.icon}
                  aria-hidden
                  style={{ fontSize: iconSize, flexShrink: 0 }}
                />
              )}
              {option.label}
              {option.icon && option.iconPosition === 'right' && (
                <Icon
                  name={option.icon}
                  aria-hidden
                  style={{ fontSize: iconSize, flexShrink: 0 }}
                />
              )}
            </button>
          </div>
        );
      })}
      </div>
    </div>
  );
}
