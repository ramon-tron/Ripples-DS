import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { TranscriptBlock } from '../TranscriptBlock/TranscriptBlock';
import { TranscriptSearch } from '../TranscriptSearch/TranscriptSearch';
import { useOptionalToast } from '../Toast/Toast';
import type { TranscriptSpeaker } from '../TranscriptAvatar/TranscriptAvatar';
import type { TranscriptSearchState } from '../TranscriptSearch/TranscriptSearch';
import styles from './Transcript.module.css';

export interface TranscriptEntry {
  id: string;
  speaker: TranscriptSpeaker;
  text: string;
}

export type TranscriptVariant = 'default' | 'searching' | 'follow-along' | 'add-highlight';

export interface TranscriptHighlight {
  entryId: string;
  start: number;
  end: number;
}

export interface TranscriptProps {
  /** Ordered list of transcript entries to display. */
  entries: TranscriptEntry[];
  /**
   * - `default`       — plain transcript, search bar in idle state.
   * - `searching`     — search bar shows result count; a matched range can be highlighted.
   * - `follow-along`  — a word/phrase is highlighted with a vivid yellow pill (current playback).
   * - `add-highlight` — user can drag to select text; a floating button saves the selection.
   * @default 'default'
   */
  variant?: TranscriptVariant;

  /** Current text in the search input. */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchClear?: () => void;
  onSearchPrevious?: () => void;
  onSearchNext?: () => void;
  /** State of the search bar. @default 'default' */
  searchState?: TranscriptSearchState;
  /** 1-based index of the active search result. */
  searchCurrentResult?: number;
  /** Total number of search results. */
  searchTotalResults?: number;

  /** Entry + character range to highlight as a search match (amber border style). */
  searchHighlight?: TranscriptHighlight;

  /** Entry + character range to highlight as current playback position (yellow pill). */
  followAlongHighlight?: TranscriptHighlight;

