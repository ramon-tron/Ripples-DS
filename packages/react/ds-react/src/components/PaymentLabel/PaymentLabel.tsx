import type { CSSProperties } from 'react';
import styles from './PaymentLabel.module.css';

export type PaymentLabelType = 'pending' | 'paid' | 'partial' | 'none';
export type PaymentLabelSize = 'md' | 'sm';

export interface PaymentLabelProps {
  amount: string;
  type?: PaymentLabelType;
  size?: PaymentLabelSize;
  className?: string;
  style?: CSSProperties;
}

export function PaymentLabel({
  amount,
  type = 'pending',
  size = 'md',
  className = '',
  style,
}: PaymentLabelProps) {
  return (
    <span
      style={style}
      className={[styles.paymentLabel, styles[type], styles[size], className]
        .filter(Boolean)
        .join(' ')}
    >
      {amount}
    </span>
  );
}
