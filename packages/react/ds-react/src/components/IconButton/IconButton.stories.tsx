import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';
import { IconButton } from './IconButton';
import type { IconButtonVariant, IconButtonSize, IconButtonShape } from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary', 'secondary', 'tertiary',
        'mono-primary', 'mono-secondary', 'mono-tertiary',
        'destructive', 'destructive-secondary', 'destructive-tertiary',
        'inverse',
      ] satisfies IconButtonVariant[],
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'] satisfies IconButtonSize[],
    },
    shape: {
      control: 'radio',
      options: ['circular', 'square'] satisfies IconButtonShape[],
    },
    loading:  { control: 'boolean' },
    disabled: { control: 'boolean' },
    icon:     { control: 'text' },
  },
  args: {
    onClick: fn(),
    icon: 'star',
    'aria-label': 'Star',
    variant: 'primary',
    size: 'l',
    shape: 'circular',
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Shapes ──────────────────────────────────────────────────────────────────

export const Circular: Story = { args: { shape: 'circular' } };
export const Square: Story = { args: { shape: 'square' } };

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };

// ─── All Variants ─────────────────────────────────────────────────────────────

const VARIANT_GROUPS: { label: string; variants: IconButtonVariant[] }[] = [
  { label: 'Brand',       variants: ['primary', 'secondary', 'tertiary'] },
  { label: 'Mono',        variants: ['mono-primary', 'mono-secondary', 'mono-tertiary'] },
  { label: 'Destructive', variants: ['destructive', 'destructive-secondary', 'destructive-tertiary'] },
  { label: 'Inverse',     variants: ['inverse'] },
];

const SIZES: IconButtonSize[] = ['xs', 's', 'm', 'l', 'xl'];

function variantLabel(v: IconButtonVariant) {
  return v.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '180px repeat(7, 1fr)',
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

function ShapeSection({ shape }: { shape: IconButtonShape }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Header */}
      <div style={gridStyle}>
        <span />
        {SIZES.map(s => (
          <span key={s} style={headerCellStyle}>{s}</span>
        ))}
        <span style={headerCellStyle}>disabled</span>
        <span style={headerCellStyle}>loading</span>
      </div>

      {VARIANT_GROUPS.map(group => (
        <React.Fragment key={group.label}>
          {/* Group label row */}
          <div style={{ paddingTop: '12px', paddingBottom: '4px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ds-color-text-tertiary)',
              fontFamily: 'monospace',
            }}>
              {group.label}
            </span>
          </div>

          {(() => {
            const rows = group.variants.map(variant => (
              <div key={variant} style={gridStyle}>
                <span style={{ ...labelCellStyle, color: group.label === 'Inverse' ? 'rgba(255,255,255,0.55)' : labelCellStyle.color }}>{variantLabel(variant)}</span>
                {SIZES.map(size => (
                  <div key={size} style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton icon="star" variant={variant} size={size} shape={shape} aria-label={`${variant} star`} />
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton icon="star" variant={variant} size="l" shape={shape} disabled aria-label={`${variant} disabled`} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton icon="star" variant={variant} size="l" shape={shape} loading aria-label={`${variant} loading`} />
                </div>
              </div>
            ));
            return group.label === 'Inverse' ? (
              <div style={{ background: 'var(--ds-color-fill-inverse)', borderRadius: '12px', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {rows}
              </div>
            ) : rows;
          })()}
        </React.Fragment>
      ))}
    </div>
  );
}

export const AllVariants: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '56px' }}>
      {(['circular', 'square'] as IconButtonShape[]).map(shape => (
        <section key={shape}>
          <h2 style={{
            fontFamily: 'var(--ds-font-family-body)',
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '16px',
            color: 'var(--ds-color-text-primary)',
            textTransform: 'capitalize',
          }}>
            {shape}
          </h2>
          <ShapeSection shape={shape} />
        </section>
      ))}
    </div>
  ),
};

// ─── Per-variant stories (autodocs) ──────────────────────────────────────────

export const Primary: Story            = { args: { variant: 'primary' } };
export const Secondary: Story          = { args: { variant: 'secondary' } };
export const Tertiary: Story           = { args: { variant: 'tertiary' } };
export const MonoPrimary: Story        = { args: { variant: 'mono-primary' } };
export const MonoSecondary: Story      = { args: { variant: 'mono-secondary' } };
export const MonoTertiary: Story       = { args: { variant: 'mono-tertiary' } };
export const Destructive: Story        = { args: { variant: 'destructive' } };
export const DestructiveSecondary: Story = { args: { variant: 'destructive-secondary' } };
export const DestructiveTertiary: Story  = { args: { variant: 'destructive-tertiary' } };
export const Inverse: Story = {
  args: { variant: 'inverse' },
  decorators: [
    (Story) => React.createElement('div', {
      style: { background: 'var(--ds-color-fill-inverse)', borderRadius: '12px', padding: '24px', display: 'inline-flex' },
    }, React.createElement(Story)),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Use the Inverse variant on dark or high-contrast surfaces such as tooltips and banners.',
      },
    },
  },
};
