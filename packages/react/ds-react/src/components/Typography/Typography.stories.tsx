import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TypeStyle {
  token: string;
  label: string;
  sample?: string;
}

interface TypeGroup {
  title: string;
  styles: TypeStyle[];
}

// ─── Token data ──────────────────────────────────────────────────────────────

const GROUPS: TypeGroup[] = [
  {
    title: 'Headline',
    styles: [
      { token: '--ds-headline-5xl-black',    label: 'Headline / 5XL / Black' },
      { token: '--ds-headline-4xl-black',    label: 'Headline / 4XL / Black' },
      { token: '--ds-headline-3xl-black',    label: 'Headline / 3XL / Black' },
      { token: '--ds-headline-2xl-black',    label: 'Headline / 2XL / Black' },
      { token: '--ds-headline-xl-black',     label: 'Headline / XL / Black' },
      { token: '--ds-headline-l-black',      label: 'Headline / L / Black' },
      { token: '--ds-headline-m-extra-bold', label: 'Headline / M / Extra Bold' },
      { token: '--ds-headline-s-extra-bold', label: 'Headline / S / Extra Bold' },
      { token: '--ds-headline-xs-extra-bold', label: 'Headline / XS / Extra Bold' },
      { token: '--ds-headline-2xs-extra-bold', label: 'Headline / 2XS / Extra Bold' },
    ],
  },
  {
    title: 'Sub-Headline',
    styles: [
      { token: '--ds-sub-headline-5xl-medium', label: 'Sub-Headline / 5XL / Medium' },
      { token: '--ds-sub-headline-4xl-medium', label: 'Sub-Headline / 4XL / Medium' },
      { token: '--ds-sub-headline-3xl-medium', label: 'Sub-Headline / 3XL / Medium' },
      { token: '--ds-sub-headline-2xl-medium', label: 'Sub-Headline / 2XL / Medium' },
      { token: '--ds-sub-headline-xl-medium',  label: 'Sub-Headline / XL / Medium' },
      { token: '--ds-sub-headline-l-medium',   label: 'Sub-Headline / L / Medium' },
      { token: '--ds-sub-headline-m-medium',   label: 'Sub-Headline / M / Medium' },
      { token: '--ds-sub-headline-s-medium',   label: 'Sub-Headline / S / Medium' },
      { token: '--ds-sub-headline-xs-medium',  label: 'Sub-Headline / XS / Medium' },
      { token: '--ds-sub-headline-2xs-medium', label: 'Sub-Headline / 2XS / Medium' },
    ],
  },
  {
    title: 'Body',
    styles: [
      { token: '--ds-body-2xl-regular', label: 'Body / 2XL / Regular' },
      { token: '--ds-body-2xl-medium',  label: 'Body / 2XL / Medium' },
      { token: '--ds-body-2xl-bold',    label: 'Body / 2XL / Bold' },
      { token: '--ds-body-xl-regular',  label: 'Body / XL / Regular' },
      { token: '--ds-body-xl-medium',   label: 'Body / XL / Medium' },
      { token: '--ds-body-xl-bold',     label: 'Body / XL / Bold' },
      { token: '--ds-body-l-regular',   label: 'Body / L / Regular' },
      { token: '--ds-body-l-medium',    label: 'Body / L / Medium' },
      { token: '--ds-body-l-bold',      label: 'Body / L / Bold' },
      { token: '--ds-body-m-regular',   label: 'Body / M / Regular' },
      { token: '--ds-body-m-medium',    label: 'Body / M / Medium' },
      { token: '--ds-body-m-bold',      label: 'Body / M / Bold' },
      { token: '--ds-body-s-regular',   label: 'Body / S / Regular' },
      { token: '--ds-body-s-medium',    label: 'Body / S / Medium' },
      { token: '--ds-body-s-bold',      label: 'Body / S / Bold' },
    ],
  },
  {
    title: 'Labels',
    styles: [
      { token: '--ds-labels-l-bold', label: 'Labels / L / Bold', sample: 'LABEL TEXT' },
      { token: '--ds-labels-m-bold', label: 'Labels / M / Bold', sample: 'LABEL TEXT' },
      { token: '--ds-labels-s-bold', label: 'Labels / S / Bold', sample: 'LABEL TEXT' },
    ],
  },
  {
    title: 'Chips',
    styles: [
      { token: '--ds-chips-m-medium', label: 'Chips / M / Medium', sample: 'Chip label' },
      { token: '--ds-chips-s-medium', label: 'Chips / S / Medium', sample: 'Chip label' },
    ],
  },
  {
    title: 'Footnote',
    styles: [
      { token: '--ds-footnote-xs-regular', label: 'Footnote / XS / Regular', sample: 'Footnote text' },
      { token: '--ds-footnote-xs-medium',  label: 'Footnote / XS / Medium',  sample: 'Footnote text' },
      { token: '--ds-footnote-xs-bold',    label: 'Footnote / XS / Bold',    sample: 'Footnote text' },
    ],
  },
  {
    title: 'Button',
    styles: [
      { token: '--ds-button-sm', label: 'Button / SM', sample: 'BUTTON LABEL' },
      { token: '--ds-button-md', label: 'Button / MD', sample: 'BUTTON LABEL' },
      { token: '--ds-button-lg', label: 'Button / LG', sample: 'BUTTON LABEL' },
      { token: '--ds-button-xl', label: 'Button / XL', sample: 'BUTTON LABEL' },
    ],
  },
  {
    title: 'Links — Inline',
    styles: [
      { token: '--ds-links-inline-2xl-regular', label: 'Links / Inline / 2XL', sample: 'Inline link text' },
      { token: '--ds-links-inline-xl-regular',  label: 'Links / Inline / XL',  sample: 'Inline link text' },
      { token: '--ds-links-inline-l-regular',   label: 'Links / Inline / L',   sample: 'Inline link text' },
      { token: '--ds-links-inline-m-regular',   label: 'Links / Inline / M',   sample: 'Inline link text' },
      { token: '--ds-links-inline-s-regular',   label: 'Links / Inline / S',   sample: 'Inline link text' },
    ],
  },
  {
    title: 'Links — Stand-alone',
    styles: [
      { token: '--ds-links-stand-alone-2xl-semi-bold', label: 'Links / Stand-alone / 2XL', sample: 'Stand-alone link' },
      { token: '--ds-links-stand-alone-xl-semi-bold',  label: 'Links / Stand-alone / XL',  sample: 'Stand-alone link' },
      { token: '--ds-links-stand-alone-l-semi-bold',   label: 'Links / Stand-alone / L',   sample: 'Stand-alone link' },
      { token: '--ds-links-stand-alone-m-semi-bold',   label: 'Links / Stand-alone / M',   sample: 'Stand-alone link' },
      { token: '--ds-links-stand-alone-s-semi-bold',   label: 'Links / Stand-alone / S',   sample: 'Stand-alone link' },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function cssVar(token: string, prop: string): string {
  return `var(${token}-${prop})`;
}

function readCssVar(token: string, prop: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`${token}-${prop}`)
    .trim();
}

// ─── Components ──────────────────────────────────────────────────────────────

function TypeSample({ token, label, sample = 'The quick brown fox jumps over the lazy dog' }: TypeStyle) {
  const fontSize      = readCssVar(token, 'font-size');
  const lineHeight    = readCssVar(token, 'line-height');
  const letterSpacing = readCssVar(token, 'letter-spacing');
  const fontWeight    = readCssVar(token, 'font-weight');
  const fontFamily    = readCssVar(token, 'font-family').split(',')[0].trim();

  return (
    <div style={{ padding: '20px 0', borderBottom: '1px solid var(--ds-color-border-subtle)' }}>
      <p
        style={{
          fontFamily:    cssVar(token, 'font-family'),
          fontSize:      cssVar(token, 'font-size'),
          fontWeight:    cssVar(token, 'font-weight'),
          lineHeight:    cssVar(token, 'line-height'),
          letterSpacing: cssVar(token, 'letter-spacing'),
          color:         'var(--ds-color-text-primary)',
          margin: '0 0 10px',
        }}
      >
        {sample}
      </p>
      <div
        style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          fontFamily: 'monospace',
          fontSize: '11px',
          color: 'var(--ds-color-text-secondary)',
        }}
      >
        <span style={{ color: 'var(--ds-color-text-brand)', fontWeight: 600 }}>{label}</span>
        {fontSize      && <span>size: {fontSize}</span>}
        {lineHeight    && <span>lh: {lineHeight}</span>}
        {letterSpacing && letterSpacing !== '0px' && <span>ls: {letterSpacing}</span>}
        {fontWeight    && <span>wt: {fontWeight}</span>}
        {fontFamily    && <span>family: {fontFamily}</span>}
        <span style={{ opacity: 0.5 }}>{token}-*</span>
      </div>
    </div>
  );
}

