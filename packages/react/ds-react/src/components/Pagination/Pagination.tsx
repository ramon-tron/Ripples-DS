import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import type { DropdownItem } from '../Dropdown/Dropdown';
import { IconButton } from '../IconButton/IconButton';
import styles from './Pagination.module.css';

export type PaginationSize = 'default' | 'large';

// ─── Compact props ─────────────────────────────────────────────────────────────

interface CompactPaginationProps {
  type?: 'compact';
  /** Total number of slides / items */
  count: number;
  size?: PaginationSize;
  /** Enable autoplay cycling (default: true) */
  autoPlay?: boolean;
  /** Duration of each slide in ms (default: 10000) */
  autoPlayInterval?: number;
  /** Controlled current index */
  index?: number;
  /** Initial index for uncontrolled mode (default: 0) */
  defaultIndex?: number;
  /** Called when the active index changes */
  onIndexChange?: (index: number) => void;
  className?: string;
  style?: CSSProperties;
}

// ─── Full props ────────────────────────────────────────────────────────────────

interface FullPaginationProps {
  type: 'full';
  /** Total number of items */
  total: number;
  size?: PaginationSize;
  /** Controlled current page (1-based) */
  page?: number;
  /** Initial page for uncontrolled mode (default: 1) */
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  /** Controlled items-per-page */
  itemsPerPage?: number;
  /** Initial items-per-page for uncontrolled mode (default: 10) */
  defaultItemsPerPage?: number;
  onItemsPerPageChange?: (value: number) => void;
  className?: string;
  style?: CSSProperties;
}

export type PaginationProps = CompactPaginationProps | FullPaginationProps;

// ─── Pagination Indicator ──────────────────────────────────────────────────────

interface IndicatorProps {
  index: number;
  isCurrent: boolean;
  autoPlay: boolean;
  size: PaginationSize;
  animKey: number;
  isPaused: boolean;
  autoPlayInterval: number;
  onAnimationEnd: () => void;
  onClick: () => void;
}

function PaginationIndicator({
  index,
  isCurrent,
  autoPlay,
  size,
  animKey,
  isPaused,
  autoPlayInterval,
  onAnimationEnd,
  onClick,
}: IndicatorProps) {
  const isLarge = size === 'large';

  return (
    <button
      type="button"
      className={styles.indicatorBtn}
      onClick={onClick}
      aria-label={`Go to slide ${index + 1}`}
      aria-current={isCurrent ? 'true' : undefined}
    >
      {isCurrent ? (
        <div
          className={[
            styles.currentTrack,
            isLarge ? styles.currentTrackLarge : styles.currentTrackDefault,
          ].join(' ')}
        >
          {autoPlay ? (
            <div
              key={animKey}
              className={[styles.progressFill, isPaused ? styles.progressFillPaused : ''].filter(Boolean).join(' ')}
              style={{ animationDuration: `${autoPlayInterval}ms` }}
              onAnimationEnd={onAnimationEnd}
            />
          ) : (
            <div className={styles.currentFilled} />
          )}
        </div>
      ) : (
        <div
          className={[styles.dot, isLarge ? styles.dotLarge : styles.dotDefault].join(' ')}
        />
      )}
    </button>
  );
}

// ─── Compact Pagination ────────────────────────────────────────────────────────

