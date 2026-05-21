import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { ButtonPillGroup } from './ButtonPillGroup';
import type { ButtonPillGroupType, ButtonPillGroupSize } from './ButtonPillGroup';

const meta = {
  title: 'Components/ButtonPillGroup',
  component: ButtonPillGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A row of 2–6 pill buttons where exactly one is active at a time. The active pill uses the filled variant; the rest use the subtle variant. Use it any time users need to choose a single option from a small set — most commonly for sorting and filtering.

**Types**
- **Brand** — active pill uses brand fill; inactive pills use brand-subtle fill. Use on standard light surfaces.
- **Mono** — active pill uses dark fill; inactive pills use neutral fill. Use when the brand color would compete with surrounding content.

**Sizes**: \`md\` (32 px) and \`sm\` (24 px).

**Selection model** — Uncontrolled by default (\`defaultActiveIndex\`). Pass \`activeIndex\` + \`onChange\` for controlled usage.

**When to use something else**
- Use **ButtonGroup** when you have exactly two buttons that represent a paired decision (e.g. Confirm / Cancel).
- Use a **Select** or **Dropdown** if there are more than 6 options or if labels are long.
        `.trim(),
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['brand', 'mono'] satisfies ButtonPillGroupType[],
    },
    size: {
      control: 'radio',
      options: ['md', 'sm'] satisfies ButtonPillGroupSize[],
    },
  },
  args: {
    type: 'brand',
    size: 'md',
    defaultActiveIndex: 0,
    items: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
    ],
  },
} satisfies Meta<typeof ButtonPillGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Types ───────────────────────────────────────────────────────────────────

export const Brand: Story = { args: { type: 'brand' } };
export const Mono:  Story = { args: { type: 'mono' } };

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Medium: Story = { args: { size: 'md' } };
export const Small:  Story = { args: { size: 'sm' } };

// ─── Item counts ─────────────────────────────────────────────────────────────

export const TwoItems: Story = {
  args: {
    items: [{ label: 'Option 1' }, { label: 'Option 2' }],
  },
};

export const SixItems: Story = {
  args: {
    items: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
      { label: 'Option 5' },
      { label: 'Option 6' },
    ],
  },
};

// ─── Sort By examples ────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  padding: '24px',
  background: 'var(--ds-color-surface-l1)',
  borderRadius: '12px',
  border: '1px solid var(--ds-color-border-subtle)',
  display: 'inline-flex',
  flexDirection: 'column',
  gap: '12px',
  minWidth: '360px',
};

const sortLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--ds-font-family-body)',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--ds-color-text-secondary)',
};

export const SortByBrand: Story = {
  name: 'Sort By — Brand',
  parameters: {
    docs: {
      description: {
        story: 'Typical usage: a "Sort By" label above a brand ButtonPillGroup. The active selection is highlighted in brand color.',
      },
    },
  },
  render: () => {
    const [active, setActive] = React.useState(0);
    return (
      <div style={cardStyle}>
        <span style={sortLabelStyle}>Sort By</span>
        <ButtonPillGroup
          type="brand"
          size="md"
          items={[
            { label: 'Most Recent' },
            { label: 'Oldest' },
            { label: 'A–Z' },
            { label: 'Z–A' },
          ]}
          activeIndex={active}
          onChange={setActive}
        />
      </div>
    );
  },
};

export const SortByMono: Story = {
  name: 'Sort By — Mono',
  parameters: {
    docs: {
      description: {
        story: 'Same sort pattern using the mono type — useful on surfaces where brand color would be distracting.',
      },
    },
  },
  render: () => {
    const [active, setActive] = React.useState(0);
    return (
      <div style={cardStyle}>
        <span style={sortLabelStyle}>Sort By</span>
        <ButtonPillGroup
          type="mono"
          size="md"
          items={[
            { label: 'Most Recent' },
            { label: 'Oldest' },
            { label: 'A–Z' },
            { label: 'Z–A' },
          ]}
          activeIndex={active}
          onChange={setActive}
        />
      </div>
    );
  },
};

export const FilterExample: Story = {
  name: 'Filter — Small',
  parameters: {
    docs: {
      description: {
        story: 'Small size works well for compact filter bars where vertical space is limited.',
      },
    },
  },
  render: () => {
    const [active, setActive] = React.useState(0);
    return (
      <div style={cardStyle}>
        <span style={sortLabelStyle}>Filter By Status</span>
        <ButtonPillGroup
          type="brand"
          size="sm"
          items={[
            { label: 'All' },
            { label: 'Active' },
            { label: 'Pending' },
            { label: 'Completed' },
            { label: 'Archived' },
          ]}
          activeIndex={active}
          onChange={setActive}
        />
      </div>
    );
  },
};

// ─── All types & sizes grid ───────────────────────────────────────────────────

export const AllVariants: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  render: () => {
    const ITEMS = [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
    ];

    const rows: { type: ButtonPillGroupType; size: ButtonPillGroupSize }[] = [
      { type: 'brand', size: 'md' },
      { type: 'brand', size: 'sm' },
      { type: 'mono',  size: 'md' },
      { type: 'mono',  size: 'sm' },
    ];

    const labelStyle: React.CSSProperties = {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--ds-color-text-tertiary)',
      textTransform: 'uppercase',
      letterSpacing: '0.65px',
      fontFamily: 'monospace',
      width: 120,
      flexShrink: 0,
    };

    return (
      <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {rows.map(({ type, size }) => {
          const [active, setActive] = useState(0);
          return (
            <div key={`${type}-${size}`} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={labelStyle}>{type} / {size}</span>
              <ButtonPillGroup
                type={type}
                size={size}
                items={ITEMS}
                activeIndex={active}
                onChange={setActive}
              />
            </div>
          );
        })}
      </div>
    );
  },
};
