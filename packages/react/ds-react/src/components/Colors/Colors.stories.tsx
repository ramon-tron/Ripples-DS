import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect, useMemo, useState } from 'react';

// ─── Foundation palette groups ────────────────────────────────────────────────

const NEUTRAL_SHADES = [0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000];
const COLOR_SHADES   = [25,50,100,200,300,400,500,600,700,800,900];
const OPACITY_SHADES = [0,10,20,30,40,50,60,70,80,90];

interface FoundationGroup { title: string; vars: string[] }

const FOUNDATION_GROUPS: FoundationGroup[] = [
  { title: 'Neutrals',         vars: NEUTRAL_SHADES.map(s => `--ds-foundation-neutrals-${s}`) },
  { title: 'Brand',            vars: COLOR_SHADES.map(s =>   `--ds-foundation-brand-${s}`) },
  { title: 'Green',            vars: COLOR_SHADES.map(s =>   `--ds-foundation-green-${s}`) },
  { title: 'Teal',             vars: COLOR_SHADES.map(s =>   `--ds-foundation-teal-${s}`) },
  { title: 'Blue',             vars: COLOR_SHADES.map(s =>   `--ds-foundation-blue-${s}`) },
  { title: 'Purple',           vars: COLOR_SHADES.map(s =>   `--ds-foundation-purple-${s}`) },
  { title: 'Violet',           vars: COLOR_SHADES.map(s =>   `--ds-foundation-violet-${s}`) },
  { title: 'Fuschia',          vars: COLOR_SHADES.map(s =>   `--ds-foundation-fuschia-${s}`) },
  { title: 'Red',              vars: COLOR_SHADES.map(s =>   `--ds-foundation-red-${s}`) },
  { title: 'Orange',           vars: COLOR_SHADES.map(s =>   `--ds-foundation-orange-${s}`) },
  { title: 'Yellow',           vars: COLOR_SHADES.map(s =>   `--ds-foundation-yellow-${s}`) },
  { title: 'Opacity — White',  vars: OPACITY_SHADES.map(s => `--ds-foundation-opacity-white-${s}`) },
  { title: 'Opacity — Black',  vars: OPACITY_SHADES.map(s => `--ds-foundation-opacity-black-${s}`) },
];

// ─── Semantic color groups ────────────────────────────────────────────────────

interface SemanticToken { name: string; var: string }
interface SemanticGroup  { title: string; tokens: SemanticToken[] }

