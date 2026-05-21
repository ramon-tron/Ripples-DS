import { useState } from 'react';
import type { ReactNode } from 'react';
import { Radio } from './Radio';
import styles from './RadioGroup.module.css';

export type RadioGroupOrientation = 'vertical' | 'horizontal';

export interface RadioGroupItem {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Shared name attribute — ties all radios into one mutually exclusive group. */
  name: string;
  items: RadioGroupItem[];
  /** Controlled: currently selected value. */
  value?: string;
  /** Uncontrolled default selected value. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: RadioGroupOrientation;
  /** Disables every radio in the group. */
  disabled?: boolean;
  className?: string;
}

export function RadioGroup({
  name,
  items,
  value: controlledValue,
  defaultValue = '',
  onChange,
  orientation = 'vertical',
  disabled = false,
  className = '',
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  return (
    <div
      role="radiogroup"
      data-orientation={orientation}
      className={[styles.radioGroup, className].filter(Boolean).join(' ')}
    >
      {items.map((item) => (
        <Radio
          key={item.value}
          name={name}
          value={item.value}
          label={item.label}
          checked={selectedValue === item.value}
          disabled={disabled || item.disabled}
          onChange={() => {
            if (!isControlled) setInternalValue(item.value);
            onChange?.(item.value);
          }}
        />
      ))}
    </div>
  );
}
