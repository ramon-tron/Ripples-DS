import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

// ─── Keyframes ────────────────────────────────────────────────────────────────

const KEYFRAMES = `
  @keyframes ds-bar-fill {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes ds-ball-slide {
    from { left: 0px; }
    to   { left: calc(100% - 16px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .ds-motion-bar  { animation: none !important; width: 100% !important; }
    .ds-motion-ball { animation: none !important; left: 50% !important; }
  }
`;

// ─── Token data ───────────────────────────────────────────────────────────────

interface DurationToken {
  label: string;
  token: string;
  value: string;
  usage: string;
}

interface EasingToken {
  label: string;
  token: string;
  value: string;
  usage: string;
}

const DURATIONS: DurationToken[] = [
  { label: 'Instant', token: '--ds-motion-duration-instant', value: '50ms',  usage: 'Focus rings, hover fills' },
  { label: 'Fast',    token: '--ds-motion-duration-fast',    value: '100ms', usage: 'Tooltips, badges' },
  { label: 'Normal',  token: '--ds-motion-duration-normal',  value: '200ms', usage: 'Modals, dropdowns' },
  { label: 'Slow',    token: '--ds-motion-duration-slow',    value: '300ms', usage: 'Page transitions, drawers' },
  { label: 'Slower',  token: '--ds-motion-duration-slower',  value: '500ms', usage: 'Elaborate sequences' },
];

const EASINGS: EasingToken[] = [
  { label: 'Standard', token: '--ds-motion-easing-standard', value: 'cubic-bezier(0.2, 0, 0, 1)', usage: 'Elements that stay on screen' },
  { label: 'Enter',    token: '--ds-motion-easing-enter',    value: 'cubic-bezier(0, 0, 0, 1)',   usage: 'Elements entering the view' },
  { label: 'Exit',     token: '--ds-motion-easing-exit',     value: 'cubic-bezier(0.3, 0, 1, 1)', usage: 'Elements leaving the view' },
];

// ─── Components ───────────────────────────────────────────────────────────────

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--ds-color-text-tertiary)',
  fontFamily: 'monospace',
};

const TOKEN_STYLE: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: 11,
  color: 'var(--ds-color-text-secondary)',
  whiteSpace: 'nowrap',
};

function RowPlayButton({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={playing ? 'Pause' : 'Play'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: 28,
        height: 28,
        borderRadius: '50%',
        border: '1px solid var(--ds-color-border-subtle)',
        background: 'transparent',
        color: 'var(--ds-color-text-secondary)',
        cursor: 'pointer',
      }}
    >
      <span
        className="material-symbols-rounded"
        style={{
          fontSize: 16,
          lineHeight: 1,
          fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 16",
          color: 'inherit',
        }}
      >
        {playing ? 'pause' : 'play_arrow'}
      </span>
    </button>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--ds-color-text-tertiary)',
        margin: '40px 0 0',
        paddingBottom: 12,
        borderBottom: '2px solid var(--ds-color-border-subtle)',
        fontFamily: 'monospace',
      }}
    >
      {title}
    </h2>
  );
}

function DurationRow({ token, value, usage }: DurationToken) {
  const [playing, setPlaying] = useState(false);

  return (
    <div style={{ padding: '16px 0', borderBottom: '1px solid var(--ds-color-border-subtle)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 56px 1fr',
          gap: 24,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <span style={TOKEN_STYLE}>{token}</span>
        <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: 'var(--ds-color-text-primary)' }}>
          {value}
        </span>
        <span style={{ fontSize: 11, color: 'var(--ds-color-text-tertiary)', fontFamily: 'monospace' }}>
          {usage}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            flex: 1,
            height: 6,
            borderRadius: 99,
            background: 'var(--ds-color-fill-subtle)',
            overflow: 'hidden',
          }}
        >
          <div
            className="ds-motion-bar"
            style={{
              height: '100%',
              width: 0,
              borderRadius: 99,
              background: 'var(--ds-color-fill-info)',
              animation: `ds-bar-fill ${value} var(--ds-motion-easing-standard) infinite alternate`,
              animationPlayState: playing ? 'running' : 'paused',
            }}
          />
        </div>
        <RowPlayButton playing={playing} onToggle={() => setPlaying(p => !p)} />
      </div>
    </div>
  );
}

function EasingRow({ token, value, usage }: EasingToken) {
  const [playing, setPlaying] = useState(false);

  return (
    <div style={{ padding: '16px 0', borderBottom: '1px solid var(--ds-color-border-subtle)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: 24,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={TOKEN_STYLE}>{token}</span>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--ds-color-text-tertiary)' }}>
            {value}
          </span>
          <span style={{ fontSize: 11, color: 'var(--ds-color-text-tertiary)', fontFamily: 'monospace', marginTop: 2 }}>
            {usage}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, position: 'relative', height: 20 }}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: 2,
                borderRadius: 99,
                background: 'var(--ds-color-border-subtle)',
                transform: 'translateY(-50%)',
              }}
            />
            <div
              className="ds-motion-ball"
              style={{
                position: 'absolute',
                top: 2,
                left: 0,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'var(--ds-color-fill-info)',
                animation: `ds-ball-slide 800ms ${value} infinite alternate`,
                animationPlayState: playing ? 'running' : 'paused',
              }}
            />
          </div>
          <RowPlayButton playing={playing} onToggle={() => setPlaying(p => !p)} />
        </div>
      </div>
    </div>
  );
}

function MotionPage() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '40px 24px 80px',
        color: 'var(--ds-color-text-primary)',
      }}
    >
      <style>{KEYFRAMES}</style>

      <h1
        style={{
          fontFamily: 'var(--ds-headline-l-black-font-family)',
          fontSize: 'var(--ds-headline-l-black-font-size)',
          fontWeight: 'var(--ds-headline-l-black-font-weight)',
          lineHeight: 'var(--ds-headline-l-black-line-height)',
          letterSpacing: 'var(--ds-headline-l-black-letter-spacing)',
          margin: '0 0 8px',
        }}
      >
        Motion
      </h1>
      <p
        style={{
          fontFamily: 'var(--ds-body-l-regular-font-family)',
          fontSize: 'var(--ds-body-l-regular-font-size)',
          color: 'var(--ds-color-text-secondary)',
          margin: '0 0 4px',
        }}
      >
        Duration and easing tokens for consistent animation across the system.
        Use duration to control speed, easing to control feel.
      </p>

      {/* Duration */}
      <SectionHeader title="Duration" />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 56px 1fr',
          gap: 24,
          paddingBottom: 8,
          marginBottom: 4,
          marginTop: 4,
          borderBottom: '2px solid var(--ds-color-border-subtle)',
        }}
      >
        {['Token', 'Value', 'Usage'].map(h => (
          <span key={h} style={LABEL_STYLE}>{h}</span>
        ))}
      </div>
      {DURATIONS.map(d => <DurationRow key={d.token} {...d} />)}

      {/* Easing */}
      <SectionHeader title="Easing" />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: 24,
          paddingBottom: 8,
          marginBottom: 4,
          marginTop: 4,
          borderBottom: '2px solid var(--ds-color-border-subtle)',
        }}
      >
        {['Token', 'Preview'].map(h => (
          <span key={h} style={LABEL_STYLE}>{h}</span>
        ))}
      </div>
      {EASINGS.map(e => <EasingRow key={e.token} {...e} />)}
    </div>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design Tokens/Motion',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const AllTokens: StoryObj = {
  name: 'All Tokens',
  render: () => React.createElement(MotionPage),
};