const SEMANTIC_GROUPS: SemanticGroup[] = [
  {
    title: 'Surface',
    tokens: [
      { name: 'L0', var: '--ds-color-surface-l0' },
      { name: 'L1', var: '--ds-color-surface-l1' },
      { name: 'L2', var: '--ds-color-surface-l2' },
      { name: 'L3', var: '--ds-color-surface-l3' },
      { name: 'L4', var: '--ds-color-surface-l4' },
      { name: 'L5', var: '--ds-color-surface-l5' },
      { name: 'L6', var: '--ds-color-surface-l6' },
    ],
  },
  {
    title: 'Text',
    tokens: [
      { name: 'Primary',           var: '--ds-color-text-primary' },
      { name: 'Secondary',         var: '--ds-color-text-secondary' },
      { name: 'Tertiary',          var: '--ds-color-text-tertiary' },
      { name: 'Placeholder',       var: '--ds-color-text-placeholder' },
      { name: 'Primary Inverse',   var: '--ds-color-text-primary-inverse' },
      { name: 'Secondary Inverse', var: '--ds-color-text-secondary-inverse' },
      { name: 'Tertiary Inverse',  var: '--ds-color-text-tertiary-inverse' },
      { name: 'Disabled',          var: '--ds-color-text-disabled' },
      { name: 'Selected',          var: '--ds-color-text-selected' },
      { name: 'Brand',             var: '--ds-color-text-brand' },
      { name: 'Link',              var: '--ds-color-text-link' },
      { name: 'Link Hover',        var: '--ds-color-text-link-hover' },
      { name: 'Link Pressed',      var: '--ds-color-text-link-pressed' },
      { name: 'Link Mono',         var: '--ds-color-text-link-mono' },
      { name: 'Link Mono Hover',   var: '--ds-color-text-link-mono-hover' },
      { name: 'Link Mono Pressed', var: '--ds-color-text-link-mono-pressed' },
      { name: 'Error',             var: '--ds-color-text-error' },
      { name: 'Error Hover',       var: '--ds-color-text-error-hover' },
      { name: 'Error Pressed',     var: '--ds-color-text-error-pressed' },
      { name: 'Success',           var: '--ds-color-text-success' },
      { name: 'Success Hover',     var: '--ds-color-text-success-hover' },
      { name: 'Success Pressed',   var: '--ds-color-text-success-pressed' },
      { name: 'Alert',             var: '--ds-color-text-alert' },
      { name: 'Alert Hover',       var: '--ds-color-text-alert-hover' },
      { name: 'Alert Pressed',     var: '--ds-color-text-alert-pressed' },
      { name: 'Info',              var: '--ds-color-text-info' },
      { name: 'Revision',          var: '--ds-color-text-revision' },
      { name: 'Completed',         var: '--ds-color-text-completed' },
      { name: 'Review',            var: '--ds-color-text-review' },
    ],
  },
  {
    title: 'Fill',
    tokens: [
      { name: 'Primary',              var: '--ds-color-fill-primary' },
      { name: 'Hover',                var: '--ds-color-fill-hover' },
      { name: 'Pressed',              var: '--ds-color-fill-pressed' },
      { name: 'Neutral',              var: '--ds-color-fill-neutral' },
      { name: 'Neutral Hover',        var: '--ds-color-fill-neutral-hover' },
      { name: 'Neutral Pressed',      var: '--ds-color-fill-neutral-pressed' },
      { name: 'Selected',             var: '--ds-color-fill-selected' },
      { name: 'Subtle',               var: '--ds-color-fill-subtle' },
      { name: 'Subtle Hover',         var: '--ds-color-fill-subtle-hover' },
      { name: 'Inverse',              var: '--ds-color-fill-inverse' },
      { name: 'Disabled',             var: '--ds-color-fill-disabled' },
      { name: 'Brand',                var: '--ds-color-fill-brand' },
      { name: 'Brand Hover',          var: '--ds-color-fill-brand-hover' },
      { name: 'Brand Pressed',        var: '--ds-color-fill-brand-pressed' },
      { name: 'Brand Subtle',         var: '--ds-color-fill-brand-subtle' },
      { name: 'Brand Subtle Hover',   var: '--ds-color-fill-brand-subtle-hover' },
      { name: 'Brand Subtle Pressed', var: '--ds-color-fill-brand-subtle-pressed' },
      { name: 'Error',                var: '--ds-color-fill-error' },
      { name: 'Error Hover',          var: '--ds-color-fill-error-hover' },
      { name: 'Error Pressed',        var: '--ds-color-fill-error-pressed' },
      { name: 'Error Subtle',         var: '--ds-color-fill-error-subtle' },
      { name: 'Error Subtle Hover',   var: '--ds-color-fill-error-subtle-hover' },
      { name: 'Error Subtle Pressed', var: '--ds-color-fill-error-subtle-pressed' },
      { name: 'Success',              var: '--ds-color-fill-success' },
      { name: 'Success Hover',        var: '--ds-color-fill-success-hover' },
      { name: 'Success Pressed',      var: '--ds-color-fill-success-pressed' },
      { name: 'Success Subtle',       var: '--ds-color-fill-success-subtle' },
      { name: 'Alert',                var: '--ds-color-fill-alert' },
      { name: 'Alert Subtle',         var: '--ds-color-fill-alert-subtle' },
      { name: 'Alert Subtle Hover',   var: '--ds-color-fill-alert-subtle-hover' },
      { name: 'Info',                 var: '--ds-color-fill-info' },
      { name: 'Info Subtle',          var: '--ds-color-fill-info-subtle' },
      { name: 'Mono',                 var: '--ds-color-fill-mono' },
      { name: 'Mono Hover',           var: '--ds-color-fill-mono-hover' },
      { name: 'Mono Pressed',         var: '--ds-color-fill-mono-pressed' },
      { name: 'Revision',             var: '--ds-color-fill-revision' },
      { name: 'Revision Subtle',      var: '--ds-color-fill-revision-subtle' },
      { name: 'Completed',            var: '--ds-color-fill-completed' },
      { name: 'Completed Subtle',     var: '--ds-color-fill-completed-subtle' },
      { name: 'Review',               var: '--ds-color-fill-review' },
      { name: 'Review Subtle',        var: '--ds-color-fill-review-subtle' },
    ],
  },
  {
    title: 'Fill — Avatars',
    tokens: [
      { name: 'Avatar 1',        var: '--ds-color-fill-avatar1' },
      { name: 'Avatar 1 Subtle', var: '--ds-color-fill-avatar1-subtle' },
      { name: 'Avatar 2',        var: '--ds-color-fill-avatar2' },
      { name: 'Avatar 2 Subtle', var: '--ds-color-fill-avatar2-subtle' },
      { name: 'Avatar 3',        var: '--ds-color-fill-avatar3' },
      { name: 'Avatar 3 Subtle', var: '--ds-color-fill-avatar3-subtle' },
      { name: 'Avatar 4',        var: '--ds-color-fill-avatar4' },
      { name: 'Avatar 4 Subtle', var: '--ds-color-fill-avatar4-subtle' },
      { name: 'Avatar 5',        var: '--ds-color-fill-avatar5' },
      { name: 'Avatar 5 Subtle', var: '--ds-color-fill-avatar5-subtle' },
    ],
  },
  {
    title: 'Icon',
    tokens: [
      { name: 'Primary',          var: '--ds-color-icon-primary' },
      { name: 'Subtle',           var: '--ds-color-icon-subtle' },
      { name: 'Inverse',          var: '--ds-color-icon-inverse' },
      { name: 'Selected',         var: '--ds-color-icon-selected' },
      { name: 'Disabled',         var: '--ds-color-icon-disabled' },
      { name: 'Brand',            var: '--ds-color-icon-brand' },
      { name: 'Brand Hover',      var: '--ds-color-icon-brand-hover' },
      { name: 'Brand Pressed',    var: '--ds-color-icon-brand-pressed' },
      { name: 'Error',            var: '--ds-color-icon-error' },
      { name: 'Error Hover',      var: '--ds-color-icon-error-hover' },
      { name: 'Error Pressed',    var: '--ds-color-icon-error-pressed' },
      { name: 'Success',          var: '--ds-color-icon-success' },
      { name: 'Success Hover',    var: '--ds-color-icon-success-hover' },
      { name: 'Success Pressed',  var: '--ds-color-icon-success-pressed' },
      { name: 'Alert',            var: '--ds-color-icon-alert' },
      { name: 'Alert Hover',      var: '--ds-color-icon-alert-hover' },
      { name: 'Info',             var: '--ds-color-icon-info' },
      { name: 'Info Hover',       var: '--ds-color-icon-info-hover' },
      { name: 'Info Pressed',     var: '--ds-color-icon-info-pressed' },
      { name: 'High Priority',    var: '--ds-color-icon-high-priority' },
      { name: 'Mono',             var: '--ds-color-icon-mono' },
      { name: 'Mono Hover',       var: '--ds-color-icon-mono-hover' },
      { name: 'Mono Pressed',     var: '--ds-color-icon-mono-pressed' },
      { name: 'Revision',         var: '--ds-color-icon-revision' },
      { name: 'Revision Hover',   var: '--ds-color-icon-revision-hover' },
      { name: 'Revision Pressed', var: '--ds-color-icon-revision-pressed' },
      { name: 'Completed',        var: '--ds-color-icon-completed' },
      { name: 'Completed Hover',  var: '--ds-color-icon-completed-hover' },
      { name: 'Completed Pressed',var: '--ds-color-icon-completed-pressed' },
      { name: 'Review',           var: '--ds-color-icon-review' },
      { name: 'Review Hover',     var: '--ds-color-icon-review-hover' },
      { name: 'Review Pressed',   var: '--ds-color-icon-review-pressed' },
    ],
  },
  {
    title: 'Border',
    tokens: [
      { name: 'Primary',     var: '--ds-color-border-primary' },
      { name: 'Subtle',      var: '--ds-color-border-subtle' },
      { name: 'More Subtle', var: '--ds-color-border-more-subtle' },
      { name: 'Inverse',     var: '--ds-color-border-inverse' },
      { name: 'Selected',    var: '--ds-color-border-selected' },
      { name: 'Disabled',    var: '--ds-color-border-disabled' },
      { name: 'Brand',       var: '--ds-color-border-brand' },
      { name: 'Error',       var: '--ds-color-border-error' },
      { name: 'Success',     var: '--ds-color-border-success' },
      { name: 'Alert',       var: '--ds-color-border-alert' },
      { name: 'Info',        var: '--ds-color-border-info' },
      { name: 'Mono',        var: '--ds-color-border-mono' },
      { name: 'Revision',    var: '--ds-color-border-revision' },
      { name: 'Completed',   var: '--ds-color-border-completed' },
      { name: 'Review',      var: '--ds-color-border-review' },
    ],
  },
  {
    title: 'Overlay',
    tokens: [
      { name: '0%',           var: '--ds-color-overlay-0' },
      { name: '10%',          var: '--ds-color-overlay-10' },
      { name: '20%',          var: '--ds-color-overlay-20' },
      { name: '30%',          var: '--ds-color-overlay-30' },
      { name: '40%',          var: '--ds-color-overlay-40' },
      { name: '50%',          var: '--ds-color-overlay-50' },
      { name: '60%',          var: '--ds-color-overlay-60' },
      { name: '70%',          var: '--ds-color-overlay-70' },
      { name: '80%',          var: '--ds-color-overlay-80' },
      { name: '90%',          var: '--ds-color-overlay-90' },
      { name: 'Inverse 0%',   var: '--ds-color-overlay-inverse0' },
      { name: 'Inverse 10%',  var: '--ds-color-overlay-inverse10' },
      { name: 'Inverse 20%',  var: '--ds-color-overlay-inverse20' },
      { name: 'Inverse 30%',  var: '--ds-color-overlay-inverse30' },
      { name: 'Inverse 40%',  var: '--ds-color-overlay-inverse40' },
      { name: 'Inverse 50%',  var: '--ds-color-overlay-inverse50' },
      { name: 'Inverse 60%',  var: '--ds-color-overlay-inverse60' },
      { name: 'Inverse 70%',  var: '--ds-color-overlay-inverse70' },
      { name: 'Inverse 80%',  var: '--ds-color-overlay-inverse80' },
      { name: 'Inverse 90%',  var: '--ds-color-overlay-inverse90' },
    ],
  },
  {
    title: 'Color Scale — Divergent A',
    tokens: Array.from({ length: 11 }, (_, i) => ({
      name: `Divergent A-${i + 1}`,
      var: `--ds-color-color-scale-divergent-a-${i + 1}`,
    })),
  },
  {
    title: 'Color Scale — Divergent B',
    tokens: Array.from({ length: 11 }, (_, i) => ({
      name: `Divergent B-${i + 1}`,
      var: `--ds-color-color-scale-divergent-b-${i + 1}`,
    })),
  },
  {
    title: 'Color Scale — Qualitative A',
    tokens: Array.from({ length: 10 }, (_, i) => ({
      name: `Qualitative A-${i + 1}`,
      var: `--ds-color-color-scale-qualitative-a-${i + 1}`,
    })),
  },
  {
    title: 'Color Scale — Qualitative B',
    tokens: Array.from({ length: 10 }, (_, i) => ({
      name: `Qualitative B-${i + 1}`,
      var: `--ds-color-color-scale-qualitative-b-${i + 1}`,
    })),
  },
  {
    title: 'Color Scale — Sequential A',
    tokens: Array.from({ length: 10 }, (_, i) => ({
      name: `Sequential A-${i + 1}`,
      var: `--ds-color-color-scale-sequential-a-${i + 1}`,
    })),
  },
  {
    title: 'Color Scale — Sequential B',
    tokens: Array.from({ length: 10 }, (_, i) => ({
      name: `Sequential B-${i + 1}`,
      var: `--ds-color-color-scale-sequential-b-${i + 1}`,
    })),
  },
  {
    title: 'Color Scale — Sequential C',
    tokens: Array.from({ length: 10 }, (_, i) => ({
      name: `Sequential C-${i + 1}`,
      var: `--ds-color-color-scale-sequential-c-${i + 1}`,
    })),
  },
  {
    title: 'Color Scale — Sequential D',
    tokens: Array.from({ length: 10 }, (_, i) => ({
      name: `Sequential D-${i + 1}`,
      var: `--ds-color-color-scale-sequential-d-${i + 1}`,
    })),
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

// Reads CSS variables from the nearest [data-theme] element so values
// reflect the active theme (light or dark) correctly.
function useResolvedColors(vars: string[]): Record<string, string> {
  const [values, setValues] = useState<Record<string, string>>({});
  const key = vars.join('\n');

  useEffect(() => {
    function read() {
      const el =
        (document.querySelector('[data-theme]') as HTMLElement | null) ??
        document.documentElement;
      const styles = getComputedStyle(el);
      const out: Record<string, string> = {};
      for (const v of vars) out[v] = styles.getPropertyValue(v).trim();
      setValues(out);
    }

    read();

    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      subtree: true,
      attributeFilter: ['data-theme'],
    });
    return () => mo.disconnect();
  }, [key]);

  return values;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isLight(cssValue: string): boolean {
  let r = 255, g = 255, b = 255;
  const rgba = cssValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgba) {
    r = parseInt(rgba[1]); g = parseInt(rgba[2]); b = parseInt(rgba[3]);
  } else if (cssValue.startsWith('#')) {
    const hex = cssValue.replace('#', '');
    const full = hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex.slice(0, 6);
    r = parseInt(full.slice(0, 2), 16);
    g = parseInt(full.slice(2, 4), 16);
    b = parseInt(full.slice(4, 6), 16);
  }
  return (r * 0.299 + g * 0.587 + b * 0.114) > 160;
}

