import { createPortal } from 'react-dom';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Chip } from '../Chip/Chip';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import styles from './Dropdown.module.css';

// ─── Public types ─────────────────────────────────────────────────────────────

export type DropdownType = 'default' | 'search' | 'tags' | 'mini';
export type DropdownSize = 'default' | 'sm';

export interface DropdownOptionItem {
  type?: 'option';
  value: string;
  label: string;
  supportingText?: string;
  icon?: string;
  avatar?: { src?: string; initials?: string };
  disabled?: boolean;
}

export interface DropdownSectionItem {
  type: 'section';
  label: string;
  divider?: boolean;
  iconLeft?: string;
  iconRight?: string;
}

export interface DropdownDividerItem {
  type: 'divider';
}

export type DropdownItem = DropdownOptionItem | DropdownSectionItem | DropdownDividerItem;

export interface DropdownProps {
  type?: DropdownType;
  size?: DropdownSize;
  label?: string;
  helpIcon?: boolean;
  helperText?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  leadingIcon?: string;
  items: DropdownItem[];
  /** Single-select controlled value */
  value?: string | null;
  /** Single-select default (uncontrolled) */
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  /** Multi-select controlled values (tags type) */
  values?: string[];
  /** Multi-select default (uncontrolled, tags type) */
  defaultValues?: string[];
  onChangeMulti?: (values: string[]) => void;
  /** Icon name for the trailing action button (e.g. "search"). When omitted, no action button is shown. */
  actionIcon?: string;
  /** Accessible label for the action button */
  actionAriaLabel?: string;
  onActionClick?: () => void;
  id?: string;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isOption(item: DropdownItem): item is DropdownOptionItem {
  return !item.type || item.type === 'option';
}

function isSection(item: DropdownItem): item is DropdownSectionItem {
  return item.type === 'section';
}

function isDivider(item: DropdownItem): item is DropdownDividerItem {
  return item.type === 'divider';
}

function filterItems(items: DropdownItem[], query: string): DropdownItem[] {
  if (!query.trim()) return items;
  const q = query.toLowerCase();
  const result: DropdownItem[] = [];
  let pendingHeaders: DropdownItem[] = [];

  for (const item of items) {
    if (isSection(item) || isDivider(item)) {
      pendingHeaders = [item];
    } else if (isOption(item)) {
      const matches =
        item.label.toLowerCase().includes(q) ||
        (item.supportingText?.toLowerCase().includes(q) ?? false);
      if (matches) {
        result.push(...pendingHeaders, item);
        pendingHeaders = [];
      }
    }
  }
  return result;
}

// ─── Menu item ────────────────────────────────────────────────────────────────

interface MenuItemElProps {
  item: DropdownOptionItem;
  isSelected: boolean;
  isMulti: boolean;
  itemId: string;
  onSelect: (value: string) => void;
}

function MenuItemEl({ item, isSelected, isMulti: _isMulti, itemId, onSelect }: MenuItemElProps) {
  const hasAvatar = !!item.avatar;
  const hasIcon = !!item.icon && !hasAvatar;

  const handleClick = () => {
    if (!item.disabled) onSelect(item.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !item.disabled) {
      e.preventDefault();
      onSelect(item.value);
    }
  };

  return (
    <div
      id={itemId}
      role="option"
      aria-selected={isSelected}
      aria-disabled={item.disabled || undefined}
      tabIndex={item.disabled ? -1 : 0}
      className={[
        styles.menuItem,
        item.disabled ? styles.menuItemDisabled : '',
      ].filter(Boolean).join(' ')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.menuItemContent}>
        <div className={styles.menuItemTextLead}>
          {/* Leading avatar */}
          {hasAvatar && (
            <Avatar
              size="xs"
              src={item.avatar!.src}
              initials={item.avatar!.initials}
              style={{ width: 20, height: 20, fontSize: 8, flexShrink: 0 }}
            />
          )}
          {/* Leading icon */}
          {hasIcon && (
            <Icon
              name={item.icon!}
              aria-hidden
              style={{ fontSize: 20, flexShrink: 0, color: 'var(--ds-color-icon-primary)' }}
            />
          )}
          {/* Text */}
          <div className={styles.menuItemTexts}>
            <span className={styles.menuItemLabel}>{item.label}</span>
            {item.supportingText && (
              <span className={styles.menuItemSupporting}>{item.supportingText}</span>
            )}
          </div>
        </div>
        {/* Selected check — same for both single and multi-select */}
        {isSelected && (
          <Icon
            name="check_circle"
            aria-hidden
            style={{ fontSize: 20, flexShrink: 0, color: 'var(--ds-color-icon-brand)' }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────

const SIZE_CLASS: Record<DropdownType, Record<DropdownSize, string>> = {
  default: { default: styles.triggerDefault, sm: styles.triggerSm },
  search:  { default: styles.triggerDefault, sm: styles.triggerSm },
  tags:    { default: styles.triggerDefault, sm: styles.triggerSm },
  mini:    { default: styles.triggerMiniDefault, sm: styles.triggerMiniSm },
};

export function Dropdown({
  type = 'default',
  size = 'default',
  label,
  helpIcon = false,
  helperText,
  placeholder = 'Select an option',
  error = false,
  disabled = false,
  leadingIcon,
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  values: controlledValues,
  defaultValues,
  onChangeMulti,
  actionIcon,
  actionAriaLabel,
  onActionClick,
  id,
  wrapperClassName = '',
  wrapperStyle,
}: DropdownProps) {
  const isMulti = type === 'tags';
  const isSearchable = type === 'search';
  const isMini = type === 'mini';

  const uid = useId();
  const dropdownId = id ?? uid;
  const listboxId = `${dropdownId}-listbox`;
  const labelId = `${dropdownId}-label`;
  const helperId = `${dropdownId}-helper`;

  // ── Value state ──
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue ?? null);
  const [internalValues, setInternalValues] = useState<string[]>(defaultValues ?? []);

  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const currentValues = controlledValues !== undefined ? controlledValues : internalValues;

  // ── UI state ──
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});

  // ── Refs ──
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ── Derived ──
  const allOptions = items.filter(isOption);
  const selectedOption = allOptions.find(o => o.value === currentValue) ?? null;
  const selectedOptions = allOptions.filter(o => currentValues.includes(o.value));
  const displayItems = isSearchable ? filterItems(items, searchQuery) : items;
  const navigableItems = displayItems.filter(i => isOption(i) && !i.disabled) as DropdownOptionItem[];

  // ── Position ──
  const updateMenuPosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const spaceBelow = window.innerHeight - r.bottom;
    const isBelow = spaceBelow >= 150 || spaceBelow >= r.top;
    setMenuStyle({
      position: 'fixed',
      left: r.left,
      width: r.width,
      zIndex: 9999,
      ...(isBelow
        ? { top: r.bottom + 4 }
        : { top: r.top, transform: 'translateY(calc(-100% - 4px))' }),
    });
  }, []);

  // ── Open / close ──
  const openMenu = useCallback(() => {
    if (disabled) return;
    updateMenuPosition();
    setIsOpen(true);
  }, [disabled, updateMenuPosition]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
    triggerRef.current?.focus();
  }, []);

