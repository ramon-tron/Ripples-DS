import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { TranscriptAvatar } from './TranscriptAvatar';
import type { TranscriptSpeaker } from './TranscriptAvatar';

const meta = {
  title: 'Components/TranscriptAvatar',
  component: TranscriptAvatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Avatars used in transcript blocks to identify who is speaking. They come in two categories:

**Human speakers (S1–S10)**
Up to 10 speakers are identified by slot number. Colors cycle through the 10 avatar palette slots — subtle for S1–S5, saturated for S6–S10 — ensuring each speaker is immediately distinguishable at a glance.

**Non-human speakers**
System or device participants (Google Gemini, Google Assistant, Amazon Alexa, Car, Phone) display a white circle with a subtle border and a representative icon.

These avatars are 30px — a fixed size optimized for dense transcript layouts.
        `.trim(),
      },
    },
  },
  argTypes: {
    speaker: {
      control: 'select',
      options: [
        's1','s2','s3','s4','s5','s6','s7','s8','s9','s10',
        'gemini','google-assistant','alexa','car','phone',
      ],
    },
  },
  args: { speaker: 's1' },
} satisfies Meta<typeof TranscriptAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Human Speakers ───────────────────────────────────────────────────────────

const HUMAN_SPEAKERS: TranscriptSpeaker[] = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10'];

export const HumanSpeakers: Story = {
  name: 'Human Speakers',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'S1–S5 use subtle palette slots; S6–S10 use saturated slots. Together they support up to 10 distinguishable speakers per transcript.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Subtle (S1–S5)</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {HUMAN_SPEAKERS.slice(0, 5).map(s => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <TranscriptAvatar speaker={s} />
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Saturated (S6–S10)</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {HUMAN_SPEAKERS.slice(5).map(s => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <TranscriptAvatar speaker={s} />
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ─── Non-Human Speakers ───────────────────────────────────────────────────────

const DEVICE_SPEAKERS: Array<{ speaker: TranscriptSpeaker; label: string }> = [
  { speaker: 'gemini',           label: 'Gemini'        },
  { speaker: 'google-assistant', label: 'G. Assistant'  },
  { speaker: 'alexa',            label: 'Alexa'         },
  { speaker: 'car',              label: 'Car'           },
  { speaker: 'phone',            label: 'Phone'         },
];

export const NonHumanSpeakers: Story = {
  name: 'Non-Human Speakers',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'System and device participants. White background with a subtle border and a representative icon.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {DEVICE_SPEAKERS.map(({ speaker, label }) => (
        <div key={speaker} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <TranscriptAvatar speaker={speaker} />
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── All Speakers ─────────────────────────────────────────────────────────────

export const AllSpeakers: Story = {
  name: 'All Speakers',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'All 15 speaker variants in a single row.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', maxWidth: 520 }}>
      {([...HUMAN_SPEAKERS, ...DEVICE_SPEAKERS.map(d => d.speaker)] as TranscriptSpeaker[]).map(s => (
        <TranscriptAvatar key={s} speaker={s} />
      ))}
    </div>
  ),
};

// ─── In a Transcript ─────────────────────────────────────────────────────────

const LINES = [
  { speaker: 's1' as const, name: 'Speaker 1', text: "Thanks everyone for joining. Let's get started with the Q2 review." },
  { speaker: 's2' as const, name: 'Speaker 2', text: "Happy to be here. I've pulled up the revenue numbers for the quarter." },
  { speaker: 'gemini' as const, name: 'Gemini', text: 'Summary: Q2 revenue increased 14% year-over-year, driven by enterprise growth.' },
  { speaker: 's1' as const, name: 'Speaker 1', text: "Exactly. And the pipeline heading into Q3 looks strong." },
  { speaker: 's3' as const, name: 'Speaker 3', text: "Agreed — churn is also down, which is a big win for the team." },
];

export const InTranscript: Story = {
  name: 'In a Transcript',
  parameters: {
    controls: { disable: true },
    layout: 'padded',
    docs: {
      description: { story: 'Avatars shown alongside transcript lines — their primary usage context.' },
    },
  },
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      minWidth: 480,
      maxWidth: 640,
      borderRadius: 12,
      border: '1px solid var(--ds-color-border-subtle)',
      overflow: 'hidden',
      fontFamily: 'var(--ds-font-family-body)',
    }}>
      {LINES.map((line, i) => (
        <div key={i} style={{
          display: 'flex',
          gap: 10,
          padding: '12px 16px',
          borderBottom: i < LINES.length - 1 ? '1px solid var(--ds-color-border-subtle)' : 'none',
          alignItems: 'flex-start',
        }}>
          <TranscriptAvatar speaker={line.speaker} style={{ marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ds-color-text-secondary)', marginBottom: 3 }}>
              {line.name}
            </div>
            <div style={{ fontSize: 14, color: 'var(--ds-color-text-primary)', lineHeight: 1.5 }}>
              {line.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
