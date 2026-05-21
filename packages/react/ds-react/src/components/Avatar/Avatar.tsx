import type { CSSProperties } from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type AvatarColor =
  | '1' | '2' | '3' | '4' | '5'
  | '1-subtle' | '2-subtle' | '3-subtle' | '4-subtle' | '5-subtle';

export interface AvatarProps {
  src?: string;
  initials?: string;
  size?: AvatarSize;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}

const ALL_COLORS: AvatarColor[] = [
  '1', '2', '3', '4', '5',
  '1-subtle', '2-subtle', '3-subtle', '4-subtle', '5-subtle',
];

function deriveColor(str: string): AvatarColor {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) >>> 0;
  }
  return ALL_COLORS[hash % ALL_COLORS.length];
}

export function Avatar({ src, initials = '', size = 'md', alt, className = '', style }: AvatarProps) {
  const colorClass = src ? undefined : styles[`color-${deriveColor(initials)}`];
  const displayInitials = initials.slice(0, 2).toUpperCase();

  return (
    <span
      className={[styles.avatar, styles[size], colorClass, className].filter(Boolean).join(' ')}
      style={style}
      role={src ? undefined : 'img'}
      aria-label={alt ?? (initials ? `${initials} avatar` : undefined)}
    >
      {src ? (
        <img src={src} alt={alt ?? initials} className={styles.img} />
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {displayInitials}
        </span>
      )}
    </span>
  );
}
