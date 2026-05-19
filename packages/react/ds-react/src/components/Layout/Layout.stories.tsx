import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────

const GUTTER      = 16; // px — formed by 8px right-padding of col A + 8px left-padding of col B
const MARGIN      = 8;  // px — outer edge (= one column's padding on the exposed side)
const COL_PADDING = 8;  // px — padding applied to each side of every column

// Scale all diagrams relative to the XL breakpoint fitting 800px display width
const DISPLAY_MAX     = 800;
const MAX_BREAKPOINT  = 1440;
const SCALE           = DISPLAY_MAX / MAX_BREAKPOINT;

// ─── Token data ───────────────────────────────────────────────────────────────

interface BreakpointSpec {
  label: string;
  token: string;
  width: number;
  cols: number;
  device: string;
}

const BREAKPOINTS: BreakpointSpec[] = [
  { label: 'S',  token: '--ds-layout-breakpoint-s',  width: 393,  cols: 4,  device: 'Mobile / Apps' },
  { label: 'M',  token: '--ds-layout-breakpoint-m',  width: 768,  cols: 12, device: 'Tablet portrait' },
  { label: 'L',  token: '--ds-layout-breakpoint-l',  width: 1024, cols: 12, device: 'Tablet landscape' },
  { label: 'XL', token: '--ds-layout-breakpoint-xl', width: 1440, cols: 12, device: 'Desktop' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function colContentWidth(viewportWidth: number, cols: number): number {
  return (viewportWidth - 2 * MARGIN - (cols - 1) * GUTTER) / cols;
}

// ─── Components ───────────────────────────────────────────────────────────────

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: 99,
        border: '1px solid var(--ds-color-border-subtle)',
        fontFamily: 'monospace',
        fontSize: 11,
        color: 'var(--ds-color-text-secondary)',
        whiteSpace: 'nowrap',
        background: 'var(--ds-color-fill-subtle)',
      }}
    >
      {children}
    </span>
  );
}

// Each column is rendered as: [8px padding | content | 8px padding].
// Adjacent padding blocks merge visually into a 16px gutter;
// the outermost padding blocks become the 8px page margin.
function GridDiagram({ width, cols }: { width: number; cols: number }) {
  const displayWidth    = width * SCALE;
  const scaledPad       = COL_PADDING * SCALE;
  const scaledContent   = colContentWidth(width, cols) * SCALE;

  return (
    <div
      style={{
        width: displayWidth,
        height: 36,
        display: 'flex',
        borderRadius: 4,
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {Array.from({ length: cols }, (_, i) => (
        <React.Fragment key={i}>
          <div style={{ width: scaledPad,    height: '100%', background: 'var(--ds-color-fill-brand-subtle)', flexShrink: 0 }} />
          <div style={{ width: scaledContent, height: '100%', background: 'var(--ds-color-fill-brand)',        flexShrink: 0 }} />
          <div style={{ width: scaledPad,    height: '100%', background: 'var(--ds-color-fill-brand-subtle)', flexShrink: 0 }} />
        </React.Fragment>
      ))}
    </div>
  );
}

function BreakpointRow({ label, token, width, cols, device }: BreakpointSpec) {
  const colWidth = colContentWidth(width, cols);

  return (
    <div style={{ padding: '20px 0', borderBottom: '1px solid var(--ds-color-border-subtle)' }}>
      {/* Meta row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '40px 220px 1fr',
          gap: 16,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
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
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <MetaPill>{width}px</MetaPill>
          <MetaPill>{cols} cols</MetaPill>
          <MetaPill>{Math.round(colWidth * 100) / 100}px / col</MetaPill>
          <MetaPill>{device}</MetaPill>
        </div>
      </div>

      {/* Grid diagram */}
      <GridDiagram width={width} cols={cols} />
    </div>
  );
}

function Legend() {
  const item = (color: string, label: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 16, height: 16, borderRadius: 3, background: color, flexShrink: 0 }} />
      <span style={{ fontSize: 11, color: 'var(--ds-color-text-secondary)', fontFamily: 'monospace' }}>{label}</span>
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 32 }}>
      {item('var(--ds-color-fill-brand)',        `Column content`)}
      {item('var(--ds-color-fill-brand-subtle)', `Column padding / margin (${COL_PADDING}px)`)}
    </div>
  );
}

function LayoutPage() {
  return (
    <div
      style={{
        maxWidth: 960,
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
        Layout
      </h1>
      <p
        style={{
          fontFamily: 'var(--ds-body-l-regular-font-family)',
          fontSize: 'var(--ds-body-l-regular-font-size)',
          color: 'var(--ds-color-text-secondary)',
          margin: '0 0 12px',
        }}
      >
        Responsive 12-column grid (4 columns on mobile and apps). Each column carries{' '}
        <strong>{COL_PADDING}px</strong> of padding on both sides — adjacent column padding
        naturally creates <strong>{GUTTER}px gutters</strong>, and the outermost column
        padding becomes the <strong>{MARGIN}px page margin</strong>.
      </p>

      {/* Shared constants */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
        {[
          ['--ds-layout-gutter',         `${GUTTER}px`],
          ['--ds-layout-margin',         `${MARGIN}px`],
          ['--ds-layout-column-padding', `${COL_PADDING}px`],
        ].map(([token, value]) => (
          <div
            key={token}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid var(--ds-color-border-subtle)',
              background: 'var(--ds-color-fill-subtle)',
            }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--ds-color-text-secondary)' }}>{token}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: 'var(--ds-color-text-brand)' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Header row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '40px 220px 1fr',
          gap: 16,
          paddingBottom: 8,
          marginBottom: 4,
          borderBottom: '2px solid var(--ds-color-border-subtle)',
        }}
      >
        {['BP', 'Token', 'Properties'].map(h => (
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

      {BREAKPOINTS.map(bp => (
        <BreakpointRow key={bp.token} {...bp} />
      ))}

      {/* Legend */}
      <div style={{ marginTop: 24 }}>
        <Legend />
      </div>
    </div>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design Tokens/Layout',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Grid: StoryObj = {
  name: 'Grid',
  render: () => React.createElement(LayoutPage),
};
