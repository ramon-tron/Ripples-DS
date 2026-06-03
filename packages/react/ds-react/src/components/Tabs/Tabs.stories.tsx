import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Tabs organize similar content together into individual sections on the same page.

---

**When to Use**
- Use Tabs to display different, unrelated content that belongs in separate sections of the same page.
- Use the icon-only variant when space is limited and icons are self-explanatory.

**When to Use Something Else**
- Use **Segmented Control** to switch between alternate views of the same content.
- Use **Hyperlinks** to navigate to a different page.

---

**Variants**
- **Underlined** — a text row with a 2px brand-color underline on the active tab. Takes up less visual space. Can be used more than once per page to organize content more narrowly — think of these as sub-headlines.
- **Segmented** — a pill-shaped container where the active tab gets a white background and shadow. Use for top-level, more general page organization. Should be used only once per page — think of these as headlines.

**Sizes**
- **XS** — 10px label, compact padding
- **Small** — 14px label
- **Medium** — 16px label

**Tab options**
- Text only
- Text + leading icon
- Icon only (provide \`ariaLabel\` for accessibility)
- Optional \`badge\` count displayed alongside the label
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['underlined', 'segmented'] },
    size:    { control: 'select', options: ['xs', 'sm', 'medium'] },
  },
  args: {
    variant: 'underlined',
    size: 'medium',
    'aria-label': 'Page sections',
    items: [
      { value: 'overview',  label: 'Overview' },
      { value: 'activity',  label: 'Activity' },
      { value: 'settings',  label: 'Settings' },
      { value: 'members',   label: 'Members' },
    ],
    defaultValue: 'overview',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  name: 'Underlined vs Segmented',
  parameters: { controls: { disable: true } },
  render: () => {
    const items = [
      { value: 'overview', label: 'Overview' },
      { value: 'activity', label: 'Activity' },
      { value: 'settings', label: 'Settings' },
      { value: 'members',  label: 'Members' },
    ];
    const [val1, setVal1] = useState('overview');
    const [val2, setVal2] = useState('overview');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 500 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Underlined</span>
          <Tabs aria-label="Sections" items={items} value={val1} onChange={setVal1} variant="underlined" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Segmented</span>
          <Tabs aria-label="Sections" items={items} value={val2} onChange={setVal2} variant="segmented" />
        </div>
      </div>
    );
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => {
    const items = [
      { value: 'list',  label: 'List' },
      { value: 'board', label: 'Board' },
      { value: 'gantt', label: 'Gantt' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 400 }}>
        {(['underlined', 'segmented'] as const).map(variant => (
          <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)', textTransform: 'capitalize' }}>{variant}</span>
            {(['xs', 'sm', 'medium'] as const).map(size => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>
                  {size === 'xs' ? 'XS' : size === 'sm' ? 'Small' : 'Medium'}
                </span>
                <Tabs aria-label="View" items={items} defaultValue="list" variant={variant} size={size} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

// ─── With Icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'With Icons',
  parameters: { controls: { disable: true } },
  render: () => {
    const items = [
      { value: 'list',  label: 'List',  icon: 'format_list_bulleted' },
      { value: 'board', label: 'Board', icon: 'grid_view' },
      { value: 'gantt', label: 'Gantt', icon: 'view_timeline' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Underlined</span>
          <Tabs aria-label="View" items={items} defaultValue="list" variant="underlined" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Segmented</span>
          <Tabs aria-label="View" items={items} defaultValue="list" variant="segmented" />
        </div>
      </div>
    );
  },
};

// ─── Icon Only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  name: 'Icon Only',
  parameters: { controls: { disable: true } },
  render: () => {
    const items = [
      { value: 'list',    icon: 'format_list_bulleted', ariaLabel: 'List' },
      { value: 'board',   icon: 'grid_view',            ariaLabel: 'Board' },
      { value: 'timeline',icon: 'view_timeline',        ariaLabel: 'Timeline' },
      { value: 'calendar',icon: 'calendar_month',       ariaLabel: 'Calendar' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 300 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Underlined</span>
          <Tabs aria-label="View" items={items} defaultValue="list" variant="underlined" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Segmented</span>
          <Tabs aria-label="View" items={items} defaultValue="list" variant="segmented" />
        </div>
      </div>
    );
  },
};

// ─── With Badges ──────────────────────────────────────────────────────────────

export const WithBadges: Story = {
  name: 'With Badges',
  parameters: { controls: { disable: true } },
  render: () => {
    const items = [
      { value: 'inbox',    label: 'Inbox',    badge: 12 },
      { value: 'sent',     label: 'Sent',     badge: 3 },
      { value: 'drafts',   label: 'Drafts',   badge: 1 },
      { value: 'archived', label: 'Archived' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 450 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Underlined</span>
          <Tabs aria-label="Mail" items={items} defaultValue="inbox" variant="underlined" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Segmented</span>
          <Tabs aria-label="Mail" items={items} defaultValue="inbox" variant="segmented" />
        </div>
      </div>
    );
  },
};

// ─── Disabled Tabs ────────────────────────────────────────────────────────────

export const DisabledTabs: Story = {
  name: 'Disabled Tabs',
  parameters: { controls: { disable: true } },
  render: () => {
    const items = [
      { value: 'overview',  label: 'Overview' },
      { value: 'analytics', label: 'Analytics', disabled: true },
      { value: 'reports',   label: 'Reports',   disabled: true },
      { value: 'settings',  label: 'Settings' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 450 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Underlined</span>
          <Tabs aria-label="Sections" items={items} defaultValue="overview" variant="underlined" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Segmented</span>
          <Tabs aria-label="Sections" items={items} defaultValue="overview" variant="segmented" />
        </div>
      </div>
    );
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const textItems = [
      { value: 'a', label: 'Overview' },
      { value: 'b', label: 'Activity' },
      { value: 'c', label: 'Settings' },
    ];
    const iconItems = [
      { value: 'a', label: 'List',  icon: 'format_list_bulleted' },
      { value: 'b', label: 'Board', icon: 'grid_view' },
      { value: 'c', label: 'Gantt', icon: 'view_timeline' },
    ];
    const badgeItems = [
      { value: 'a', label: 'Inbox',  badge: 5 },
      { value: 'b', label: 'Sent' },
      { value: 'c', label: 'Drafts', badge: 1 },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, width: 600 }}>
        {(['underlined', 'segmented'] as const).map(variant => (
          <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)', textTransform: 'capitalize' }}>
              {variant}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(['xs', 'sm', 'medium'] as const).map(size => (
                <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>
                    {size === 'xs' ? 'XS' : size === 'sm' ? 'Small' : 'Medium'} — Text
                  </span>
                  <Tabs aria-label="Demo" items={textItems} defaultValue="a" variant={variant} size={size} />
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Medium — Icon + Text</span>
                <Tabs aria-label="Demo" items={iconItems} defaultValue="a" variant={variant} size="medium" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Medium — With Badges</span>
                <Tabs aria-label="Demo" items={badgeItems} defaultValue="a" variant={variant} size="medium" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