function TypeGroup({ title, styles }: TypeGroup) {
  return (
    <section style={{ marginBottom: '48px' }}>
      <h2
        style={{
          fontFamily: 'var(--ds-body-m-bold-font-family)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--ds-color-text-tertiary)',
          margin: '0 0 4px',
          paddingBottom: '12px',
          borderBottom: '2px solid var(--ds-color-border-subtle)',
        }}
      >
        {title}
      </h2>
      {styles.map((style) => (
        <TypeSample key={style.token} {...style} />
      ))}
    </section>
  );
}

function TypographyPage() {
  return (
    <div
      style={{
        maxWidth: '900px',
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
        Typography
      </h1>
      <p
        style={{
          fontFamily: 'var(--ds-body-l-regular-font-family)',
          fontSize: 'var(--ds-body-l-regular-font-size)',
          fontWeight: 'var(--ds-body-l-regular-font-weight)',
          lineHeight: 'var(--ds-body-l-regular-line-height)',
          color: 'var(--ds-color-text-secondary)',
          margin: '0 0 48px',
        }}
      >
        All semantic typography styles. Each sample uses its own CSS custom properties from{' '}
        <code style={{ fontFamily: 'monospace', fontSize: '13px' }}>tokens.css</code>.
      </p>
      {GROUPS.map((group) => (
        <TypeGroup key={group.title} title={group.title} styles={group.styles} />
      ))}
    </div>
  );
}

// ─── Story ───────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design Tokens/Typography',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const AllStyles: StoryObj = {
  name: 'All Styles',
  render: () => React.createElement(TypographyPage),
};
