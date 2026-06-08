import { Icon } from '../Icon/Icon';
import styles from './TranscriptSearch.module.css';

export type TranscriptSearchState = 'default' | 'active' | 'not-found';

export interface TranscriptSearchProps {
  /** Controlled input value. */
  value?: string;
  onChange?: (value: string) => void;
  /** Called when the clear (×) button is clicked. */
  onClear?: () => void;
  /** Called when the previous-result arrow is clicked. */
  onPrevious?: () => void;
  /** Called when the next-result arrow is clicked. */
  onNext?: () => void;
  /**
   * Current 1-based result index. Displayed as "N of total" in the active state.
   * @default 1
   */
  currentResult?: number;
  /**
   * Total number of matched results. Displayed as "current of N" in the active state.
   * @default 0
   */
  totalResults?: number;
  /**
   * - `default`   — empty input, no results yet.
   * - `active`    — search term found; shows result count.
   * - `not-found` — search term not found; shows "Not found".
   * @default 'default'
   */
  state?: TranscriptSearchState;
  className?: string;
}

export function TranscriptSearch({
  value = '',
  onChange,
  onClear,
  onPrevious,
  onNext,
  currentResult = 1,
  totalResults = 0,
  state = 'default',
  className,
}: TranscriptSearchProps) {
  const isActive   = state === 'active';
  const isNotFound = state === 'not-found';
  const showClear  = isActive || isNotFound;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {(isActive || isNotFound) && (
        <p className={styles.statusLabel}>
          {isNotFound ? 'Not found' : `${currentResult} of ${totalResults}`}
        </p>
      )}

      <div className={styles.searchRow}>
        {/* ── Search input ── */}
        <div className={styles.inputContainer}>
          <span className={styles.searchIcon}>
            <Icon name="search" size="s" aria-hidden />
          </span>
          <input
            className={styles.input}
            type="text"
            placeholder="Search Transcript"
            value={value}
            onChange={e => onChange?.(e.target.value)}
            aria-label="Search transcript"
          />
          {showClear && (
            <button
              className={styles.clearButton}
              onClick={onClear}
              aria-label="Clear search"
              type="button"
            >
              <Icon name="close" size="xs" aria-hidden />
            </button>
          )}
        </div>

        {/* ── Prev / Next navigation ── */}
        <div className={styles.navContainer} role="group" aria-label="Navigate results">
          <button
            className={styles.navBtn}
            onClick={onPrevious}
            aria-label="Previous result"
            type="button"
          >
            <Icon name="keyboard_arrow_left" size="s" aria-hidden />
          </button>
          <span className={styles.navDivider} aria-hidden />
          <button
            className={styles.navBtn}
            onClick={onNext}
            aria-label="Next result"
            type="button"
          >
            <Icon name="keyboard_arrow_right" size="s" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