function isTransparentValue(cssValue: string): boolean {
  if (!cssValue) return true;
  const m = cssValue.match(/rgba?\([^)]+,\s*([\d.]+)\)/);
  return m ? parseFloat(m[1]) === 0 : false;
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const CHECKERBOARD = 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 12px 12px';

const groupHeadingStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--ds-color-text-tertiary)',
  margin: '0 0 16px',
  paddingBottom: '12px',
  borderBottom: '2px solid var(--ds-color-border-subtle)',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: '10px',
};

const cardStyle: React.CSSProperties = {
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid var(--ds-color-border-subtle)',
  background: 'var(--ds-color-surface-l1)',
};

// ─── Foundation swatch ────────────────────────────────────────────────────────

function FoundationSwatch({ cssVar, value }: { cssVar: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const transparent = isTransparentValue(value);
  const light = isLight(value);

  const handleCopy = () => {
    navigator.clipboard?.writeText(cssVar);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  // Extract shade from var name: "--ds-foundation-brand-500" → "500"
  const shade = cssVar.split('-').pop() ?? '';

  return (
    <div
      onClick={handleCopy}
      title={`${cssVar}\nClick to copy`}
      style={{ ...cardStyle, cursor: 'pointer' }}
    >
      <div
        style={{
          height: '64px',
          background: transparent ? CHECKERBOARD : `var(${cssVar})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {copied && (
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '4px',
            background: light ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.85)',
            color: light ? '#fff' : '#000',
          }}>
            Copied!
          </span>
        )}
      </div>
      <div style={{ padding: '8px 10px' }}>
        <div style={{
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--ds-color-text-primary)',
          marginBottom: '2px',
        }}>
          {shade}
        </div>
        <div style={{
          fontSize: '9px',
          color: 'var(--ds-color-text-tertiary)',
          fontFamily: 'monospace',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {cssVar}
        </div>
        <div style={{
          fontSize: '10px',
          color: 'var(--ds-color-text-tertiary)',
          fontFamily: 'monospace',
          marginTop: '2px',
        }}>
          {value || '—'}
        </div>
      </div>
    </div>
  );
}

// ─── Semantic swatch ──────────────────────────────────────────────────────────

function SemanticSwatch({
  name,
  cssVar,
  value,
  reference,
}: {
  name: string;
  cssVar: string;
  value: string;
  reference?: string;
}) {
  const [copied, setCopied] = useState(false);
  const transparent = isTransparentValue(value);
  const light = isLight(value);

  const handleCopy = () => {
    navigator.clipboard?.writeText(cssVar);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      onClick={handleCopy}
      title={`${cssVar}\nClick to copy`}
      style={{ ...cardStyle, cursor: 'pointer' }}
    >
      <div
        style={{
          height: '64px',
          background: transparent ? CHECKERBOARD : `var(${cssVar})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {copied && (
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '4px',
            background: light ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.85)',
            color: light ? '#fff' : '#000',
          }}>
            Copied!
          </span>
        )}
      </div>
      <div style={{ padding: '8px 10px' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--ds-color-text-primary)',
          marginBottom: '1px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {name}
        </div>
        <div style={{
          fontSize: '9px',
          color: 'var(--ds-color-text-tertiary)',
          fontFamily: 'monospace',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {cssVar}
        </div>
        <div style={{
          fontSize: '10px',
          color: 'var(--ds-color-text-tertiary)',
          fontFamily: 'monospace',
          margin: '2px 0',
        }}>
          {value || '—'}
        </div>
        {reference && (
          <div style={{
            fontSize: '9px',
            color: 'var(--ds-color-text-brand)',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            ↗ {reference}
          </div>
        )}
        {!reference && value && (
          <div style={{ fontSize: '9px', color: 'var(--ds-color-text-disabled)', fontFamily: 'monospace' }}>
            no match
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Section layouts ──────────────────────────────────────────────────────────

function FoundationPaletteSection({
  group,
  values,
}: {
  group: FoundationGroup;
  values: Record<string, string>;
}) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h3 style={groupHeadingStyle}>{group.title}</h3>
      <div style={gridStyle}>
        {group.vars.map(v => (
          <FoundationSwatch key={v} cssVar={v} value={values[v] ?? ''} />
        ))}
      </div>
    </section>
  );
}

function SemanticGroupSection({
  group,
  values,
  foundationByValue,
}: {
  group: SemanticGroup;
  values: Record<string, string>;
  foundationByValue: Record<string, string>;
}) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h3 style={groupHeadingStyle}>{group.title}</h3>
      <div style={gridStyle}>
        {group.tokens.map(t => {
          const resolved = values[t.var] ?? '';
          return (
            <SemanticSwatch
              key={t.var}
              name={t.name}
              cssVar={t.var}
              value={resolved}
              reference={foundationByValue[resolved]}
            />
          );
        })}
      </div>
    </section>
  );
}

// ─── Pages ───────────────────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '40px 24px',
  color: 'var(--ds-color-text-primary)',
};

const pageTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--ds-headline-l-black-font-family)',
  fontSize: 'var(--ds-headline-l-black-font-size)',
  fontWeight: 'var(--ds-headline-l-black-font-weight)',
  lineHeight: 'var(--ds-headline-l-black-line-height)',
  letterSpacing: 'var(--ds-headline-l-black-letter-spacing)',
  color: 'var(--ds-color-text-primary)',
  margin: '0 0 8px',
};

const pageSubtitleStyle: React.CSSProperties = {
  fontSize: 'var(--ds-body-l-regular-font-size)',
  fontFamily: 'var(--ds-body-l-regular-font-family)',
  color: 'var(--ds-color-text-secondary)',
  margin: '0 0 48px',
};

function FoundationPage() {
  const allFoundationVars = useMemo(() => FOUNDATION_GROUPS.flatMap(g => g.vars), []);
  const foundationValues  = useResolvedColors(allFoundationVars);

  return (
    <div style={pageStyle}>
      <h1 style={pageTitleStyle}>Foundation Colors</h1>
      <p style={pageSubtitleStyle}>
        Raw palette — the fixed building blocks that semantic tokens reference.
        Click any swatch to copy its CSS variable name.
      </p>
      {FOUNDATION_GROUPS.map(group => (
        <FoundationPaletteSection key={group.title} group={group} values={foundationValues} />
      ))}
    </div>
  );
}

function SemanticPage() {
  const allFoundationVars = useMemo(() => FOUNDATION_GROUPS.flatMap(g => g.vars), []);
  const allSemanticVars   = useMemo(() => SEMANTIC_GROUPS.flatMap(g => g.tokens.map(t => t.var)), []);

  const foundationValues = useResolvedColors(allFoundationVars);
  const semanticValues   = useResolvedColors(allSemanticVars);

  // Invert the foundation map: resolvedValue → cssVarName (first-wins).
  // FOUNDATION_GROUPS order sets priority, e.g. Brand wins over Purple (same hex).
  const foundationByValue = useMemo<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const v of allFoundationVars) {
      const resolved = foundationValues[v];
      if (resolved && !(resolved in map)) map[resolved] = v;
    }
    return map;
  }, [allFoundationVars, foundationValues]);

  return (
    <div style={pageStyle}>
      <h1 style={pageTitleStyle}>Semantic Colors</h1>
      <p style={pageSubtitleStyle}>
        Purpose-driven tokens. Values and ↗ references update automatically when
        switching between Light and Dark themes. Click any swatch to copy its CSS
        variable name.
      </p>
      {SEMANTIC_GROUPS.map(group => (
        <SemanticGroupSection
          key={group.title}
          group={group}
          values={semanticValues}
          foundationByValue={foundationByValue}
        />
      ))}
    </div>
  );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design Tokens/Colors',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Foundation: StoryObj = {
  name: 'Foundation Colors',
  render: () => React.createElement(FoundationPage),
};