function CompactPagination({
  count,
  size = 'default',
  autoPlay = true,
  autoPlayInterval = 10000,
  index: controlledIndex,
  defaultIndex = 0,
  onIndexChange,
  className,
  style,
}: CompactPaginationProps) {
  const isLarge = size === 'large';
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  // Reset animation whenever the active index changes
  const prevIndex = useRef(activeIndex);
  useEffect(() => {
    if (prevIndex.current !== activeIndex) {
      prevIndex.current = activeIndex;
      setAnimKey(k => k + 1);
    }
  }, [activeIndex]);

  const goTo = (next: number) => {
    if (controlledIndex === undefined) setInternalIndex(next);
    onIndexChange?.(next);
    setAnimKey(k => k + 1);
  };

  const handleAnimationEnd = () => {
    if (!isPaused && autoPlay) {
      goTo((activeIndex + 1) % count);
    }
  };

  const handlePlayPause = () => setIsPaused(p => !p);

  // Touch / pointer swipe detection on the strip
  const pointerStartX = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const delta = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) < 30) return;
    const next = delta < 0
      ? (activeIndex + 1) % count
      : (activeIndex - 1 + count) % count;
    goTo(next);
  };

  const safeCount = isNaN(count) || count == null ? 0 : count;

  return (
    <div
      className={[styles.compact, className].filter(Boolean).join(' ')}
      style={style}
      role="group"
      aria-label={`Slide ${activeIndex + 1} of ${safeCount}`}
    >
      <div
        className={[styles.strip, isLarge ? styles.stripLarge : styles.stripDefault].join(' ')}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {Array.from({ length: safeCount }, (_, i) => (
          <PaginationIndicator
            key={i}
            index={i}
            isCurrent={i === activeIndex}
            autoPlay={autoPlay}
            size={size}
            animKey={animKey}
            isPaused={isPaused}
            autoPlayInterval={autoPlayInterval}
            onAnimationEnd={handleAnimationEnd}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {autoPlay && (
        <IconButton
          icon={isPaused ? 'play_arrow' : 'pause'}
          iconFill={1}
          variant="mono-secondary"
          size={isLarge ? 'm' : 's'}
          shape="circular"
          aria-label={isPaused ? 'Play' : 'Pause'}
          onClick={handlePlayPause}
        />
      )}

      <span className={styles.visuallyHidden} aria-live="polite" aria-atomic>
        {`Slide ${activeIndex + 1} of ${count}`}
      </span>
    </div>
  );
}

// ─── Full Pagination ───────────────────────────────────────────────────────────

const PER_PAGE_OPTIONS: DropdownItem[] = [10, 20, 30, 40, 50].map(n => ({
  value: String(n),
  label: String(n),
}));

function FullPagination({
  total,
  size = 'default',
  page: controlledPage,
  defaultPage = 1,
  onPageChange,
  itemsPerPage: controlledItemsPerPage,
  defaultItemsPerPage = 10,
  onItemsPerPageChange,
  className,
  style,
}: FullPaginationProps) {
  const isLarge = size === 'large';
  const safeTotal = (isNaN(total) || total == null) ? 0 : total;

  const [internalPage, setInternalPage] = useState(defaultPage);
  const [internalPerPage, setInternalPerPage] = useState(defaultItemsPerPage);
  const [pageInputValue, setPageInputValue] = useState(String(defaultPage));

  const activePage = controlledPage !== undefined ? controlledPage : internalPage;
  const activePerPage = controlledItemsPerPage !== undefined ? controlledItemsPerPage : internalPerPage;
  const totalPages = Math.max(1, Math.ceil(safeTotal / activePerPage));

  // Keep page input in sync with controlled page changes
  useEffect(() => {
    setPageInputValue(String(activePage));
  }, [activePage]);

  const setPage = (next: number) => {
    const clamped = Math.max(1, Math.min(next, totalPages));
    if (controlledPage === undefined) setInternalPage(clamped);
    onPageChange?.(clamped);
    setPageInputValue(String(clamped));
  };

  const handlePerPageChange = (val: string | null) => {
    if (!val) return;
    const num = parseInt(val, 10);
    if (controlledItemsPerPage === undefined) setInternalPerPage(num);
    onItemsPerPageChange?.(num);
    setPage(1);
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInputValue(e.target.value);
  };

  const handlePageInputCommit = () => {
    const parsed = parseInt(pageInputValue, 10);
    if (!isNaN(parsed)) {
      setPage(parsed);
    } else {
      setPageInputValue(String(activePage));
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handlePageInputCommit();
    if (e.key === 'Escape') setPageInputValue(String(activePage));
  };

  const displayedCount = Math.min(activePerPage, Math.max(0, safeTotal - (activePage - 1) * activePerPage));

  return (
    <div
      className={[styles.full, className].filter(Boolean).join(' ')}
      style={style}
    >
      {/* Left: range summary */}
      <span className={styles.rangeText}>
        {'Displaying '}
        <span className={styles.rangeTextStrong}>{displayedCount}</span>
        {' of '}
        <span className={styles.rangeTextStrong}>{safeTotal}</span>
      </span>

      {/* Right: controls */}
      <div className={styles.controls}>
        {/* Items per page */}
        <div className={styles.perPage}>
          <span className={styles.perPageLabel}>Items per page:</span>
          <Dropdown
            type="default"
            size={isLarge ? 'default' : 'sm'}
            items={PER_PAGE_OPTIONS}
            value={String(activePerPage)}
            onChange={handlePerPageChange}
            wrapperClassName={styles.perPageDropdown}
          />
        </div>

        {/* Page selection */}
        <div className={styles.pageSelection}>
          <IconButton
            icon="keyboard_arrow_left"
            variant="mono-secondary"
            size={isLarge ? 'l' : 'm'}
            shape="square"
            disabled={activePage <= 1}
            aria-label="Previous page"
            onClick={() => setPage(activePage - 1)}
          />

          <input
            type="number"
            className={[
              styles.pageInput,
              isLarge ? styles.pageInputLarge : styles.pageInputDefault,
            ].join(' ')}
            value={pageInputValue}
            onChange={handlePageInputChange}
            onBlur={handlePageInputCommit}
            onKeyDown={handlePageInputKeyDown}
            aria-label="Current page"
            min={1}
            max={totalPages}
          />

          <span className={styles.ofLabel}>of</span>
          <span className={styles.ofLabel}>{totalPages}</span>

          <IconButton
            icon="keyboard_arrow_right"
            variant="mono-secondary"
            size={isLarge ? 'l' : 'm'}
            shape="square"
            disabled={activePage >= totalPages}
            aria-label="Next page"
            onClick={() => setPage(activePage + 1)}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Pagination (public export) ────────────────────────────────────────────────

export function Pagination(props: PaginationProps) {
  if (props.type === 'full') return <FullPagination {...props} />;
  return <CompactPagination {...props} />;
}
