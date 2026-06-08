import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TranscriptBlock } from './TranscriptBlock';
import type { TranscriptSpeaker } from './TranscriptBlock';

const SAMPLE_TEXT =
  "My name is Matthew. And I work at Pulse Labs, as you know, we're building a platform for researchers designers and product owners and the purpose of this interview is so that we can build and improve our product by talking to real users.";

const meta = {
  title: 'Components/TranscriptBlock',
  component: TranscriptBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Transcript blocks are the building block component of a transcript.

---

**When to Use**
- As the atomic unit inside a Transcript component to display one speaker's utterance.

**Variants**
- **Default** — avatar + plain text.
- **Highlighted** — a contiguous range of the text is visually marked with an amber highlight (useful for annotation, search hits, or follow-along playback).

**Usage**

Provide a \`speaker\` (e.g. \`"s1"\`) and a \`text\` string. To show the highlighted variant, pass a \`highlightedRange\` with \`start\` and \`end\` character indices:

\`\`\`tsx
<TranscriptBlock
  speaker="s1"
  text="My name is Matthew..."
  highlightedRange={{ start: 26, end: 100 }}
/>
\`\`\`

> **Note:** Due to the limitations of Figma, the highlighted variant is mostly for illustrative purposes. Character offsets must be recalculated if the text changes.
        `.trim(),
      },
    },
  },
  argTypes: {
    speaker: {
      control: 'select',
      options: ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','gemini','google-assistant','alexa','car','phone'],
    },
    text: { control: 'text' },
  },
  args: {
    speaker: 's1',
    text: SAMPLE_TEXT,
  },
} satisfies Meta<typeof TranscriptBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 640 }}>
      <TranscriptBlock speaker="s1" text={SAMPLE_TEXT} />
    </div>
  ),
};

// ─── Highlighted ──────────────────────────────────────────────────────────────

export const Highlighted: Story = {
  name: 'Highlighted',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 640 }}>
      <TranscriptBlock
        speaker="s1"
        text={SAMPLE_TEXT}
        highlightedRange={{ start: 26, end: 148 }}
      />
    </div>
  ),
};

// ─── Default vs Highlighted ───────────────────────────────────────────────────

export const DefaultVsHighlighted: Story = {
  name: 'Default vs Highlighted',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 640 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Default</span>
        <TranscriptBlock speaker="s1" text={SAMPLE_TEXT} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Highlighted</span>
        <TranscriptBlock
          speaker="s1"
          text={SAMPLE_TEXT}
          highlightedRange={{ start: 26, end: 148 }}
        />
      </div>
    </div>
  ),
};

// ─── All Speakers ─────────────────────────────────────────────────────────────

const HUMAN_SPEAKERS: TranscriptSpeaker[] = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10'];
const DEVICE_SPEAKERS: TranscriptSpeaker[] = ['gemini','google-assistant','alexa','car','phone'];

export const AllSpeakers: Story = {
  name: 'All Speakers',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 680 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Human speakers (S1–S10)</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {HUMAN_SPEAKERS.map(speaker => (
            <TranscriptBlock
              key={speaker}
              speaker={speaker}
              text={`Speaker ${speaker.toUpperCase()}: ${SAMPLE_TEXT.slice(0, 80)}…`}
            />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Device / AI speakers</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {DEVICE_SPEAKERS.map(speaker => (
            <TranscriptBlock
              key={speaker}
              speaker={speaker}
              text={`${SAMPLE_TEXT.slice(0, 80)}…`}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

// ─── Light and Dark ───────────────────────────────────────────────────────────

export const LightAndDark: Story = {
  name: 'Light and Dark',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const blocks = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <TranscriptBlock speaker="s1" text={SAMPLE_TEXT} />
        <TranscriptBlock
          speaker="s2"
          text={SAMPLE_TEXT}
          highlightedRange={{ start: 26, end: 148 }}
        />
      </div>
    );
    return (
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <div data-theme="light" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24, borderRadius: 12, background: 'var(--ds-color-surface-l1)', border: '1px solid var(--ds-color-border-subtle)', width: 400 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Light mode</span>
          {blocks}
        </div>
        <div data-theme="dark" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24, borderRadius: 12, background: 'var(--ds-color-surface-l0)', width: 400 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Dark mode</span>
          {blocks}
        </div>
      </div>
    );
  },
};
