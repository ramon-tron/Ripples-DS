import type { CSSProperties } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './StatusChip.module.css';

export type StatusChipType = 'at-risk' | 'excluded';
export type StatusChipSize = 'md' | 'sm';

export interface StatusChipProps {
  type: StatusChipType;
  size?: StatusChipSize;
  className?: string;
  style?: CSSProperties;
}

const CONFIG: Record<StatusChipType, { icon: string; label: string }> = {
  'at-risk':  { icon: 'flag',  label: 'At Risk'  },
  'excluded': { icon: 'close', label: 'Excluded' },
};

const ICON_PX: Record<StatusChipSize, number> = { md: 16, sm: 12 };

export function StatusChip({ type, size = 'md', className = '', style }: StatusChipProps) {
  const { icon, label } = CONFIG[type];

  return (
    <span
      style={style}
      className={[styles.statusChip, styles[type], styles[size], className]
        .filter(Boolean)
        .join(' ')}
    >
      <Icon name={icon} size="xs" style={{ fontSize: ICON_PX[size] }} aria-hidden />
      <span className={styles.label}>{label}</span>
    </span>
  );
}
