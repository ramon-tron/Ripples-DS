import { TranscriptAvatar } from '../TranscriptAvatar/TranscriptAvatar';
import type { TranscriptSpeaker } from '../TranscriptAvatar/TranscriptAvatar';
import styles from './TranscriptBlock.module.css';

export type { TranscriptSpeaker };

export interface HighlightRange {
  start: number;
  end: number;
}

export type HighlightVariant = 'search' | 'follow-along';

export interface TranscriptBlockProps {
  /** The speaker for this block. */
  speaker: TranscriptSpeaker;
  /** The transcript text content. */
  text: string;
  /**
   * Character-index range within `text` to highlight (inclusive start, exclusive end).
   * When provided the block renders in the highlighted variant.
   */
  highlightedRange?: HighlightRange;
  /**
   * - `search`       — amber background with left/right borders (default).
   * - `follow-along` — vivid yellow pill with rounded corners (current playback position).
   * @default 'search'
   */
  highlightVariant?: HighlightVariant;
  className?: string;
}

export function TranscriptBlock({ speaker, text, highlightedRange, highlightVariant = 'search', className }: TranscriptBlockProps) {
  const renderText = () => {
    if (!highlightedRange) {
      return <p className={styles.text}>{text}</p>;
    }
    const { start, end } = highlightedRange;
    const before      = text.slice(0, start);
    const highlighted = text.slice(start, end);
    const after       = text.slice(end);
    const markClass   = highlightVariant === 'follow-along' ? styles.followAlongHighlight : styles.highlight;
    return (
      <p className={styles.text}>
        {before}
        <mark className={markClass}>{highlighted}</mark>
        {after}
      </p>
    );
  };

  return (
    <div className={[styles.block, className].filter(Boolean).join(' ')}>
      <TranscriptAvatar speaker={speaker} />
      <div className={styles.content}>
        {renderText()}
      </div>
    </div>
  );
}
