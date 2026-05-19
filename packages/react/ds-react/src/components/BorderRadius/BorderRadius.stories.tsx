import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

// ─── Token data ───────────────────────────────────────────────────────────────

interface BorderRadiusToken {
  token: string;
  label: string;
  value: string;
}

const BORDER_RADIUS_TOKENS: BorderRadiusToken[] = [
  { token: '--ds-border-radius-xs',     label: 'XS',     value: '4px' },
  { token: '--ds-border-radius-s',      label: 'S',      value: '8px' },
  { token: '--ds-border-radius-m',      label: 'M',      value: '12px' },
  { token: '--ds-border-radius-l',      label: 'L',      value: '16px' },
  { token: '--ds-border-radius-circle', label: 'Circle', value: '50px' },
  { token: '--ds-border-radius-pill',   label: 'Pill',   value: '999px' },
];

// ─── Components ───────────────────────────────────────────────────────────────

function RadiusSwatch({ token, label, value }: BorderRadiusToken) {
  // Pill and Circle need a rectangle/circle shape to show the effect clearly
  const isPill   = token.includes('pill');
  const isCircle = token.includes('circle');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 16,
        padding: '20px 0',
        borderBottom: '1px solid var(--ds-color-border-subtle)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Shape preview */}
        <div
          style={{
            width:  isPill ? 120 : isCircle ? 64 : 64,
            height: 64,
            background: 'var(--ds-color-fill-brand)',
            borderRadius: `var(${token})`,
            flexShrink: 0,
          }}
        />

        {/* Token info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--ds-color-text-primary)',
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 11,
              color: 'var(--ds-color-text-secondary)',
            }}
          >
            {token}
          </span>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--ds-color-text-brand)',
            }}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}

function BorderRadiusPage() {
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
        Border Radius
      </h1>
      <p
        style={{
          fontFamily: 'var(--ds-body-l-regular-font-family)',
          fontSize: 'var(--ds-body-l-regular-font-size)',
          color: 'var(--ds-color-text-secondary)',
          margin: '0 0 48px',
        }}
      >
        6 radius steps — from sharp corners to fully rounded pills and circles.
      </p>

      <div>
        {BORDER_RADIUS_TOKENS.map(t => (
          <RadiusSwatch key={t.token} {...t} />
        ))}
      </div>
    </div>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design Tokens/Border Radius',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const AllTokens: StoryObj = {
  name: 'All Tokens',
  render: () => React.createElement(BorderRadiusPage),
};
