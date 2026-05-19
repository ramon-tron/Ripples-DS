import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

// ─── Token data ───────────────────────────────────────────────────────────────

interface SpacingToken {
  token: string;
  label: string;
  px: number;
}

const SPACING_TOKENS: SpacingToken[] = [
  { token: '--ds-spacing-4xs',  label: '4XS',  px: 0 },
  { token: '--ds-spacing-3xs',  label: '3XS',  px: 2 },
  { token: '--ds-spacing-2xs',  label: '2XS',  px: 4 },
  { token: '--ds-spacing-xs',   label: 'XS',   px: 6 },
  { token: '--ds-spacing-s',    label: 'S',    px: 8 },
  { token: '--ds-spacing-m',    label: 'M',    px: 12 },
  { token: '--ds-spacing-l',    label: 'L',    px: 16 },
  { token: '--ds-spacing-xl',   label: 'XL',   px: 24 },
  { token: '--ds-spacing-2xl',  label: '2XL',  px: 32 },
  { token: '--ds-spacing-3xl',  label: '3XL',  px: 40 },
  { token: '--ds-spacing-4xl',  label: '4XL',  px: 48 },
  { token: '--ds-spacing-5xl',  label: '5XL',  px: 56 },
  { token: '--ds-spacing-6xl',  label: '6XL',  px: 64 },
  { token: '--ds-spacing-7xl',  label: '7XL',  px: 72 },
  { token: '--ds-spacing-8xl',  label: '8XL',  px: 80 },
  { token: '--ds-spacing-9xl',  label: '9XL',  px: 88 },
  { token: '--ds-spacing-10xl', label: '10XL', px: 96 },
  { token: '--ds-spacing-11xl', label: '11XL', px: 104 },
  { token: '--ds-spacing-12xl', label: '12XL', px: 112 },
  { token: '--ds-spacing-13xl', label: '13XL', px: 128 },
  { token: '--ds-spacing-14xl', label: '14XL', px: 144 },
  { token: '--ds-spacing-15xl', label: '15XL', px: 160 },
  { token: '--ds-spacing-16xl', label: '16XL', px: 192 },
  { token: '--ds-spacing-17xl', label: '17XL', px: 224 },
  { token: '--ds-spacing-18xl', label: '18XL', px: 256 },
];

const MAX_PX = 256;

// ─── Components ───────────────────────────────────────────────────────────────

function SpacingRow({ token, label, px }: SpacingToken) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '48px 180px 1fr 56px',
        alignItems: 'center',
        gap: 16,
        padding: '12px 0',
        borderBottom: '1px solid var(--ds-color-border-subtle)',
      }}
    >
      {/* Size label */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--ds-color-text-tertiary)',
          fontFamily: 'monospace',
        }}
      >
        {label}
      </span>

      {/* Token name */}
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          color: 'var(--ds-color-text-secondary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {token}
      </span>

      {/* Bar track */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            height: 20,
            width: `${(px / MAX_PX) * 100}%`,
            minWidth: px === 0 ? 0 : 3,
            background: 'var(--ds-color-fill-brand)',
            borderRadius: 3,
          }}
        />
      </div>

      {/* Pixel value */}
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--ds-color-text-primary)',
          textAlign: 'right',
        }}
      >
        {px}px
      </span>
    </div>
  );
}

function SpacingPage() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '40px 24px',
        color: 'var(--ds-color-text-primary)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--ds-headline-l-black-font-family)',
          fontSize: 'var(--ds-headline-l-black-font-size)',
          fontWeight: 'var(--ds-headline-l-black-font-weight)',
          lineHeight: 'var(--ds-headline-l-black-line-height)',
          letterSpacing: 'var(--ds-headline-l-black-letter-spacing)',
          color: 'var(--ds-color-text-primary)',
          margin: '0 0 8px',
        }}
      >
        Spacing
      </h1>
      <p
        style={{
          fontFamily: 'var(--ds-body-l-regular-font-family)',
          fontSize: 'var(--ds-body-l-regular-font-size)',
          color: 'var(--ds-color-text-secondary)',
          margin: '0 0 48px',
        }}
      >
        24 steps from 2px to 256px. Bars are scaled proportionally to{' '}
        <code style={{ fontFamily: 'monospace', fontSize: 13 }}>{MAX_PX}px</code>.
      </p>

      <div>
        {/* Header row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '48px 180px 1fr 56px',
            gap: 16,
            paddingBottom: 8,
            marginBottom: 4,
            borderBottom: '2px solid var(--ds-color-border-subtle)',
          }}
        >
          {['Size', 'Token', 'Scale', 'Value'].map(h => (
            <span
              key={h}
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ds-color-text-tertiary)',
                textAlign: h === 'Value' ? 'right' : 'left',
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {SPACING_TOKENS.map(t => (
          <SpacingRow key={t.token} {...t} />
        ))}
      </div>
    </div>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design Tokens/Spacing',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const AllTokens: StoryObj = {
  name: 'All Tokens',
  render: () => React.createElement(SpacingPage),
};
