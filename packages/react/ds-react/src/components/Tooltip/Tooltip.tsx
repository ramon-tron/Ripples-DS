import { type CSSProperties } from 'react';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import styles from './Tooltip.module.css';

// ─── Public types ─────────────────────────────────────────────────────────────

export type TooltipArrow =
  | 'none'
  | 'top-left'    | 'top-center'    | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'left'        | 'right';

export type TooltipTitleColor = 'default' | 'brand' | 'alert' | 'error' | 'success';

export interface TooltipProps {
  title: string;
  titleColor?: TooltipTitleColor;
  /** Body text shown below the title */
  content?: string;
  /** Material Symbols icon name shown left of the title */
  icon?: string;
  /** Show a close (×) button */
  showClose?: boolean;
  onClose?: () => void;
  /** Which edge of the bubble the arrow appears on */
  arrow?: TooltipArrow;
  className?: string;
  style?: CSSProperties;
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

export function Tooltip({
  title,
  titleColor = 'default',
  content,
  icon,
  showClose = false,
  onClose,
  arrow = 'none',
  className = '',
  style,
}: TooltipProps) {
  const hasExtras = !!(content || icon || showClose);

  const wrapperClass = [styles.wrapper, className].filter(Boolean).join(' ');

  const bubbleClass = [
    styles.bubble,
    hasExtras ? styles.bubbleFull : styles.bubbleSimple,
  ].join(' ');

  const titleClass = [
    styles.title,
    titleColor === 'brand'   ? styles.titleBrand   :
    titleColor === 'alert'   ? styles.titleAlert   :
    titleColor === 'error'   ? styles.titleError   :
    titleColor === 'success' ? styles.titleSuccess :
    styles.titleDefault,
  ].join(' ');

  const arrowClass = arrow === 'none' ? undefined : [
    styles.arrow,
    (styles as Record<string, string>)[`arrow-${arrow}`],
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass} style={style}>
      {arrowClass && <span className={arrowClass} aria-hidden />}
      <div className={bubbleClass}>
        <div className={styles.contentRow}>
          {icon && (
            <Icon name={icon} aria-hidden style={{ fontSize: 16 }} className={styles.headerIcon} />
          )}
          <div className={styles.textCol}>
            <div className={styles.titleRow}>
              <span className={titleClass}>{title}</span>
              {showClose && (
                <IconButton
                  icon="close"
                  variant="inverse"
                  size="xs"
                  shape="circular"
                  aria-label="Close"
                  onClick={onClose}
                />
              )}
            </div>
            {content && <p className={styles.content}>{content}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