export const Semantic: StoryObj = {
  name: 'Semantic Colors',
  render: () => React.createElement(SemanticPage),
};

// ─── Documentation page ───────────────────────────────────────────────────────

// Shared doc styles
const DOC_TITLE: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '1.4',
  color: 'var(--ds-foundation-blue-500)',
  margin: 0,
  fontFamily: 'var(--ds-headline-l-black-font-family)',
};

const DOC_BODY: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '24px',
  color: 'var(--ds-color-text-primary)',
  fontFamily: "'Source Code Pro', monospace",
  margin: 0,
};

const DOC_BODY_BOLD: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '24px',
  color: 'var(--ds-color-text-primary)',
  fontFamily: "'Source Code Pro', monospace",
  fontWeight: 700,
  margin: 0,
};

const DOC_EXAMPLE_BOX: React.CSSProperties = {
  border: '1px solid var(--ds-color-border-subtle)',
  borderRadius: '20px',
  padding: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const DOC_SECTION: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
};

// 40×40 color swatch square
function DocSwatch({ cssVar, border }: { cssVar: string; border?: boolean }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        background: `var(${cssVar})`,
        border: border ? '1px solid var(--ds-color-border-subtle)' : undefined,
        flexShrink: 0,
      }}
    />
  );
}

// Pill chip: colored circle dot + text label
function TokenChip({ label, cssVar }: { label: string; cssVar: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--ds-color-surface-l0)',
        border: '1px solid var(--ds-color-border-subtle)',
        borderRadius: 24,
        padding: '8px 12px 8px 8px',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: `var(${cssVar})`,
          border: '1px solid rgba(0,0,0,0.08)',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--ds-color-text-secondary)',
          fontFamily: "'Source Code Pro', monospace",
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Foundation palette colors ────────────────────────────────────────────────

