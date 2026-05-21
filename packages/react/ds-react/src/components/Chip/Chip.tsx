import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import styles from './Chip.module.css';

export type ChipSize = 'md' | 'sm';

export interface ChipProps {
  children: ReactNode;
  onDismiss?: () => void;
  icon?: string;
  avatar?: ReactNode;
  size?: ChipSize;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const ICON_PX: Record<ChipSize, number> = { md: 16, sm: 12 };

export function Chip({
  children,
  onDismiss,
  icon,
  avatar,
  size = 'md',
  selected = false,
  disabled = false,
  className = '',
  style,
}: ChipProps) {
  const hasLeading = Boolean(avatar || icon);

  return (
    <span
      style={style}
      className={[
        styles.chip,
        styles[size],
        hasLeading ? styles.hasLeading : '',
        onDismiss ? styles.hasDismiss : '',
        selected ? styles.selected : '',
        disabled ? styles.disabled : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {avatar && <span className={styles.avatarSlot}>{avatar}</span>}
      {!avatar && icon && (
        <Icon name={icon} size="xs" style={{ fontSize: ICON_PX[size] }} aria-hidden />
      )}
      <span className={styles.label}>{children}</span>
      {onDismiss && (
        <IconButton
          icon="close"
          variant="mono-tertiary"
          size="xs"
          disabled={disabled}
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onDismiss();
          }}
        />
      )}
    </span>
  );
}
