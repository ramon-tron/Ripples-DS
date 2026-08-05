import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Transcript } from './Transcript';
import type { TranscriptEntry, TranscriptVariant, TranscriptHighlight } from './Transcript';
import type { TranscriptSearchState } from '../TranscriptSearch/TranscriptSearch';
import { ToastProvider } from '../Toast/Toast';

const meta = {
  title: 'Components/Transcript',
  component: Transcript,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The Transcript component displays a scrollable list of speaker turns from a recorded session. It combines
[TranscriptBlock](/docs/components-transcriptblock--docs) entries with a
[TranscriptSearch](/docs/components-transcriptsearch--docs) bar pinned to the bottom.

---

**When to Use**
- Inside a research session view to display and navigate the full transcript.
- When users need to search, follow playback, or annotate specific passages.

**When to Use Something Else**
- Use a plain list or table when displaying structured data rather than conversational turns.
- Use a standalone TranscriptSearch when you only need the search control outside of a transcript context.

---

**Variants**

| Variant | Description |
|---|---|
| **Default** | Idle state — transcript is readable, search bar is empty. |
| **Searching** | User has typed a query; matched text is highlighted with an amber bracket and the search bar shows a result counter. |
| **Follow Along** | Synced to audio/video playback; the currently-spoken word or phrase is highlighted with a vivid yellow pill. |
| **Add Highlight** | User has selected a passage; the selection is shown with an amber bracket and a floating action button lets them save the highlight. |

---

**Nested Components**
- **TranscriptAvatar** — Speaker avatar shown at the left of each block. Supports human speakers S1–S10 and system speakers (Gemini, Alexa, Assistant, Car, Phone).
- **TranscriptBlock** — Individual speaker turn with optional inline text highlight.
- **TranscriptSearch** — Search input with prev/next navigation, pinned to the bottom of the component.
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'searching', 'follow-along', 'add-highlight'],
    },
  },
  args: {
    variant: 'add-highlight',
  },
} satisfies Meta<typeof Transcript>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_ENTRIES: TranscriptEntry[] = [
  {
    id: 'e1',
    speaker: 's1',
    text: "My name is Matthew. And I work at Pulse Labs, as you know, we're building a platform for researchers designers and product owners and the purpose of this interview is so that we can build and improve our product by talking to real users.",
  },
  {
    id: 'e2',
    speaker: 's2',
    text: "Thanks for helping us and define our product and service. We're very appreciative of your time. Stay really great.",
  },
  {
    id: 'e3',
    speaker: 's3',
    text: "Ok is that working.",
  },
  {
    id: 'e4',
    speaker: 's4',
    text: "Try it's really great!",
  },
  {
    id: 'e5',
    speaker: 's1',
    text: "As I've explained earlier, you'll be asked to respond when you've wanted, you wanted to or feel comfortable doing. I'll follow up with some questions or comments to help facilitate and get your open general areas of focus and where this fits in your day to day.",
  },
  {
    id: 'e6',
    speaker: 's2',
    text: "Yeah totally read out 100% of the time and thus over 5,000 users are over the time of the other. So that I can inform my product strategy. So for the first part of my role, I spend a lot of time and research informing my product strategy. As we already have quite a strong sense of our users, with my own research practices of a specific topic.",
  },
  {
    id: 'e7',
    speaker: 's3',
    text: "In addition to I'm actually the health and fitness and fitness for Google Assistant.",
  },
  {
    id: 'e8',
    speaker: 's5',
    text: "Of course it is, life isn't that much better.",
  },
];

// ─── Shared stateful search wrapper ───────────────────────────────────────────

interface TranscriptWithSearchProps {
  entries: TranscriptEntry[];
  variant?: TranscriptVariant;
  followAlongHighlight?: TranscriptHighlight;
  showHighlightToast?: boolean;
  height?: number;
  width?: number | string;
}