  /** Saved highlight to display in add-highlight mode. Updated by the parent via onAddHighlight. */
  addHighlightSelection?: TranscriptHighlight;
  /**
   * Called when the user clicks the floating "Add Highlight" button.
   * Receives the character range the user selected.
   */
  onAddHighlight?: (highlight: TranscriptHighlight) => void;
  /**
   * When true, shows a "Highlight added" toast after the user saves a highlight.
   * Requires a `<ToastProvider>` ancestor; silently ignored if none is found.
   * @default false
   */
  showHighlightToast?: boolean;

  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Walk text nodes within `root` and return the cumulative char offset to `target:offset`. */
function getCharOffset(root: Node, target: Node, offset: number): number {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let chars = 0;
  let node = walker.nextNode();
  while (node) {
    if (node === target) return chars + offset;
    chars += node.textContent?.length ?? 0;
    node = walker.nextNode();
  }
  return chars + offset;
}

/** Walk up the DOM from `node` to `boundary`, returning the first element with data-entry-id. */
function findEntryEl(node: Node | null, boundary: Node | null): HTMLElement | null {
  while (node && node !== boundary) {
    if (node instanceof HTMLElement && node.dataset.entryId) return node;
    node = node.parentElement;
  }
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Transcript({
  entries,
  variant = 'default',
  searchValue = '',
  onSearchChange,
  onSearchClear,
  onSearchPrevious,
  onSearchNext,
  searchState = 'default',
  searchCurrentResult,
  searchTotalResults,
  searchHighlight,
  followAlongHighlight,
  addHighlightSelection,
  onAddHighlight,
  showHighlightToast = false,
  className,
}: TranscriptProps) {
  const toast = useOptionalToast();
  const blocksRef     = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const addBtnRef     = useRef<HTMLButtonElement>(null);

  // Pending selection: set on mouseup, cleared on button click or outside click.
  const [pendingSelection, setPendingSelection] = useState<TranscriptHighlight | null>(null);
  const [btnPos, setBtnPos] = useState<{ top: number; left: number } | null>(null);

  // Process the browser selection into a TranscriptHighlight + button position.
  const processSelection = useCallback((e: MouseEvent) => {
    if (variant !== 'add-highlight') return;

    // Don't clear state when the mouseup came from clicking the Add Highlight button.
    if (addBtnRef.current?.contains(e.target as Node)) return;

    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) {
      setPendingSelection(null);
      setBtnPos(null);
      return;
    }

    const range  = sel.getRangeAt(0);
    const blocks = blocksRef.current;
    const wrapper = scrollWrapperRef.current;
    if (!blocks || !wrapper) return;

    // Find which transcript entry contains the selection start.
    const startEntryEl = findEntryEl(range.startContainer, blocks);
    const endEntryEl   = findEntryEl(range.endContainer,   blocks);

    // Only support single-block selections.
    if (!startEntryEl || startEntryEl !== endEntryEl) {
      setPendingSelection(null);
      setBtnPos(null);
      return;
    }

    const entryId = startEntryEl.dataset.entryId!;

    // The text paragraph is the first <p> within the entry wrapper
    // (the avatar contains only spans, never a <p>).
    const textEl = startEntryEl.querySelector('p');
    if (!textEl) return;

    const start = getCharOffset(textEl, range.startContainer, range.startOffset);
    const end   = getCharOffset(textEl, range.endContainer,   range.endOffset);
    if (start >= end) return;

    setPendingSelection({ entryId, start, end });

    // Position the button at the top-right of the first line of the selection.
    const rects = range.getClientRects();
    if (!rects.length) return;
    const firstRect   = rects[0];
    const wrapperRect = wrapper.getBoundingClientRect();
    const btnSize     = 28; // 6px pad × 2 + 16px icon

    setBtnPos({
      top:  Math.max(0, firstRect.top - wrapperRect.top - btnSize - 4),
      left: Math.min(
        wrapperRect.width - btnSize,
        firstRect.right - wrapperRect.left - btnSize,
      ),
    });

    // Remove the browser's native selection highlight after React re-renders
    // so only the custom amber mark is visible.
    requestAnimationFrame(() => window.getSelection()?.removeAllRanges());
  }, [variant]);

  // Listen for mouseup on the document so dragging outside still registers.
  useEffect(() => {
    if (variant !== 'add-highlight') return;
    document.addEventListener('mouseup', processSelection);
    return () => document.removeEventListener('mouseup', processSelection);
  }, [variant, processSelection]);

  // Dismiss pending selection when the user clicks outside the blocks or button.
  useEffect(() => {
    if (variant !== 'add-highlight' || !pendingSelection) return;

    const dismiss = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !blocksRef.current?.contains(target) &&
        !addBtnRef.current?.contains(target)
      ) {
        setPendingSelection(null);
        setBtnPos(null);
        window.getSelection()?.removeAllRanges();
      }
    };

    document.addEventListener('mousedown', dismiss);
    return () => document.removeEventListener('mousedown', dismiss);
  }, [variant, pendingSelection]);

  // Clear pending selection when switching away from add-highlight mode.
  useEffect(() => {
    if (variant !== 'add-highlight') {
      setPendingSelection(null);
      setBtnPos(null);
    }
  }, [variant]);

  const handleAddHighlight = () => {
    if (!pendingSelection) return;
    onAddHighlight?.(pendingSelection);
    if (showHighlightToast && toast) {
      toast.addToast({ type: 'default', title: 'Highlight added' });
    }
    setPendingSelection(null);
    setBtnPos(null);
    window.getSelection()?.removeAllRanges();
  };

  // The active add-highlight selection: pending (in-progress drag) takes priority
  // over the saved selection passed from the parent.
  const activeAddHighlight = pendingSelection ?? addHighlightSelection;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {/* ── Scrollable transcript area ── */}
      <div ref={scrollWrapperRef} className={styles.scrollWrapper}>
        <div className={styles.scrollArea}>
          <div
            ref={blocksRef}
            className={[
              styles.blocks,
              variant === 'add-highlight' ? styles.blocksSelectable : '',
            ].filter(Boolean).join(' ')}
          >
            {entries.map(entry => {
              let highlightedRange: { start: number; end: number } | undefined;
              let highlightVariant: 'search' | 'follow-along' = 'search';

              if (searchHighlight?.entryId === entry.id) {
                highlightedRange = { start: searchHighlight.start, end: searchHighlight.end };
              } else if (variant === 'follow-along' && followAlongHighlight?.entryId === entry.id) {
                highlightedRange = { start: followAlongHighlight.start, end: followAlongHighlight.end };
                highlightVariant = 'follow-along';
              } else if (variant === 'add-highlight' && activeAddHighlight?.entryId === entry.id) {
                highlightedRange = { start: activeAddHighlight.start, end: activeAddHighlight.end };
              }

              return (
                // data-entry-id lets processSelection identify which block was selected.
                <div key={entry.id} data-entry-id={entry.id}>
                  <TranscriptBlock
                    speaker={entry.speaker}
                    text={entry.text}
                    highlightedRange={highlightedRange}
                    highlightVariant={highlightVariant}
                  />
                </div>
              );
            })}
            <p className={styles.endLabel}>End of Transcript</p>
          </div>
        </div>


        {/* Floating "Add Highlight" button — appears next to the active selection */}
        {variant === 'add-highlight' && btnPos && (
          <button
            ref={addBtnRef}
            className={styles.addHighlightBtn}
            style={{ top: btnPos.top, left: btnPos.left }}
            onClick={handleAddHighlight}
            type="button"
            aria-label="Add highlight"
          >
            <span className={styles.addHighlightIcon}>
              <Icon name="ink_highlighter" size="xs" aria-hidden />
            </span>
          </button>
        )}
      </div>

      {/* ── Search bar ── */}
      <div className={styles.searchBar}>
        <TranscriptSearch
          value={searchValue}
          onChange={onSearchChange}
          onClear={onSearchClear}
          onPrevious={onSearchPrevious}
          onNext={onSearchNext}
          state={searchState}
          currentResult={searchCurrentResult}
          totalResults={searchTotalResults}
        />
      </div>
    </div>
  );
}
