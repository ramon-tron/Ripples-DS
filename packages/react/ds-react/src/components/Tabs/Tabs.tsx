import { useCallback, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './Tabs.module.css';

// ─── Public types ─────────────────────────────────────────────────────────────

export type TabsVariant = 'underlined' | 'segmented';
export type TabsSize = 'xs' | 'sm' | 'medium';

export interface TabItem {
  value: string;
  /** Text label — omit for icon-only tabs */
  label?: string;
  /** Material Symbols icon name */
  icon?: string;
  /** Accessible label for icon-only tabs */
  ariaLabel?: string;
  /** Badge count or label displayed alongside the tab */
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled selected value */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  'aria-label'?: string;
  className?: string;
  style?: CSSProperties;
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export function Tabs({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  variant = 'underlined',
  size = 'medium',
  'aria-label': ariaLabel,
  className = '',
  style,
}: TabsProps) {
  const uid = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const firstEnabled = items.find(i => !i.disabled)?.value ?? items[0]?.value ?? '';
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstEnabled);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const handleSelect = useCallback((value: string) => {
    setInternalValue(value);
    onChange?.(value);
  }, [onChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();

    const btns = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? [],
    );
    if (!btns.length) return;

    const focused = document.activeElement as HTMLElement;
    const focusedIdx = btns.indexOf(focused);
    if (focusedIdx === -1) return;

    let nextIdx = focusedIdx;
    if (e.key === 'ArrowRight') nextIdx = (focusedIdx + 1) % btns.length;
    else if (e.key === 'ArrowLeft') nextIdx = (focusedIdx - 1 + btns.length) % btns.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = btns.length - 1;

    const nextBtn = btns[nextIdx];
    nextBtn.focus();
    const val = nextBtn.dataset.value;
    if (val) handleSelect(val);
  }, [handleSelect]);

  // Slide indicator to the selected tab. On first render, snap without animation.
  useLayoutEffect(() => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    const selectedBtn = container.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!selectedBtn) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      indicator.style.transition = 'none';
      indicator.style.transform = `translateX(${selectedBtn.offsetLeft}px)`;
      indicator.style.width = `${selectedBtn.offsetWidth}px`;
      void indicator.getBoundingClientRect(); // flush layout so transition:none takes effect
      indicator.style.transition = '';
      return;
    }

    indicator.style.transform = `translateX(${selectedBtn.offsetLeft}px)`;
    indicator.style.width = `${selectedBtn.offsetWidth}px`;
  }, [currentValue]);

  const isSegmented = variant === 'segmented';
  const iconSize = size === 'medium' ? 20 : 16;

  const rootClass = [
    styles.root,
    isSegmented ? styles.rootSegmented : styles.rootUnderlined,
    size === 'medium' ? styles.rootMedium : size === 'sm' ? styles.rootSm : styles.rootXs,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      role="tablist"
      id={uid}
      aria-label={ariaLabel}
      className={rootClass}
      style={style}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={indicatorRef}
        className={isSegmented ? styles.indicatorSegmented : styles.indicatorUnderlined}
        aria-hidden
      />
      {items.map((item) => {
        const isSelected = item.value === currentValue;
        const isIconOnly = !item.label;

        const tabClass = [
          styles.tab,
          isSegmented ? styles.tabSegmented : styles.tabUnderlined,
          size === 'medium'
            ? (isSegmented ? styles.tabSegmentedMedium : styles.tabUnderlinedMedium)
            : '',
          isSelected
            ? (isSegmented ? styles.tabSegmentedSelected : styles.tabUnderlinedSelected)
            : (isSegmented ? styles.tabSegmentedUnselected : styles.tabUnderlinedUnselected),
        ].filter(Boolean).join(' ');

        const textClass = [
          styles.tabText,
          size === 'xs' ? styles.tabTextXs :
          size === 'sm' ? styles.tabTextSm :
          styles.tabTextMedium,
        ].join(' ');

        const contentClass = [
          styles.tabContent,
          size === 'xs' ? styles.tabContentXs : '',
        ].filter(Boolean).join(' ');

        const badgeClass = [
          styles.badge,
          isSelected ? styles.badgeSelected : styles.badgeUnselected,
        ].join(' ');

        return (
          <button
            key={item.value}
            role="tab"
            type="button"
            aria-selected={isSelected}
            data-value={item.value}
            disabled={item.disabled}
            tabIndex={isSelected && !item.disabled ? 0 : -1}
            className={tabClass}
            onClick={() => handleSelect(item.value)}
            aria-label={isIconOnly ? (item.ariaLabel ?? item.value) : undefined}
          >
            <div className={contentClass}>
              {item.icon && (
                <Icon name={item.icon} aria-hidden style={{ fontSize: iconSize, flexShrink: 0 }} />
              )}
              {item.label && (
                <span className={textClass}>{item.label}</span>
              )}
              {item.badge !== undefined && (
                <span className={badgeClass}>{item.badge}</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