  // ── Focus first item on open ──
  useEffect(() => {
    if (!isOpen) return;
    if (isSearchable) {
      searchInputRef.current?.focus();
    } else {
      requestAnimationFrame(() => {
        menuRef.current
          ?.querySelector<HTMLElement>('[role="option"]:not([aria-disabled="true"])')
          ?.focus();
      });
    }
  }, [isOpen, isSearchable]);

  // ── Reposition on scroll / resize ──
  useEffect(() => {
    if (!isOpen) return;
    const handle = () => updateMenuPosition();
    window.addEventListener('scroll', handle, true);
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle, true);
      window.removeEventListener('resize', handle);
    };
  }, [isOpen, updateMenuPosition]);

  // ── Click outside ──
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [isOpen]);

  // ── Select ──
  const handleSelect = useCallback(
    (value: string) => {
      if (isMulti) {
        const next = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        setInternalValues(next);
        onChangeMulti?.(next);
      } else {
        const next = currentValue === value ? null : value;
        setInternalValue(next ?? null);
        onChange?.(next ?? null);
        closeMenu();
      }
    },
    [isMulti, currentValue, currentValues, onChange, onChangeMulti, closeMenu],
  );

  const handleRemoveTag = useCallback(
    (value: string) => {
      const next = currentValues.filter(v => v !== value);
      setInternalValues(next);
      onChangeMulti?.(next);
    },
    [currentValues, onChangeMulti],
  );

  // ── Keyboard — trigger ──
  const handleTriggerKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) {
          openMenu();
        } else {
          menuRef.current
            ?.querySelector<HTMLElement>('[role="option"]:not([aria-disabled="true"])')
            ?.focus();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) {
          openMenu();
        } else {
          const opts = menuRef.current?.querySelectorAll<HTMLElement>(
            '[role="option"]:not([aria-disabled="true"])',
          );
          if (opts?.length) opts[opts.length - 1].focus();
        }
      } else if (e.key === 'Escape') {
        closeMenu();
      }
    },
    [disabled, isOpen, openMenu, closeMenu],
  );

  // ── Keyboard — menu ──
  const handleMenuKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key === 'Tab') {
        closeMenu();
        return;
      }

      const focused = document.activeElement;
      const opts = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          '[role="option"]:not([aria-disabled="true"])',
        ) ?? [],
      );
      if (!opts.length) return;

      const idx = opts.indexOf(focused as HTMLElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        opts[(idx + 1) % opts.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        // If focus is in search input, go to last option
        if (idx === -1) {
          opts[opts.length - 1]?.focus();
        } else {
          opts[(idx - 1 + opts.length) % opts.length]?.focus();
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        opts[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        opts[opts.length - 1]?.focus();
      }
    },
    [closeMenu],
  );

  // ── Render helpers ──
  const labelRow = (label || (!isMini && helpIcon)) && (
    <div className={styles.labelRow}>
      {label && (
        <label
          id={labelId}
          htmlFor={dropdownId}
          className={[styles.label, disabled ? styles.labelDisabled : ''].filter(Boolean).join(' ')}
        >
          {label}
        </label>
      )}
      {!isMini && helpIcon && (
        <span
          className={[styles.helpIconWrap, disabled ? styles.helpIconWrapDisabled : ''].filter(Boolean).join(' ')}
          aria-hidden="true"
        >
          <Icon name="help" style={{ fontSize: 12 }} />
        </span>
      )}
    </div>
  );

  const helperTextEl = !isMini && helperText && (
    <span
      id={helperId}
      className={[styles.helperText, error ? styles.helperTextError : ''].filter(Boolean).join(' ')}
      role={error ? 'alert' : undefined}
    >
      {helperText}
    </span>
  );

  const triggerClass = [
    styles.trigger,
    SIZE_CLASS[type][size],
    isMini ? styles.triggerMini : '',
    isOpen ? styles.triggerOpen : '',
    error ? styles.triggerError : '',
    disabled ? styles.triggerDisabled : '',
  ].filter(Boolean).join(' ');

  const handleClearAll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setInternalValues([]);
      onChangeMulti?.([]);
    },
    [onChangeMulti],
  );

  // Trigger content (text area)
  const triggerContent = isMulti ? (
    // Tags trigger: search icon + chips row (clips with feather) + clear-all ×
    <div className={styles.tagsContent}>
      <Icon
        name="search"
        aria-hidden
        style={{
          fontSize: 20,
          flexShrink: 0,
          color: disabled ? 'var(--ds-color-text-disabled)' : 'var(--ds-color-text-tertiary)',
        }}
      />
      <div className={styles.chipsRow}>
        {selectedOptions.length === 0 ? (
          <span className={styles.triggerPlaceholder}>{placeholder}</span>
        ) : (
          selectedOptions.map(opt => (
            <Chip
              key={opt.value}
              size="sm"
              onDismiss={disabled ? undefined : (e) => { e?.stopPropagation(); handleRemoveTag(opt.value); }}
            >
              {opt.label}
            </Chip>
          ))
        )}
      </div>
      {selectedOptions.length > 0 && (
        <button
          type="button"
          className={styles.clearAllBtn}
          onClick={handleClearAll}
          disabled={disabled}
          aria-label="Clear all"
          tabIndex={-1}
        >
          <Icon name="close" aria-hidden style={{ fontSize: 18 }} />
        </button>
      )}
    </div>
  ) : (
    // Default / search / mini trigger: text display
    <>
      {leadingIcon && (
        <Icon
          name={leadingIcon}
          aria-hidden
          style={{
            fontSize: isMini ? 16 : 20,
            flexShrink: 0,
            color: disabled ? 'var(--ds-color-text-disabled)' : 'var(--ds-color-text-tertiary)',
          }}
        />
      )}
      {isSearchable && isOpen ? (
        <input
          ref={searchInputRef}
          type="text"
          className={styles.searchInput}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={selectedOption?.label ?? placeholder}
          disabled={disabled}
          aria-autocomplete="list"
          aria-controls={listboxId}
          onClick={e => e.stopPropagation()}
        />
      ) : (
        <span
          className={[
            styles.triggerText,
            !selectedOption ? styles.triggerPlaceholder : '',
          ].filter(Boolean).join(' ')}
        >
          {selectedOption?.label ?? placeholder}
        </span>
      )}
    </>
  );

  // ── Menu items ──
  const menuContent = navigableItems.length === 0 && searchQuery ? (
    <div className={styles.menuEmpty}>No results found</div>
  ) : (
    displayItems.map((item, i) => {
      if (isDivider(item)) {
        return <div key={i} className={styles.menuDivider} role="separator" />;
      }
      if (isSection(item)) {
        return (
          <div
            key={i}
            className={item.divider ? styles.sectionHeaderDivider : styles.sectionHeader}
            role="presentation"
          >
            <div className={styles.sectionHeaderContent}>
              {item.iconLeft && (
                <Icon name={item.iconLeft} aria-hidden style={{ fontSize: 16, color: 'var(--ds-color-icon-secondary)' }} />
              )}
              <span className={styles.sectionHeaderLabel}>{item.label}</span>
            </div>
            {item.iconRight && (
              <Icon name={item.iconRight} aria-hidden style={{ fontSize: 16, color: 'var(--ds-color-icon-secondary)' }} />
            )}
          </div>
        );
      }
      const isSelected = isMulti
        ? currentValues.includes(item.value)
        : currentValue === item.value;
      return (
        <MenuItemEl
          key={item.value}
          item={item}
          isSelected={isSelected}
          isMulti={isMulti}
          itemId={`${listboxId}-${item.value}`}
          onSelect={handleSelect}
        />
      );
    })
  );

  // ── Menu portal ──
  const menuPortal = isOpen && createPortal(
    <div
      ref={menuRef}
      id={listboxId}
      role="listbox"
      aria-multiselectable={isMulti || undefined}
      aria-labelledby={label ? labelId : undefined}
      className={styles.menu}
      style={menuStyle}
      onKeyDown={handleMenuKeyDown}
    >
      <div className={styles.menuInner}>
        {menuContent}
      </div>
    </div>,
    document.body,
  );

  return (
    <div
      className={[
        styles.wrapper,
        isMini ? styles.wrapperMini : '',
        wrapperClassName,
      ].filter(Boolean).join(' ')}
      style={wrapperStyle}
    >
      {labelRow}

      <div
        ref={triggerRef}
        id={dropdownId}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={helperText ? helperId : undefined}
        aria-disabled={disabled || undefined}
        aria-invalid={error || undefined}
        tabIndex={disabled ? -1 : 0}
        className={triggerClass}
        onClick={!disabled ? () => (isOpen ? closeMenu() : openMenu()) : undefined}
        onKeyDown={handleTriggerKeyDown}
      >
        {triggerContent}

        {/* Default + Mini: chevron */}
        {(type === 'default' || type === 'mini') && (
          <Icon
            name={isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            aria-hidden
            style={{
              fontSize: 24,
              flexShrink: 0,
              color: disabled ? 'var(--ds-color-text-disabled)' : 'var(--ds-color-text-tertiary)',
              transition: 'transform 150ms ease',
            }}
          />
        )}

        {/* Optional action button */}
        {actionIcon && (
          <>
            <div className={styles.actionDivider} aria-hidden="true" />
            <div className={styles.actionBtnWrap}>
              <IconButton
                icon={actionIcon}
                variant="mono-tertiary"
                size="s"
                shape="square"
                disabled={disabled}
                aria-label={actionAriaLabel ?? actionIcon}
                onClick={e => { e.stopPropagation(); onActionClick?.(); }}
              />
            </div>
          </>
        )}
      </div>

      {helperTextEl}
      {menuPortal}
    </div>
  );
}