const PALETTE_SWATCHES = [
  { name: 'Brand',   cssVar: '--ds-foundation-brand-500' },
  { name: 'Blue',    cssVar: '--ds-foundation-blue-500' },
  { name: 'Purple',  cssVar: '--ds-foundation-purple-500' },
  { name: 'Violet',  cssVar: '--ds-foundation-violet-500' },
  { name: 'Red',     cssVar: '--ds-foundation-red-500' },
  { name: 'Fuschia', cssVar: '--ds-foundation-fuschia-500' },
  { name: 'Orange',  cssVar: '--ds-foundation-orange-500' },
  { name: 'Yellow',  cssVar: '--ds-foundation-yellow-500' },
  { name: 'Green',   cssVar: '--ds-foundation-green-500' },
  { name: 'Teal',    cssVar: '--ds-foundation-teal-500' },
  { name: 'Black',   cssVar: '--ds-foundation-neutrals-1000' },
  { name: 'White',   cssVar: '--ds-foundation-neutrals-0', border: true },
] satisfies Array<{ name: string; cssVar: string; border?: boolean }>;

// ─── Color scale demo ─────────────────────────────────────────────────────────

const BRAND_TINTS  = [25, 50, 100, 200, 300, 400].map(s => `--ds-foundation-brand-${s}`);
const BRAND_BASE   = '--ds-foundation-brand-500';
const BRAND_SHADES = [600, 700, 800, 900].map(s => `--ds-foundation-brand-${s}`);

