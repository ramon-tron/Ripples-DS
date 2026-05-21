import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Label } from './Label';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Labels are compact status indicators used to categorize, tag, or highlight information at a glance. They use bold uppercase typography and slightly rounded corners to stand out from surrounding content without drawing too much attention.

Use the \`appearance\` prop to switch between **subtle** (default), **filled**, and **outlined** styles. Use the \`variant\` prop to convey semantic meaning via color.

**Usage guidance**
- **Status** — show the state of an item (Active, Draft, Rejected, In Review)
- **Categories** — tag content with taxonomy labels
- **Priority** — surface urgency or severity on tasks and issues

**When to use something else**
- Use a **Chip** when the user needs to dismiss or remove the label.
- Use a **Button** when the intent is to trigger an action.
- Use plain text color when a full label would be visually noisy in dense layouts.
        `.trim(),
      },
    },
  },
  argTypes: {
    variant:      { control: 'select', options: ['default', 'brand', 'success', 'error', 'alert', 'info', 'revision', 'completed', 'review'] },
    appearance:   { control: 'select', options: ['subtle', 'filled', 'outlined'] },
    size:         { control: 'select', options: ['lg', 'md', 'sm'] },
    icon:         { control: 'text' },
    iconPosition: { control: 'select', options: ['left', 'right'] },
    children:     { control: 'text' },
  },
  args: {
    variant: 'default',
    appearance: 'subtle',
    size: 'lg',
    children: 'Label',
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Appearances ─────────────────────────────────────────────────────────────

export const Subtle: Story = {
  args: { appearance: 'subtle', variant: 'success', children: 'Success' },
};

export const Filled: Story = {
  args: { appearance: 'filled', variant: 'success', children: 'Success' },
};

export const Outlined: Story = {
  args: { appearance: 'outlined', variant: 'success', children: 'Success' },
};

// ─── All Variants grid ────────────────────────────────────────────────────────

const VARIANTS = ['default', 'brand', 'success', 'error', 'alert', 'info', 'revision', 'completed', 'review'] as const;
const APPEARANCES = ['subtle', 'filled', 'outlined'] as const;
const LABELS: Record<typeof VARIANTS[number], string> = {
  default:   'Default',
  brand:     'Brand',
  success:   'Success',
  error:     'Error',
  alert:     'Alert',
  info:      'Info',
  revision:  'Revision',
  completed: 'Completed',
  review:    'Review',
};

const headerStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: 'var(--ds-color-text-tertiary)',
  textTransform: 'uppercase',
  letterSpacing: '0.65px',
  fontFamily: 'monospace',
  textAlign: 'center',
};

const rowLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: 'var(--ds-color-text-tertiary)',
  textTransform: 'uppercase',
  letterSpacing: '0.65px',
  fontFamily: 'monospace',
};

const cellStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, 110px)', alignItems: 'center', rowGap: 14, columnGap: 4 }}>
      <span />
      {APPEARANCES.map(a => <span key={a} style={headerStyle}>{a}</span>)}
      {VARIANTS.map(v => (
        <React.Fragment key={v}>
          <span style={rowLabelStyle}>{LABELS[v]}</span>
          {APPEARANCES.map(a => (
            <div key={a} style={cellStyle}>
              <Label variant={v} appearance={a} size="lg">{LABELS[v]}</Label>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  ),
};

// ─── All Sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {APPEARANCES.map(a => (
        <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={rowLabelStyle}>{a}</span>
          <Label variant="brand" appearance={a} size="lg">Large</Label>
          <Label variant="brand" appearance={a} size="md">Default</Label>
          <Label variant="brand" appearance={a} size="sm">Small</Label>
        </div>
      ))}
    </div>
  ),
};

// ─── With Icon ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'With Icon',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      <Label variant="success"   appearance="subtle"   size="lg" icon="check_circle">Approved</Label>
      <Label variant="error"     appearance="subtle"   size="lg" icon="cancel">Rejected</Label>
      <Label variant="alert"     appearance="subtle"   size="lg" icon="warning">At Risk</Label>
      <Label variant="info"      appearance="subtle"   size="lg" icon="info">In Review</Label>
      <Label variant="revision"  appearance="outlined" size="lg" icon="edit" iconPosition="right">Revise</Label>
      <Label variant="completed" appearance="filled"   size="lg" icon="done_all">Done</Label>
      <Label variant="review"    appearance="outlined" size="lg" icon="visibility">Review</Label>
    </div>
  ),
};

// ─── Status Table ─────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  padding: 20,
  borderRadius: 12,
  border: '1px solid var(--ds-color-border-subtle)',
  minWidth: 340,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  fontFamily: 'var(--ds-font-family-body)',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: 14,
  color: 'var(--ds-color-text-primary)',
};

export const StatusTable: Story = {
  name: 'Status Table',
  parameters: {
    docs: {
      description: { story: 'Typical usage: marking the state of items in a list or table.' },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={cardStyle}>
      {[
        { name: 'Homepage redesign',     variant: 'completed' as const, label: 'Completed' },
        { name: 'API rate limiting',      variant: 'review' as const,    label: 'In Review' },
        { name: 'Auth migration',         variant: 'revision' as const,  label: 'Revision' },
        { name: 'Dark mode support',      variant: 'brand' as const,     label: 'In Progress' },
        { name: 'Billing integration',    variant: 'alert' as const,     label: 'At Risk' },
        { name: 'Legacy endpoint sunset', variant: 'error' as const,     label: 'Blocked' },
      ].map(({ name, variant, label }) => (
        <div key={name} style={rowStyle}>
          <span>{name}</span>
          <Label variant={variant} appearance="subtle" size="md">{label}</Label>
        </div>
      ))}
    </div>
  ),
};
