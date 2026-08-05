import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { TranscriptSearch } from './TranscriptSearch';
import type { TranscriptSearchState } from './TranscriptSearch';
import { TranscriptBlock } from '../TranscriptBlock/TranscriptBlock';

const meta = {
  title: 'Components/TranscriptSearch',
  component: TranscriptSearch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The transcript search component is typically found at the bottom of the transcript module and is used to search for words or phrases within a transcript.

---

**When to Use**
- Inside a Transcript component to allow users to search for specific words or phrases.

**When to Use Something Else**
- Use a standard search or filter input when searching across multiple items rather than within a single transcript.

---

**States**
- **Default** — Empty input with placeholder text and prev/next navigation buttons.
- **Active** — A search term has been entered and results were found. Displays a result counter ("N of M") and a clear button inside the input.
- **Not Found** — A search term was entered but no matches exist. Displays "Not found" and a clear button.
        `.trim(),
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'active', 'not-found'],
    },
    value:          { control: 'text' },
    currentResult:  { control: 'number' },
    totalResults:   { control: 'number' },
  },
  args: {
    state: 'default',
    value: '',
    currentResult: 1,
    totalResults: 9,
  },
} satisfies Meta<typeof TranscriptSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 640 }}>
      {(
        [
          { label: 'Default',   state: 'default'   as TranscriptSearchState, value: '',   currentResult: 1,  totalResults: 0 },
          { label: 'Active',    state: 'active'    as TranscriptSearchState, value: 'of', currentResult: 1,  totalResults: 9 },
          { label: 'Not Found', state: 'not-found' as TranscriptSearchState, value: 'of', currentResult: 0,  totalResults: 0 },
        ]
      ).map(({ label, state, value, currentResult, totalResults }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>{label}</span>
          <TranscriptSearch
            state={state}
            value={value}
            currentResult={currentResult}
            totalResults={totalResults}
          />
        </div>
      ))}
    </div>
  ),
};

// ─── Interactive ──────────────────────────────────────────────────────────────

const MOCK_TRANSCRIPT =
  "My name is Matthew. And I work at Pulse Labs, as you know, we're building a platform for researchers designers and product owners and the purpose of this interview is so that we can build and improve our product by talking to real users.";

function InteractiveDemo() {
  const [value, setValue] = useState('');
  const [currentResult, setCurrentResult] = useState(1);

  const matchPositions = value.length > 0
    ? [...MOCK_TRANSCRIPT.matchAll(
        new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
      )].map(m => ({ start: m.index!, end: m.index! + m[0].length }))
    : [];

  const totalResults = matchPositions.length;

  const state: TranscriptSearchState =
    value.length === 0  ? 'default'
    : totalResults > 0  ? 'active'
    : 'not-found';

  const currentMatch = matchPositions[currentResult - 1];

  const handleChange = (v: string) => {
    setValue(v);
    setCurrentResult(1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 640 }}>
      <TranscriptBlock
        speaker="s1"
        text={MOCK_TRANSCRIPT}
        highlightedRange={currentMatch}
      />
      <TranscriptSearch
        value={value}
        state={state}
        currentResult={currentResult}
        totalResults={totalResults}
        onChange={handleChange}
        onClear={() => handleChange('')}
        onPrevious={() => setCurrentResult(r => Math.max(1, r - 1))}
        onNext={() => setCurrentResult(r => Math.min(totalResults, r + 1))}
      />
    </div>
  );
}

export const Interactive: Story = {
  name: 'Interactive',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => <InteractiveDemo />,
};

// ─── Light and Dark ───────────────────────────────────────────────────────────

export const LightAndDark: Story = {
  name: 'Light and Dark',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const states = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <TranscriptSearch state="default" value="" />
        <TranscriptSearch state="active"    value="of" currentResult={1} totalResults={9} />
        <TranscriptSearch state="not-found" value="of" />
      </div>
    );
    return (
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <div data-theme="light" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24, borderRadius: 12, background: 'var(--ds-color-surface-l1)', border: '1px solid var(--ds-color-border-subtle)', width: 360 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Light mode</span>
          {states}
        </div>
        <div data-theme="dark" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24, borderRadius: 12, background: 'var(--ds-color-surface-l0)', width: 360 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Dark mode</span>
          {states}
        </div>
      </div>
    );
  },
};
