import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

// ─── Token data ───────────────────────────────────────────────────────────────

interface BorderWidthToken {
  token: string;
  label: string;
  value: string;
  px: number;
}

const BORDER_WIDTH_TOKENS: BorderWidthToken[] = [
  { token: '--ds-border-width-xs', label: 'XS', value: '1px',   px: 1 },
  { token: '--ds-border-width-s',  label: 'S',  value: '1.5px', px: 1.5 },
  { token: '--ds-border-width-m',  label: 'M',  value: '2px',   px: 2 },
  { token: '--ds-border-width-l',  label: 'L',  value: '4px',   px: 4 },
  { token: '--ds-border-width-xl', label: 'XL', value: '8px',   px: 8 },
];

// ─── Components ───────────────────────────────────────────────────────────────

function BorderWidthRow({ token, label, value, px }: BorderWidthToken) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '48px 180px 1fr 56px',
        alignItems: 'center',
        gap: 16,
        padding: '16px 0',
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

      {/* Border preview */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: 120,
            height: 36,
            borderRadius: 6,
            border: `var(${token}) solid var(--ds-color-fill-brand)`,
            flexShrink: 0,
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
        {value}
      </span>
    </div>
  );
}

function BorderWidthPage() {
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
        Border Width
      </h1>
      <p
        style={{
          fontFamily: 'var(--ds-body-l-regular-font-family)',
          fontSize: 'var(--ds-body-l-regular-font-size)',
          color: 'var(--ds-color-text-secondary)',
          margin: '0 0 48px',
        }}
      >
        5 steps from 1px to 8px. Each preview uses the token directly as its border width.
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
          {['Size', 'Token', 'Preview', 'Value'].map(h => (
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

        {BORDER_WIDTH_TOKENS.map(t => (
          <BorderWidthRow key={t.token} {...t} />
        ))}
      </div>
    </div>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design Tokens/Border Width',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const AllTokens: StoryObj = {
  name: 'All Tokens',
  render: () => React.createElement(BorderWidthPage),
};
