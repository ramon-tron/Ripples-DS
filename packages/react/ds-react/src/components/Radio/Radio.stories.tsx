import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';
import type { RadioGroupOrientation } from './RadioGroup';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A radio button lets users select exactly one option from a set. Selecting a new option automatically deselects the previous one.

Use the \`Radio\` component for a single item, or \`RadioGroup\` to manage a set of mutually exclusive options with a shared \`name\`, controlled value, and optional orientation.

**Usage guidance**
- **Forms** — use in tiles, modals, side panels, and full-page forms
- **Settings** — change a single active setting from a list of options
- **Filtering** — select one filter category at a time

**When to use something else**
- Use **Checkbox** when users can select more than one option.
- Use a **Select / Dropdown** when there are more than ~6 options, or when space is tight.
- Use a **Toggle** when the action takes effect immediately without a form submit.
        `.trim(),
      },
    },
  },
  argTypes: {
    defaultChecked: { control: 'boolean' },
    disabled:       { control: 'boolean' },
    label:          { control: 'text' },
  },
  args: {
    name:           'playground',
    defaultChecked: false,
    disabled:       false,
    label:          'Option',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Individual states ───────────────────────────────────────────────────────

export const Unchecked: Story = {
  args: { defaultChecked: false, label: 'Unchecked' },
};

export const Checked: Story = {
  args: { defaultChecked: true, label: 'Checked' },
};

export const DisabledUnchecked: Story = {
  args: { disabled: true, defaultChecked: false, label: 'Disabled' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, label: 'Disabled checked' },
};

// ─── All states grid ─────────────────────────────────────────────────────────

const COLS = '100px repeat(2, 120px)';

const gridHeaderStyle: React.CSSProperties = {
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
};

export const AllStates: Story = {
  name: 'All States',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', rowGap: 20 }}>
      {/* Header */}
      <span />
      <span style={gridHeaderStyle}>Unchecked</span>
      <span style={gridHeaderStyle}>Checked</span>

      {/* Default */}
      <span style={rowLabelStyle}>Default</span>
      <div style={cellStyle}><Radio name="states-default" aria-label="unchecked" /></div>
      <div style={cellStyle}><Radio name="states-default" aria-label="checked" defaultChecked /></div>

      {/* Disabled */}
      <span style={rowLabelStyle}>Disabled</span>
      <div style={cellStyle}><Radio name="states-disabled" aria-label="disabled unchecked" disabled /></div>
      <div style={cellStyle}><Radio name="states-disabled" aria-label="disabled checked" disabled defaultChecked /></div>
    </div>
  ),
};

// ─── RadioGroup stories ───────────────────────────────────────────────────────

const PLAN_ITEMS = [
  { value: 'starter',      label: 'Starter — Free' },
  { value: 'pro',          label: 'Pro — $12 / month' },
  { value: 'enterprise',   label: 'Enterprise — Contact us' },
];

const NOTIFY_ITEMS = [
  { value: 'all',       label: 'All activity' },
  { value: 'mentions',  label: 'Mentions only' },
  { value: 'none',      label: 'None' },
];

export const Vertical: Story = {
  name: 'RadioGroup — Vertical',
  parameters: {
    docs: {
      description: {
        story: 'Default orientation. Use when options have longer labels or when stacking reads more clearly.',
      },
    },
  },
  render: () => (
    <RadioGroup
      name="vertical-example"
      defaultValue="pro"
      items={PLAN_ITEMS}
    />
  ),
};

export const Horizontal: Story = {
  name: 'RadioGroup — Horizontal',
  parameters: {
    docs: {
      description: {
        story: 'Use for short labels when horizontal space is available.',
      },
    },
  },
  render: () => (
    <RadioGroup
      name="horizontal-example"
      orientation="horizontal"
      defaultValue="mentions"
      items={NOTIFY_ITEMS}
    />
  ),
};

export const GroupDisabled: Story = {
  name: 'RadioGroup — Disabled',
  render: () => (
    <RadioGroup
      name="disabled-example"
      defaultValue="pro"
      disabled
      items={PLAN_ITEMS}
    />
  ),
};

export const GroupMixedDisabled: Story = {
  name: 'RadioGroup — Mixed Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Individual items can be disabled while the rest of the group remains interactive.',
      },
    },
  },
  render: () => (
    <RadioGroup
      name="mixed-example"
      defaultValue="starter"
      items={[
        { value: 'starter',    label: 'Starter — Free' },
        { value: 'pro',        label: 'Pro — $12 / month' },
        { value: 'enterprise', label: 'Enterprise — Contact us', disabled: true },
      ]}
    />
  ),
};

// ─── Form examples ────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: 24,
  borderRadius: 12,
  border: '1px solid var(--ds-color-border-subtle)',
  minWidth: 280,
};

const fieldLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--ds-font-family-body)',
  fontWeight: 600,
  fontSize: 14,
  color: 'var(--ds-color-text-primary)',
};

export const SettingsForm: Story = {
  name: 'Settings Form',
  parameters: {
    docs: {
      description: {
        story: 'Typical settings usage: one option selected at a time within a labelled group.',
      },
    },
  },
  render: () => {
    const [notify, setNotify] = useState('mentions');
    const [theme, setTheme] = useState('system');

    return (
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div style={cardStyle}>
          <span style={fieldLabelStyle}>Notifications</span>
          <RadioGroup
            name="notify"
            value={notify}
            onChange={setNotify}
            items={[
              { value: 'all',      label: 'All activity' },
              { value: 'mentions', label: 'Mentions only' },
              { value: 'none',     label: 'None' },
            ]}
          />
        </div>
        <div style={cardStyle}>
          <span style={fieldLabelStyle}>Theme</span>
          <RadioGroup
            name="theme"
            value={theme}
            onChange={setTheme}
            items={[
              { value: 'light',  label: 'Light' },
              { value: 'dark',   label: 'Dark' },
              { value: 'system', label: 'System default' },
            ]}
          />
        </div>
      </div>
    );
  },
};

export const PaymentMethod: Story = {
  name: 'Payment Method',
  parameters: {
    docs: {
      description: {
        story: 'Horizontal orientation works well for short, comparable options.',
      },
    },
  },
  render: () => {
    const [method, setMethod] = useState('card');
    return (
      <div style={cardStyle}>
        <span style={fieldLabelStyle}>Payment method</span>
        <RadioGroup
          name="payment"
          orientation="horizontal"
          value={method}
          onChange={setMethod}
          items={[
            { value: 'card',   label: 'Card' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'crypto', label: 'Crypto' },
          ]}
        />
      </div>
    );
  },
};