function TranscriptWithSearch({
  entries,
  variant = 'default',
  followAlongHighlight,
  showHighlightToast = false,
  height = 560,
  width = '100%',
}: TranscriptWithSearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const [currentResult, setCurrentResult] = useState(1);
  const [savedHighlight, setSavedHighlight] = useState<TranscriptHighlight | undefined>(undefined);

  type Match = { entryId: string; start: number; end: number };
  const matches: Match[] = [];

  if (searchValue.length > 0) {
    const regex = new RegExp(searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    for (const entry of entries) {
      for (const m of entry.text.matchAll(regex)) {
        matches.push({ entryId: entry.id, start: m.index!, end: m.index! + m[0].length });
      }
    }
  }

  const totalResults = matches.length;
  const searchState: TranscriptSearchState =
    searchValue.length === 0 ? 'default'
    : totalResults > 0       ? 'active'
    : 'not-found';

  const activeMatch = matches[currentResult - 1] as Match | undefined;

  const handleChange = (v: string) => {
    setSearchValue(v);
    setCurrentResult(1);
  };

  // When there's an active search the variant switches to 'searching' so the
  // amber bracket highlight renders; otherwise the passed-in variant is used.
  const effectiveVariant: TranscriptVariant =
    searchValue.length > 0 && totalResults > 0 ? 'searching' : variant;

  return (
    <div style={{ height, width }}>
      <Transcript
        entries={entries}
        variant={effectiveVariant}
        searchValue={searchValue}
        onSearchChange={handleChange}
        onSearchClear={() => handleChange('')}
        onSearchPrevious={() => setCurrentResult(r => Math.max(1, r - 1))}
        onSearchNext={() => setCurrentResult(r => Math.min(totalResults, r + 1))}
        searchState={searchState}
        searchCurrentResult={currentResult}
        searchTotalResults={totalResults}
        searchHighlight={activeMatch}
        followAlongHighlight={followAlongHighlight}
        addHighlightSelection={savedHighlight}
        onAddHighlight={h => setSavedHighlight(h)}
        showHighlightToast={showHighlightToast}
      />
    </div>
  );
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: ({ variant }) => (
    <ToastProvider>
      <TranscriptWithSearch
        entries={SAMPLE_ENTRIES}
        variant={variant}
        showHighlightToast
        height={600}
      />
    </ToastProvider>
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => {
    const followAlongHighlight: TranscriptHighlight = {
      entryId: 'e1',
      start: SAMPLE_ENTRIES[0].text.indexOf('work'),
      end:   SAMPLE_ENTRIES[0].text.indexOf('work') + 'work'.length,
    };

    const variants: { label: string; variant: TranscriptVariant; extra?: Partial<TranscriptWithSearchProps> }[] = [
      { label: 'Default',       variant: 'default' },
      { label: 'Searching',     variant: 'searching' },
      { label: 'Follow Along',  variant: 'follow-along', extra: { followAlongHighlight } },
      { label: 'Add Highlight', variant: 'add-highlight' },
    ];

    return (
      <ToastProvider>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start' }}>
          {variants.map(({ label, variant, extra = {} }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 280 }}>
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-secondary)' }}>{label}</span>
              <TranscriptWithSearch
                entries={SAMPLE_ENTRIES}
                variant={variant}
                showHighlightToast={variant === 'add-highlight'}
                {...extra}
              />
            </div>
          ))}
        </div>
      </ToastProvider>
    );
  },
};

// ─── Interactive ──────────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive',
  parameters: { controls: { disable: true } },
  render: () => (
    <ToastProvider>
      <TranscriptWithSearch
        entries={SAMPLE_ENTRIES}
        variant="default"
        height={600}
      />
    </ToastProvider>
  ),
};

// ─── Light and Dark ───────────────────────────────────────────────────────────

export const LightAndDark: Story = {
  name: 'Light and Dark',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
      <div
        data-theme="light"
        style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 24, borderRadius: 12, background: 'var(--ds-color-surface-l0)', flex: 1, minWidth: 280 }}
      >
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-secondary)' }}>Light mode</span>
        <TranscriptWithSearch entries={SAMPLE_ENTRIES} variant="default" />
      </div>
      <div
        data-theme="dark"
        style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 24, borderRadius: 12, background: 'var(--ds-color-surface-l0)', flex: 1, minWidth: 280 }}
      >
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-secondary)' }}>Dark mode</span>
        <TranscriptWithSearch entries={SAMPLE_ENTRIES} variant="default" />
      </div>
    </div>
  ),
};
