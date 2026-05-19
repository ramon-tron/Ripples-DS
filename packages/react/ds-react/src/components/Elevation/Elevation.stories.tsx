import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

// ─── Token data ───────────────────────────────────────────────────────────────

interface ShadowToken {
  label: string;
  token: string;
  lightValue: string;
  darkValue: string;
  usage: string;
}

const SHADOWS: ShadowToken[] = [
  {
    label: 'L1',
    token: '--ds-shadow-l1',
    lightValue: '0 0 2px 0 rgba(0, 0, 0, 0.08), 0 6px 4px -4px rgba(0, 0, 0, 0.08)',
    darkValue:  '0 0 0 1px rgba(255, 255, 255, 0.06), 0 6px 4px -4px rgba(0, 0, 0, 0.40)',
    usage: 'Cards, list items',
  },
  {
    label: 'L2',
    token: '--ds-shadow-l2',
    lightValue: '0 0 4px 0 rgba(0, 0, 0, 0.08), 0 8px 8px -4px rgba(0, 0, 0, 0.10)',
    darkValue:  '0 0 0 1px rgba(255, 255, 255, 0.07), 0 8px 8px -4px rgba(0, 0, 0, 0.45)',
    usage: 'Dropdowns, popovers',
  },
  {
    label: 'L3',
    token: '--ds-shadow-l3',
    lightValue: '0 0 6px 0 rgba(0, 0, 0, 0.08), 0 10px 16px -4px rgba(0, 0, 0, 0.10)',
    darkValue:  '0 0 0 1px rgba(255, 255, 255, 0.08), 0 10px 16px -4px rgba(0, 0, 0, 0.50)',
    usage: 'Floating panels',
  },
  {
    label: 'L4',
    token: '--ds-shadow-l4',
    lightValue: '0 0 8px 0 rgba(0, 0, 0, 0.08), 0 12px 20px -4px rgba(0, 0, 0, 0.10)',
    darkValue:  '0 0 0 1px rgba(255, 255, 255, 0.09), 0 12px 20px -4px rgba(0, 0, 0, 0.50)',
    usage: 'Tooltips, toasts',
  },
  {
    label: 'L5',
    token: '--ds-shadow-l5',
    lightValue: '0 0 10px 0 rgba(0, 0, 0, 0.08), 0 14px 24px -4px rgba(0, 0, 0, 0.10)',
    darkValue:  '0 0 0 1px rgba(255, 255, 255, 0.10), 0 14px 24px -4px rgba(0, 0, 0, 0.55)',
    usage: 'Drawers, side panels',
  },
  {
    label: 'L6',
    token: '--ds-shadow-l6',
    lightValue: '0 0 12px 0 rgba(0, 0, 0, 0.08), 0 24px 40px -4px rgba(0, 0, 0, 0.10)',
    darkValue:  '0 0 0 1px rgba(255, 255, 255, 0.12), 0 24px 40px -4px rgba(0, 0, 0, 0.60)',
    usage: 'Modals, dialogs',
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

// Cards always use a white background so shadows remain visible in dark mode.
function ElevationGrid() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 32,
        padding: '40px 32px',
        background: 'var(--ds-color-surface-l2)',
        borderRadius: 16,
      }}
    >
      {SHADOWS.map(({ label, token, usage }) => (
        <div
          key={token}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        >
          <div
            style={{
              width: '100%',
              height: 80,
              background: 'var(--ds-color-surface-l1)',
              borderRadius: 8,
              boxShadow: `var(${token})`,
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                fontFamily: 'monospace',
                color: 'var(--ds-color-text-primary)',
                marginBottom: 2,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: 10,
                color: 'var(--ds-color-text-tertiary)',
                fontFamily: 'monospace',
              }}
            >
              {usage}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ValueLines({ mode, value }: { mode: string; value: string }) {
  const [part1, part2] = value.split(', 0 ');
  return (
    <div style={{ display: 'flex', gap: 8, lineHeight: 1.8 }}>
      <span style={{ color: 'var(--ds-color-text-tertiary)', flexShrink: 0, width: 32 }}>{mode}</span>
      <span>
        {part1},{' '}
        <br />
        <span style={{ paddingLeft: 8 }}>0 {part2}</span>
      </span>
    </div>
  );
}

function ShadowRow({ label, token, lightValue, darkValue, usage }: ShadowToken) {
  return (
    <div style={{ padding: '20px 0', borderBottom: '1px solid var(--ds-color-border-subtle)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '40px 180px 180px 1fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Level */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--ds-color-text-tertiary)',
            fontFamily: 'monospace',
            paddingTop: 2,
          }}
        >
          {label}
        </span>

        {/* Token name + CSS values — constrained to this column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 11,
              color: 'var(--ds-color-text-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            {token}
          </span>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 11,
              color: 'var(--ds-color-text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <ValueLines mode="☀" value={lightValue} />
            <ValueLines mode="☾" value={darkValue} />
          </div>
        </div>

        {/* Preview card */}
        <div
          style={{
            width: 120,
            height: 40,
            background: 'var(--ds-color-surface-l1)',
            borderRadius: 6,
            boxShadow: `var(${token})`,
          }}
        />

        {/* Usage */}
        <span
          style={{
            fontSize: 11,
            color: 'var(--ds-color-text-tertiary)',
            fontFamily: 'monospace',
            paddingTop: 2,
          }}
        >
          {usage}
        </span>
      </div>
    </div>
  );
}

function ElevationPage() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '40px 24px 80px',
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
        Elevation
      </h1>
      <p
        style={{
          fontFamily: 'var(--ds-body-l-regular-font-family)',
          fontSize: 'var(--ds-body-l-regular-font-size)',
          color: 'var(--ds-color-text-secondary)',
          margin: '0 0 36px',
        }}
      >
        6 elevation levels. Light mode uses a dual-layer ambient + directional shadow.
        Dark mode swaps to a white rim highlight + high-opacity drop shadow for contrast.
      </p>

      {/* Side-by-side comparison */}
      <ElevationGrid />

      {/* Detail list */}
      <div style={{ marginTop: 48 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 180px 140px 1fr',
            gap: 16,
            paddingBottom: 8,
            marginBottom: 4,
            borderBottom: '2px solid var(--ds-color-border-subtle)',
          }}
        >
          {['Level', 'Token', 'Preview', 'Usage'].map(h => (
            <span
              key={h}
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ds-color-text-tertiary)',
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {SHADOWS.map(s => (
          <ShadowRow key={s.token} {...s} />
        ))}
      </div>
    </div>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design Tokens/Elevation',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const AllLevels: StoryObj = {
  name: 'All Levels',
  render: () => React.createElement(ElevationPage),
};
