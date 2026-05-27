import type { CSSProperties } from 'react';
import { Avatar } from './Avatar';
import type { AvatarSize } from './Avatar';
import avatarStyles from './Avatar.module.css';

export interface AvatarGroupItem {
  src?: string;
  initials?: string;
  alt?: string;
}

export interface AvatarGroupProps {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: AvatarSize;
  className?: string;
  style?: CSSProperties;
}

const OVERLAP: Record<AvatarSize, number> = {
  xl: 20,
  lg: 14,
  md: 10,
  sm: 6,
  xs: 4,
};

const RING = '0 0 0 2px var(--ds-color-fill-primary)';

export function AvatarGroup({ avatars, max = 5, size = 'md', className = '', style }: AvatarGroupProps) {
  const total = avatars.length;
  const hasOverflow = total > max;
  const visible = hasOverflow ? avatars.slice(0, max - 1) : avatars;
  const overflowCount = hasOverflow ? total - (max - 1) : 0;
  const overlap = OVERLAP[size];

  return (
    <div
      role="group"
      aria-label={`${total} member${total !== 1 ? 's' : ''}`}
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', ...style }}
    >
      {visible.map((avatar, i) => (
        <Avatar
          key={i}
          src={avatar.src}
          initials={avatar.initials}
          alt={avatar.alt}
          size={size}
          style={{
            marginLeft: i === 0 ? 0 : -overlap,
            zIndex: visible.length - i + (hasOverflow ? 1 : 0),
            boxShadow: RING,
            position: 'relative',
          }}
        />
      ))}
      {hasOverflow && (
        <span
          className={[avatarStyles.avatar, avatarStyles[size], avatarStyles.overflow].join(' ')}
          style={{ marginLeft: -overlap, zIndex: 1, boxShadow: RING, position: 'relative' }}
          role="img"
          aria-label={`${overflowCount} more`}
        >
          <span className={avatarStyles.initials} aria-hidden="true">
            +{overflowCount}
          </span>
        </span>
      )}
    </div>
  );
}