function ColorScaleDemo() {
  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--ds-color-text-secondary)',
    fontFamily: 'monospace',
    textAlign: 'center',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, flexWrap: 'wrap' }}>
      {/* Tints */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {BRAND_TINTS.map(v => <DocSwatch key={v} cssVar={v} />)}
        </div>
        <span style={{ ...labelStyle, paddingRight: 8 }}>← Tints</span>
      </div>
      {/* Base */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 8px' }}>
        <DocSwatch cssVar={BRAND_BASE} />
        <span style={labelStyle}>Base</span>
      </div>
      {/* Shades */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {BRAND_SHADES.map(v => <DocSwatch key={v} cssVar={v} />)}
        </div>
        <span style={{ ...labelStyle, paddingLeft: 8 }}>Shades →</span>
      </div>
    </div>
  );
}

// ─── Color system flow diagram ────────────────────────────────────────────────

function ColorSystemFlow() {
  const arrow = (
    <span
      style={{
        color: 'var(--ds-color-text-tertiary)',
        fontSize: 20,
        flexShrink: 0,
        alignSelf: 'center',
        marginTop: 20, // nudge to align with chip row (below heading)
      }}
    >
      →
    </span>
  );

  const colLabel: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--ds-color-text-secondary)',
    fontFamily: "'Source Code Pro', monospace",
    whiteSpace: 'nowrap',
    marginBottom: 4,
  };

  return (
    <div style={{ border: '1px solid var(--ds-color-border-subtle)', borderRadius: 20, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Column headers */}
      <div style={{ display: 'flex', gap: 32, padding: '0 16px', justifyContent: 'center' }}>
        {['Hex value', 'Foundation Color', 'Semantic Color', 'Component'].map(h => (
          <div key={h} style={{ minWidth: 112, flexShrink: 0 }}>
            <span style={colLabel}>{h}</span>
          </div>
        ))}
      </div>
      {/* Data row */}
      <div
        style={{
          display: 'flex',
          gap: 32,
          padding: 16,
          background: 'var(--ds-color-fill-subtle)',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <TokenChip label="#4d4bff" cssVar="--ds-foundation-brand-500" />
        {arrow}
        <TokenChip label="Brand 500" cssVar="--ds-foundation-brand-500" />
        {arrow}
        <TokenChip label="Fill Brand" cssVar="--ds-color-fill-brand" />
        {arrow}
        {/* Minimal button rendered with DS tokens */}
        <div
          style={{
            background: 'var(--ds-color-fill-brand)',
            color: 'var(--ds-color-text-primary-inverse)',
            padding: '12px 16px',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '0.65px',
            textTransform: 'uppercase',
            lineHeight: '24px',
            fontFamily: "'Work Sans', sans-serif",
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Button
        </div>
      </div>
    </div>
  );
}

// ─── Annotated component examples ────────────────────────────────────────────

// Figma asset URLs — Button annotation (node 7394:27600)
const BTN_ICON_CHECK       = 'https://www.figma.com/api/mcp/asset/1bd4ef0e-f846-4275-bd57-6a86595e60ee';
const BTN_TOKEN_FILL_BRAND = 'https://www.figma.com/api/mcp/asset/cde500ca-5538-4d18-a8a5-fb291a1f7a10';
const BTN_TOKEN_TEXT_INV   = 'https://www.figma.com/api/mcp/asset/75676ef9-5b07-48ac-95ad-16d3d8735f2f';
const BTN_TOKEN_ICON_INV   = 'https://www.figma.com/api/mcp/asset/0494bc1a-b4aa-40fd-b6c2-2666fae2b6c2';
const BTN_ARROW_1          = 'https://www.figma.com/api/mcp/asset/3cbcb123-8887-4ad9-88d3-b4462040ca0b';
const BTN_ARROW_2          = 'https://www.figma.com/api/mcp/asset/e795b2d9-b8b3-403f-aaae-394f684f6ed6';
const BTN_ARROW_3          = 'https://www.figma.com/api/mcp/asset/d57964a3-086c-47bf-9bb7-aa00dded0c73';

// Figma asset URLs — Input annotation (node 7394:27609)
const INP_CURSOR           = 'https://www.figma.com/api/mcp/asset/429825a1-1fab-421a-ad11-e544a7cf76a8';
const INP_ICON_HELP        = 'https://www.figma.com/api/mcp/asset/ec915fc9-365a-4eab-b621-c6f98049570e';
const INP_ICON_PERSON      = 'https://www.figma.com/api/mcp/asset/996b8cdb-2ec5-43de-8726-0cea642fa968';
const INP_ICON_EYE         = 'https://www.figma.com/api/mcp/asset/64b2f61e-cd0d-4e29-98a5-a5012f58354f';
const INP_DIVIDER          = 'https://www.figma.com/api/mcp/asset/7f35c386-cbbd-4c85-b103-032ce0c09514';
const INP_ICON_REMOVE      = 'https://www.figma.com/api/mcp/asset/137248ea-b3b1-4e6a-8dab-ac72682f73b9';
const INP_TOKEN_FILL_PRI   = 'https://www.figma.com/api/mcp/asset/4596b787-22dc-4304-b59d-0e12f1af014c';
const INP_TOKEN_BORDER_SEL = 'https://www.figma.com/api/mcp/asset/8427809a-8845-44ab-87b5-7d3fa1e0c308';
const INP_TOKEN_SUBTLE     = 'https://www.figma.com/api/mcp/asset/afaae6ba-1511-4155-b178-a34befa3133b';
const INP_TOKEN_TEXT_PRI   = 'https://www.figma.com/api/mcp/asset/ab9c4c5e-9dcb-4921-b0e1-551f0b237932';
const INP_ARROW_4          = 'https://www.figma.com/api/mcp/asset/ceade4dd-a1dc-4fb8-badf-eec4d5518767';
const INP_ARROW_5          = 'https://www.figma.com/api/mcp/asset/07592bf4-7a6c-491d-bc30-036506c86920';
const INP_ARROW_6          = 'https://www.figma.com/api/mcp/asset/714aab47-74a6-4280-a60e-1f004d53095b';
const INP_ARROW_7          = 'https://www.figma.com/api/mcp/asset/3333d810-9bbb-4fc6-bbbb-528de9e6a704';
const INP_ARROW_8          = 'https://www.figma.com/api/mcp/asset/151afb59-978d-49c0-b8a3-d212b8447fed';
const INP_ARROW_9          = 'https://www.figma.com/api/mcp/asset/76fa9f5a-cfc6-4abd-897d-49b4528b4f17';
const INP_ARROW_10         = 'https://www.figma.com/api/mcp/asset/918d6c16-27d1-4f50-b9c2-df4750f354f2';

// Shared chip / arrow helpers

const CHIP_STYLE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: 'var(--ds-color-surface-l0)',
  border: '1px solid var(--ds-color-border-subtle)',
  borderRadius: 24,
  padding: '8px 12px 8px 8px',
  position: 'relative',
  gridColumn: 1,
  gridRow: 1,
};

const CHIP_LABEL: React.CSSProperties = {
  fontFamily: "'Source Code Pro', monospace",
  fontWeight: 400,
  lineHeight: 1.4,
  flexShrink: 0,
  fontSize: 12,
  color: 'var(--ds-color-text-secondary)',
  whiteSpace: 'nowrap',
  margin: 0,
};

function DiagramChip({ label, tokenImg, ml, mt }: { label: string; tokenImg: string; ml: number; mt: number }) {
  return (
    <div style={{ ...CHIP_STYLE, marginLeft: ml, marginTop: mt }}>
      <div style={{ position: 'relative', flexShrink: 0, width: 24, height: 24 }}>
        <img
          alt=""
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'block', maxWidth: 'none', width: '100%', height: '100%' }}
          src={tokenImg}
        />
      </div>
      <p style={CHIP_LABEL}>{label}</p>
    </div>
  );
}

function DiagramArrow({
  ml, mt, w, h,
  pathW, pathH,
  insetTop, insetRight, insetBottom, insetLeft,
  rotate, scaleYMinus1,
  src,
}: {
  ml: number; mt: number; w: number; h: number;
  pathW: number; pathH: number;
  insetTop: string; insetRight: string; insetBottom: string; insetLeft: string;
  rotate: string; scaleYMinus1?: boolean;
  src: string;
}) {
  return (
    <div style={{
      gridColumn: 1, gridRow: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginLeft: ml, marginTop: mt,
      position: 'relative', width: w, height: h,
    }}>
      <div style={{ flexShrink: 0, transform: `${scaleYMinus1 ? 'scaleY(-1) ' : ''}rotate(${rotate})` }}>
        <div style={{ height: pathH, position: 'relative', width: pathW }}>
          <div style={{ position: 'absolute', top: insetTop, right: insetRight, bottom: insetBottom, left: insetLeft }}>
            <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={src} />
          </div>
        </div>
      </div>
    </div>
  );
}

const DIAGRAM_GRID: React.CSSProperties = {
  display: 'inline-grid',
  gridTemplateColumns: 'max-content',
  gridTemplateRows: 'max-content',
  placeItems: 'start',
  lineHeight: 0,
  position: 'relative',
  flexShrink: 0,
};

const DIAGRAM_WRAP: React.CSSProperties = {
  background: 'var(--ds-color-fill-subtle)',
  padding: 30,
  borderRadius: 20,
  flexShrink: 0,
};

function ButtonAnnotated() {
  return (
    <div style={DIAGRAM_WRAP}>
      <div style={DIAGRAM_GRID}>
        {/* Button */}
        <div style={{
          background: 'var(--ds-color-fill-brand)',
          gridColumn: 1, gridRow: 1,
          marginLeft: 0, marginTop: 25,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '12px 16px',
          borderRadius: 8,
          position: 'relative',
        }}>
          <div style={{ display: 'flex', gap: 4, height: 24, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ overflow: 'hidden', position: 'relative', flexShrink: 0, width: 20, height: 20 }}>
              <div style={{ position: 'absolute', top: '7.49%', right: '7.49%', bottom: '7.49%', left: '7.49%' }}>
                <img alt="" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={BTN_ICON_CHECK} />
              </div>
            </div>
            <span style={{
              fontFamily: "'Work Sans', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              lineHeight: '24px',
              letterSpacing: '0.65px',
              textTransform: 'uppercase',
              color: 'var(--ds-color-text-primary-inverse)',
              whiteSpace: 'nowrap',
            }}>Button</span>
          </div>
        </div>

        <DiagramChip label="Fill Brand"           tokenImg={BTN_TOKEN_FILL_BRAND} ml={129.29} mt={0} />
        <DiagramChip label="Text Primary Inverse"  tokenImg={BTN_TOKEN_TEXT_INV}   ml={129.29} mt={49} />
        <DiagramChip label="Icon Inverse"          tokenImg={BTN_TOKEN_ICON_INV}   ml={0}      mt={96} />

        <DiagramArrow ml={91.73} mt={7.32}  w={35.565} h={24.426} pathW={33.483} pathH={12.169} insetTop="21.68%"  insetRight="-1.49%"  insetBottom="-21.91%" insetLeft="-7.96%"  rotate="-23.31deg"  src={BTN_ARROW_1} />
        <DiagramArrow ml={75}    mt={49.72} w={52.292} h={36.811} pathW={48.713} pathH={19.093} insetTop="13.82%"  insetRight="-1.03%"  insetBottom="-11.33%" insetLeft="-5.47%"  rotate="23.31deg"   src={BTN_ARROW_2} scaleYMinus1 />
        <DiagramArrow ml={43}    mt={62.25} w={0}      h={29.5}   pathW={29.5}   pathH={0}      insetTop="-3.68px" insetRight="-1.69%"  insetBottom="-3.68px" insetLeft="-9.04%"  rotate="90deg"      src={BTN_ARROW_3} />
      </div>
    </div>
  );
}

function BlinkingCursor() {
  return (
    <div style={{ height: 24, overflow: 'hidden', position: 'relative', flexShrink: 0, width: 2 }}>
      <div style={{
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        height: 17,
        left: '50%',
        top: 'calc(50% - 0.5px)',
        width: 2,
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <img
            alt=""
            style={{
              position: 'absolute',
              height: '858.47%',
              left: '-17301.52%',
              maxWidth: 'none',
              top: '-376.47%',
              width: '34750%',
            }}
            src={INP_CURSOR}
          />
        </div>
      </div>
    </div>
  );
}

function InputAnnotated() {
  return (
    <div style={DIAGRAM_WRAP}>
      <div style={DIAGRAM_GRID}>
        {/* Input component */}
        <div style={{
          gridColumn: 1, gridRow: 1,
          marginLeft: 178, marginTop: 2.75,
          display: 'flex', flexDirection: 'column', gap: 4,
          alignItems: 'flex-start',
          borderRadius: 16,
          position: 'relative',
          width: 400,
        }}>
          {/* Label and help icon */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <p style={{
                fontFamily: 'var(--ds-body-s-regular-font-family)',
                fontWeight: 400,
                lineHeight: 'var(--ds-body-s-regular-line-height)',
                fontSize: 'var(--ds-body-s-regular-font-size)',
                color: 'var(--ds-color-text-primary)',
                whiteSpace: 'nowrap',
                margin: 0, flexShrink: 0,
              }}>Input Label</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2, borderRadius: 50, flexShrink: 0 }}>
                <div style={{ overflow: 'hidden', position: 'relative', flexShrink: 0, width: 12, height: 12 }}>
                  <div style={{ position: 'absolute', top: '7.49%', right: '7.49%', bottom: '7.49%', left: '7.49%' }}>
                    <img alt="" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={INP_ICON_HELP} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Input container */}
          <div style={{
            background: 'var(--ds-color-fill-primary)',
            border: '2px solid var(--ds-color-border-selected)',
            borderRadius: 8,
            position: 'relative',
            flexShrink: 0,
            width: '100%',
            boxSizing: 'border-box',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {/* Content */}
              <div style={{
                display: 'flex', flex: '1 0 0', gap: 8, alignItems: 'center',
                minWidth: 1, padding: '12px 14px',
                borderRadius: '8px 0 0 8px', overflow: 'hidden',
              }}>
                <div style={{ display: 'flex', flex: '1 0 0', gap: 4, alignItems: 'center', minWidth: 1, overflow: 'hidden', position: 'relative' }}>
                  {/* Person icon */}
                  <div style={{ overflow: 'hidden', position: 'relative', flexShrink: 0, width: 16, height: 16 }}>
                    <div style={{ position: 'absolute', top: '14.99%', right: '15.82%', bottom: '14.99%', left: '15.82%' }}>
                      <img alt="" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={INP_ICON_PERSON} />
                    </div>
                  </div>
                  <p style={{
                    fontFamily: 'var(--ds-body-l-regular-font-family)',
                    fontWeight: 400,
                    lineHeight: 'var(--ds-body-l-regular-line-height)',
                    fontSize: 'var(--ds-body-l-regular-font-size)',
                    color: 'var(--ds-color-text-primary)',
                    whiteSpace: 'nowrap',
                    margin: 0, flexShrink: 0,
                  }}>mina.chae-young@example...</p>
                  <BlinkingCursor />
                  <p style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 400,
                    lineHeight: '24px',
                    fontSize: 16,
                    color: 'var(--ds-color-text-secondary)',
                    whiteSpace: 'nowrap',
                    margin: 0, flexShrink: 0,
                  }}>@mina</p>
                </div>
                {/* Eye icon */}
                <div style={{ overflow: 'hidden', position: 'relative', flexShrink: 0, width: 16, height: 16 }}>
                  <div style={{ position: 'absolute', top: '15.89%', right: '4.2%', bottom: '20.06%', left: '4.2%' }}>
                    <img alt="" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={INP_ICON_EYE} />
                  </div>
                </div>
              </div>
              {/* Trailing button */}
              <div style={{ display: 'flex', height: 48, alignItems: 'center', flexShrink: 0 }}>
                <div style={{ height: '100%', maxHeight: 24, position: 'relative', flexShrink: 0, width: 0 }}>
                  <div style={{ position: 'absolute', top: 0, right: -0.5, bottom: 0, left: -0.5 }}>
                    <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={INP_DIVIDER} />
                  </div>
                </div>
                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', padding: '4px 16px', borderRadius: 8, flexShrink: 0 }}>
                  <div style={{ overflow: 'hidden', position: 'relative', flexShrink: 0, width: 16, height: 16 }}>
                    <div style={{ position: 'absolute', top: '14.57%', right: '7.19%', bottom: '15.4%', left: '3.39%' }}>
                      <img alt="" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={INP_ICON_REMOVE} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Help text */}
          <p style={{
            fontFamily: 'var(--ds-body-s-regular-font-family)',
            fontWeight: 400,
            lineHeight: 'var(--ds-body-s-regular-line-height)',
            fontSize: 'var(--ds-body-s-regular-font-size)',
            color: 'var(--ds-color-text-secondary)',
            minWidth: '100%', flexShrink: 0,
            margin: 0, width: 'min-content',
          }}>This text gives further instructions.</p>
        </div>

        {/* Token chips */}
        <DiagramChip label="Fill Primary"    tokenImg={INP_TOKEN_FILL_PRI}   ml={599.56} mt={0} />
        <DiagramChip label="Border Selected" tokenImg={INP_TOKEN_BORDER_SEL} ml={623.44} mt={63} />
        <DiagramChip label="Icon Subtle"     tokenImg={INP_TOKEN_SUBTLE}     ml={466.71} mt={105.75} />
        <DiagramChip label="Text Secondary"  tokenImg={INP_TOKEN_SUBTLE}     ml={178}    mt={105.75} />
        <DiagramChip label="Text Primary"    tokenImg={INP_TOKEN_TEXT_PRI}   ml={0}      mt={5.75} />

        {/* Arrows */}
        <DiagramArrow ml={562}    mt={7.32}  w={35.565}  h={24.426}  pathW={33.483}  pathH={12.169} insetTop="21.68%"   insetRight="-1.49%"  insetBottom="-21.91%" insetLeft="-7.96%"  rotate="-23.31deg"  src={INP_ARROW_4} />
        <DiagramArrow ml={569.14} mt={63.72} w={52.292}  h={36.811}  pathW={48.713}  pathH={19.093} insetTop="13.82%"   insetRight="-1.03%"  insetBottom="-11.33%" insetLeft="-5.47%"  rotate="23.31deg"   src={INP_ARROW_5} scaleYMinus1 />
        <DiagramArrow ml={509.71} mt={53.5}  w={0}       h={48}      pathW={48}      pathH={0}      insetTop="-3.68px"  insetRight="-1.04%"  insetBottom="-3.68px" insetLeft="-5.56%"  rotate="90deg"      src={INP_ARROW_6} />
        <DiagramArrow ml={221}    mt={92.5}  w={0}       h={9}       pathW={9}       pathH={0}      insetTop="-3.68px"  insetRight="-5.56%"  insetBottom="-3.68px" insetLeft="-29.63%" rotate="90deg"      src={INP_ARROW_7} />
        <DiagramArrow ml={335.5}  mt={54.72} w={146.073} h={117.837} pathW={134.964} pathH={58.322} insetTop="32.96%"   insetRight="-0.37%"  insetBottom="-4.57%"  insetLeft="-1.98%"  rotate="150.1deg"   src={INP_ARROW_10} />
        <DiagramArrow ml={142.5}  mt={14.75} w={30}      h={0}       pathW={30}      pathH={0}      insetTop="-3.68px"  insetRight="-1.67%"  insetBottom="-3.68px" insetLeft="-8.89%"  rotate="180deg"     src={INP_ARROW_8} />
        <DiagramArrow ml={144.5}  mt={30.5}  w={43.5}    h={15.25}   pathW={43.5}    pathH={15.25}  insetTop="-17.49%"  insetRight="-1.15%"  insetBottom="-24.14%" insetLeft="-6.13%"  rotate="180deg"     src={INP_ARROW_9} />
      </div>
    </div>
  );
}

