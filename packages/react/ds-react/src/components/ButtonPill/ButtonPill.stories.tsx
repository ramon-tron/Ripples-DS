import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';
import { ButtonPill } from './ButtonPill';
import type { ButtonPillVariant, ButtonPillSize } from './ButtonPill';

const meta = {
  title: 'Components/ButtonPill',
  component: ButtonPill,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A pill-shaped button (\`border-radius: 999px\`) for actions that benefit from a softer, more rounded form. Shares the same nine color variants as Button but does not include the Text family.

Pill buttons are visually distinct from rectangular buttons, making them well-suited for:
- Filter chips and category toggles
- Quick-action tags on cards or list rows
- Floating action areas where rounded shapes feel more approachable

**When to use something else**
- Use **Button** for primary CTAs in forms and dialogs — the rectangular shape carries more visual authority in those contexts.
- Use **IconButton** when no text label is needed.
- Avoid using both a leading and trailing icon on the same ButtonPill — choose one or neither.
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary', 'secondary', 'tertiary',
        'mono-primary', 'mono-secondary', 'mono-tertiary',
        'destructive', 'destructive-secondary', 'destructive-tertiary',
      ] satisfies ButtonPillVariant[],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'] satisfies ButtonPillSize[],
    },
    loading:  { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    children: 'Label',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof ButtonPill>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {(['sm', 'md', 'lg', 'xl'] as ButtonPillSize[]).map((size) => (
        <ButtonPill key={size} {...args} size={size}>
          {size.toUpperCase()}
        </ButtonPill>
      ))}
    </div>
  ),
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story  = { args: { loading: true } };

// ─── With icons ──────────────────────────────────────────────────────────────

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.7 4.1L8 10.5l-3.7 1.95.7-4.1L2 5.5l4.15-.75z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const WithLeadingIcon: Story = {
  args: { leadingIcon: <StarIcon /> },
  parameters: {
    docs: {
      description: {
        story: 'ButtonPill supports a leading **or** trailing icon — never both simultaneously.',
      },
    },
  },
};

export const WithTrailingIcon: Story = {
  args: { trailingIcon: <ArrowIcon /> },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

const VARIANT_GROUPS: { label: string; variants: ButtonPillVariant[] }[] = [
  { label: 'Brand',       variants: ['primary', 'secondary', 'tertiary'] },
  { label: 'Mono',        variants: ['mono-primary', 'mono-secondary', 'mono-tertiary'] },
  { label: 'Destructive', variants: ['destructive', 'destructive-secondary', 'destructive-tertiary'] },
];

const SIZES: ButtonPillSize[] = ['sm', 'md', 'lg', 'xl'];

function variantLabel(v: ButtonPillVariant) {
  return v.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '180px repeat(8, 1fr)',
  gap: '8px',
  alignItems: 'center',
  fontFamily: 'var(--ds-font-family-body)',
};

const headerCellStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 500,
  color: 'var(--ds-color-text-tertiary)',
  textTransform: 'uppercase',
  letterSpacing: '0.65px',
  textAlign: 'center',
};

const labelCellStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--ds-color-text-secondary)',
};

export const AllVariants: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {VARIANT_GROUPS.map((group) => (
        <section key={group.label}>
          <h2 style={{
            fontFamily: 'var(--ds-font-family-body)',
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '16px',
            color: 'var(--ds-color-text-primary)',
          }}>
            {group.label}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Header row */}
            <div style={gridStyle}>
              <span />
              {SIZES.map((s) => (
                <span key={s} style={headerCellStyle}>{s}</span>
              ))}
              <span style={headerCellStyle}>disabled</span>
              <span style={headerCellStyle}>loading</span>
              <span style={headerCellStyle}>leading</span>
              <span style={headerCellStyle}>trailing</span>
            </div>

            {group.variants.map((variant) => (
              <div key={variant} style={gridStyle}>
                <span style={labelCellStyle}>{variantLabel(variant)}</span>
                {SIZES.map((size) => (
                  <div key={size} style={{ display: 'flex', justifyContent: 'center' }}>
                    <ButtonPill variant={variant} size={size}>Label</ButtonPill>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ButtonPill variant={variant} size="md" disabled>Label</ButtonPill>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ButtonPill variant={variant} size="md" loading>Label</ButtonPill>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ButtonPill variant={variant} size="md" leadingIcon={<StarIcon />}>Label</ButtonPill>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ButtonPill variant={variant} size="md" trailingIcon={<ArrowIcon />}>Label</ButtonPill>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

// ─── Per-variant stories (autodocs) ──────────────────────────────────────────

export const Primary: Story              = { args: { variant: 'primary' } };
export const Secondary: Story            = { args: { variant: 'secondary' } };
export const Tertiary: Story             = { args: { variant: 'tertiary' } };
export const MonoPrimary: Story          = { args: { variant: 'mono-primary' } };
export const MonoSecondary: Story        = { args: { variant: 'mono-secondary' } };
export const MonoTertiary: Story         = { args: { variant: 'mono-tertiary' } };
export const Destructive: Story          = { args: { variant: 'destructive' } };
export const DestructiveSecondary: Story = { args: { variant: 'destructive-secondary' } };
export const DestructiveTertiary: Story  = { args: { variant: 'destructive-tertiary' } };
