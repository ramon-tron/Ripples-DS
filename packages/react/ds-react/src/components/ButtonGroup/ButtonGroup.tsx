import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import type { ButtonProps } from '../Button/Button';
import styles from './ButtonGroup.module.css';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupProps {
  orientation?: ButtonGroupOrientation;
  button1: Omit<ButtonProps, 'className'>;
  button2: Omit<ButtonProps, 'className'>;
  className?: string;
}

export function ButtonGroup({
  orientation = 'horizontal',
  button1,
  button2,
  className = '',
}: ButtonGroupProps) {
  return (
    <div
      data-orientation={orientation}
      className={[styles.buttonGroup, className].filter(Boolean).join(' ')}
    >
      <Button {...button1} className={styles.buttonItem} />
      <Button {...button2} className={styles.buttonItem} />
    </div>
  );
}
