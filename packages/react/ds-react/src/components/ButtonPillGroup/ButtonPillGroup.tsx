import { useState } from 'react';
import type { ReactNode } from 'react';
import { ButtonPill } from '../ButtonPill/ButtonPill';
import type { ButtonPillVariant, ButtonPillSize } from '../ButtonPill/ButtonPill';
import styles from './ButtonPillGroup.module.css';

export type ButtonPillGroupType = 'brand' | 'mono';
export type ButtonPillGroupSize = 'md' | 'sm';

export interface ButtonPillGroupItem {
  label: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  disabled?: boolean;
}

export interface ButtonPillGroupProps {
  type?: ButtonPillGroupType;
  size?: ButtonPillGroupSize;
  /** 2–6 items. Additional items beyond 6 are ignored. */
  items: ButtonPillGroupItem[];
  /** Controlled: index of the active pill. */
  activeIndex?: number;
  /** Uncontrolled default active index. */
  defaultActiveIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

const ACTIVE_VARIANT: Record<ButtonPillGroupType, ButtonPillVariant> = {
  brand: 'primary',
  mono:  'mono-primary',
};

const INACTIVE_VARIANT: Record<ButtonPillGroupType, ButtonPillVariant> = {
  brand: 'secondary',
  mono:  'mono-secondary',
};

export function ButtonPillGroup({
  type = 'brand',
  size = 'md',
  items,
  activeIndex: controlledActive,
  defaultActiveIndex = 0,
  onChange,
  className = '',
}: ButtonPillGroupProps) {
  const [internalActive, setInternalActive] = useState(defaultActiveIndex);
  const isControlled = controlledActive !== undefined;
  const activeIdx = isControlled ? controlledActive : internalActive;

  return (
    <div
      role="group"
      className={[styles.buttonPillGroup, className].filter(Boolean).join(' ')}
    >
      {items.slice(0, 6).map((item, i) => (
        <ButtonPill
          key={i}
          variant={i === activeIdx ? ACTIVE_VARIANT[type] : INACTIVE_VARIANT[type]}
          size={size as ButtonPillSize}
          leadingIcon={item.leadingIcon}
          trailingIcon={item.trailingIcon}
          disabled={item.disabled}
          aria-pressed={i === activeIdx}
          onClick={() => {
            if (!isControlled) setInternalActive(i);
            onChange?.(i);
          }}
        >
          {item.label}
        </ButtonPill>
      ))}
    </div>
  );
}