// ─── Full documentation page ──────────────────────────────────────────────────

function ColorDocumentationPage() {
  return (
    <div style={{ color: 'var(--ds-color-text-primary)' }}>
      {/* ── Banner ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--ds-color-fill-neutral)',
          padding: '30px 40px',
          marginBottom: 36,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--ds-headline-5xl-black-font-family)',
            fontSize: 'var(--ds-headline-5xl-black-font-size)',
            fontWeight: 'var(--ds-headline-5xl-black-font-weight)',
            lineHeight: 'var(--ds-headline-5xl-black-line-height)',
            letterSpacing: 'var(--ds-headline-5xl-black-letter-spacing)',
            color: 'var(--ds-color-text-primary)',
            margin: 0,
          }}
        >
          Colors
        </h1>
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '0 48px 80px',
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
        }}
      >
        {/* ── 1. Foundation Colors ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Foundation Colors intro */}
          <div style={DOC_SECTION}>
            <h2 style={DOC_TITLE}>Foundation Colors and Color Variables</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={DOC_BODY}>
                Foundation colors are base-line hues like "Blue, Red and Green" that act as the
                default color palette for the design system.
              </p>
              <p style={DOC_BODY}>
                Our design system has 11, with one of them being neutrals to fill out values from
                black to white:
              </p>
            </div>
          </div>
          {/* Palette swatches */}
          <div style={DOC_EXAMPLE_BOX}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {PALETTE_SWATCHES.map(p => (
                <DocSwatch key={p.cssVar} cssVar={p.cssVar} border={'border' in p ? p.border : false} />
              ))}
            </div>
          </div>

          {/* Color scale */}
          <div style={DOC_SECTION}>
            <h2 style={DOC_TITLE}>Color scale</h2>
            <p style={DOC_BODY}>
              We create an 11 step tint and shade scale for the base colors. Tints are created by
              increasing the lightness value of the base color, and shades are created by
              decreasing it.
            </p>
          </div>
          <div style={DOC_EXAMPLE_BOX}>
            <ColorScaleDemo />
          </div>

          {/* Naming color variables */}
          <div style={DOC_SECTION}>
            <h2 style={DOC_TITLE}>Naming Color Variables</h2>
            <p style={DOC_BODY}>
              Our base foundation colors are turned into color variables using the following global
              naming foundation:
            </p>
            <p style={DOC_BODY_BOLD}>Group/Name/Value</p>
            <p style={DOC_BODY}>Which gives us</p>
            <p style={DOC_BODY_BOLD}>Foundation/Brand/500</p>
            <p style={DOC_BODY}>And its complete set is:</p>
            <ul style={{ ...DOC_BODY, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[25,50,100,200,300,400,500,600,700,800,900].map(s => (
                <li key={s}>Foundation/Brand/{s}</li>
              ))}
            </ul>
            <p style={DOC_BODY}>
              Most of our foundation color values range from 25–900, however our neutrals range
              from 0–1000 to give us full black and full white.
            </p>
            <ul style={{ ...DOC_BODY, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000].map(s => (
                <li key={s}>Foundation/Neutral/{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 2. How the color system works ───────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={DOC_SECTION}>
            <h2 style={DOC_TITLE}>How the color system works</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={DOC_BODY}>
                Semantic colors have meaning and are named based on how they're used, not what they
                look like.
              </p>
              <p style={DOC_BODY}>
                A good way to visualise this is to look at the example below. The hex value has
                been assigned to the foundation color, which has been assigned to the semantic
                color, which has been used as the fill of the button component.
              </p>
            </div>
          </div>
          <ColorSystemFlow />
        </div>

        {/* ── 3. Semantic Variables ───────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={DOC_SECTION}>
            <h2 style={DOC_TITLE}>Semantic Variables</h2>
            <p style={DOC_BODY}>Color variables are then assigned to semantic variables.</p>
            <p style={DOC_BODY}>Here's how they're used in components.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, overflowX: 'auto' }}>
            <ButtonAnnotated />
            <InputAnnotated />
          </div>
        </div>

        {/* ── 4. Naming Semantic Variables ────────────────────────────────── */}
        <div style={DOC_SECTION}>
          <h2 style={DOC_TITLE}>Naming Semantic Variables</h2>
          <p style={DOC_BODY}>
            Similar to color variables, semantic variables use a global naming convention:
          </p>
          <p style={DOC_BODY_BOLD}>Group/Semantic Variable</p>
          <p style={DOC_BODY}>Which gives us:</p>
          <p style={DOC_BODY_BOLD}>Fill/Brand</p>
          <p style={DOC_BODY}>And its complete set being:</p>
          <ul style={{ ...DOC_BODY, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
            <li>Fill/Brand</li>
            <li>Fill/Brand Hover</li>
            <li>Fill/Brand Pressed</li>
            <li>Fill/Brand Subtle</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export const Documentation: StoryObj = {
  name: 'Documentation',
  render: () => React.createElement(ColorDocumentationPage),
};
