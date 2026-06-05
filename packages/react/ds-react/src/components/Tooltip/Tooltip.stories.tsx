import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Tooltip } from './Tooltip';
import type { TooltipArrow } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A means of displaying a description or extra information about an element, usually on hover, but can also be on click or tap.

---

**When to Use**
- Show names of controls (like icon buttons) that lack visible labels.
- Provide additional information for focusable elements, helping users make informed decisions.
- Offer more context or explanation for specific elements.
- Define a term or provide details for an inline item (definition tooltip).

**When to Use Something Else**
- If the tooltip would include critical information a user must see to complete their task, use helper text that's always visible instead.

---

**Variants**
- **Simple** — title only; shrinks to fit content. Used for short labels.
- **Full** — title + supporting text body, with optional icon, close button, and action link.

**Arrow positions**
Arrows indicate which element the tooltip refers to. Nine options: \`none\`, \`top-left\`, \`top-center\`, \`top-right\`, \`bottom-left\`, \`bottom-center\`, \`bottom-right\`, \`left\`, \`right\`.

**Title colors**
\`default\` · \`brand\` · \`alert\` · \`error\` · \`success\`

**Theming**
The tooltip always contrasts with its background: \`fill-inverse\` is dark (#242424) in light mode and light (#fcfcfc) in dark mode. No \`mode\` prop is needed — apply \`data-theme="dark"\` to an ancestor element and the tooltip adapts automatically.
        `.trim(),
      },
    },
  },
  argTypes: {
    arrow:      { control: 'select', options: ['none','top-left','top-center','top-right','bottom-left','bottom-center','bottom-right','left','right'] },
    titleColor: { control: 'select', options: ['default','brand','alert','error','success'] },
    showClose:  { control: 'boolean' },
    icon:       { control: 'text' },
    content:    { control: 'text' },
  },
  args: {
    title: 'Tooltip Title',
    titleColor: 'default',
    arrow: 'none',
    showClose: false,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    title: 'Tooltip Title',
    content: 'Pulse Labs provides rich and contextual insights on how humans engage with technology to drive your business forward.',
    showClose: true,
    icon: 'info',
    arrow: 'bottom-center',
  },
};

// ─── Simple vs Full ───────────────────────────────────────────────────────────

export const SimpleVsFull: Story = {
  name: 'Simple vs Full',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Simple — title only</span>
        <Tooltip title="Archive item" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Full — with supporting text</span>
        <Tooltip
          title="Tooltip Title"
          content="Pulse Labs provides rich and contextual insights on how humans engage with technology to drive your business forward. These insights are rapid, powerful, contextual and easy to access across your organization."
          showClose
          icon="info"
          arrow="bottom-center"
        />
      </div>
    </div>
  ),
};

// ─── Arrow Positions ──────────────────────────────────────────────────────────

export const ArrowPositions: Story = {
  name: 'Arrow Positions',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const positions: { label: string; arrow: TooltipArrow }[] = [
      { label: 'top-left',      arrow: 'top-left' },
      { label: 'top-center',    arrow: 'top-center' },
      { label: 'top-right',     arrow: 'top-right' },
      { label: 'bottom-left',   arrow: 'bottom-left' },
      { label: 'bottom-center', arrow: 'bottom-center' },
      { label: 'bottom-right',  arrow: 'bottom-right' },
      { label: 'left',          arrow: 'left' },
      { label: 'none',          arrow: 'none' },
      { label: 'right',         arrow: 'right' },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, padding: 16 }}>
        {positions.map(({ label, arrow }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>{label}</span>
            <Tooltip title="Tooltip Title" arrow={arrow} />
          </div>
        ))}
      </div>
    );
  },
};

// ─── Title Colors ─────────────────────────────────────────────────────────────

export const TitleColors: Story = {
  name: 'Title Colors',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Light mode</span>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {(['default', 'brand', 'alert', 'error', 'success'] as const).map(color => (
            <Tooltip key={color} title={`${color.charAt(0).toUpperCase() + color.slice(1)} Title`} titleColor={color} />
          ))}
        </div>
      </div>
      <div data-theme="dark" style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 20, borderRadius: 12, background: 'var(--ds-color-surface-l1)' }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Dark mode</span>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {(['default', 'brand', 'alert', 'error', 'success'] as const).map(color => (
            <Tooltip key={color} title={`${color.charAt(0).toUpperCase() + color.slice(1)} Title`} titleColor={color} />
          ))}
        </div>
      </div>
    </div>
  ),
};

// ─── Light and Dark ───────────────────────────────────────────────────────────

export const LightAndDark: Story = {
  name: 'Light and Dark',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const tooltip = (
      <Tooltip
        title="Tooltip Title"
        content="Pulse Labs provides rich and contextual insights on how humans engage with technology to drive your business forward."
        showClose
        icon="info"
        arrow="bottom-center"
      />
    );
    return (
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 32, borderRadius: 12, background: 'var(--ds-color-surface-l1)', border: '1px solid var(--ds-color-border-subtle)' }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Light mode</span>
          {tooltip}
        </div>
        <div data-theme="dark" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 32, borderRadius: 12, background: 'var(--ds-color-surface-l1)' }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Dark mode</span>
          {tooltip}
        </div>
      </div>
    );
  },
};

// ─── With All Features ────────────────────────────────────────────────────────

export const WithAllFeatures: Story = {
  name: 'With All Features',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Title + body</span>
        <Tooltip
          title="Tooltip Title"
          content="Pulse Labs provides rich and contextual insights on how humans engage with technology to drive your business forward."
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>With icon</span>
        <Tooltip
          title="Tooltip Title"
          content="Pulse Labs provides rich and contextual insights on how humans engage with technology to drive your business forward."
          icon="info"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>With close</span>
        <Tooltip
          title="Tooltip Title"
          content="Pulse Labs provides rich and contextual insights on how humans engage with technology to drive your business forward."
          showClose
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>All features</span>
        <Tooltip
          title="Tooltip Title"
          content="Pulse Labs provides rich and contextual insights on how humans engage with technology to drive your business forward."
          icon="info"
          showClose
          arrow="bottom-center"
        />
      </div>
    </div>
  ),
};
