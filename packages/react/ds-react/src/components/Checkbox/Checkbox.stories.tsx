import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A checkbox lets users select one or more independent options from a set. Unlike radio buttons, each checkbox operates independently — selecting one does not affect others.

**States**
- **Unchecked** — default, nothing selected
- **Checked** — option is selected
- **Indeterminate** — used on parent checkboxes when some (but not all) children are selected; set via the \`indeterminate\` prop
- **Disabled** — non-interactive; available in all three visual states

**Usage guidance**
- **Forms** — use in full-page forms, modals, or side panels
- **Filtering & batch actions** — use in data tables for row selection or in menus for multi-select filters
- **Terms & conditions** — a single checkbox to confirm acceptance
- **Parent / child lists** — a parent checkbox can select all children; partial child selection shows the parent as indeterminate

**When to use something else**
- Use **radio buttons** when only one option can be selected at a time.
- Use a **toggle/switch** when the action takes effect immediately (without a submit step).
        `.trim(),
      },
    },
  },
  argTypes: {
    defaultChecked: { control: 'boolean' },
    indeterminate:  { control: 'boolean' },
    disabled:       { control: 'boolean' },
    label:          { control: 'text' },
  },
  args: {
    defaultChecked: false,
    indeterminate:  false,
    disabled:       false,
    label:          'Label',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── States ──────────────────────────────────────────────────────────────────

export const Unchecked: Story = {
  args: { defaultChecked: false, label: 'Unchecked' },
};

export const Checked: Story = {
  args: { defaultChecked: true, label: 'Checked' },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Indeterminate' },
  parameters: {
    docs: {
      description: {
        story: 'The indeterminate state is used on a parent checkbox when some — but not all — of its children are selected.',
      },
    },
  },
};

export const DisabledUnchecked: Story = {
  args: { disabled: true, defaultChecked: false, label: 'Disabled' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, label: 'Disabled checked' },
};

export const DisabledIndeterminate: Story = {
  args: { disabled: true, indeterminate: true, label: 'Disabled indeterminate' },
};

// ─── Without label ───────────────────────────────────────────────────────────

export const NoLabel: Story = {
  args: { label: undefined, 'aria-label': 'Select item' },
  parameters: {
    docs: {
      description: {
        story: 'When no `label` prop is provided, supply an `aria-label` or `aria-labelledby` for screen reader accessibility.',
      },
    },
  },
};

// ─── All states grid ─────────────────────────────────────────────────────────

const COLS = '100px repeat(3, 120px)';

const gridHeaderStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: 'var(--ds-color-text-tertiary)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.65px',
  fontFamily: 'monospace',
  textAlign: 'center' as const,
};

const rowLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: 'var(--ds-color-text-tertiary)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.65px',
  fontFamily: 'monospace',
};

const cellStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};

export const AllStates: Story = {
  name: 'All States',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All state combinations across unchecked, checked, and indeterminate.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', rowGap: 20, columnGap: 0 }}>
      {/* Header row */}
      <span />
      <span style={gridHeaderStyle}>Unchecked</span>
      <span style={gridHeaderStyle}>Checked</span>
      <span style={gridHeaderStyle}>Indeterminate</span>

      {/* Default row */}
      <span style={rowLabelStyle}>Default</span>
      <div style={cellStyle}><Checkbox aria-label="unchecked" /></div>
      <div style={cellStyle}><Checkbox aria-label="checked" defaultChecked /></div>
      <div style={cellStyle}><Checkbox aria-label="indeterminate" indeterminate /></div>

      {/* Disabled row */}
      <span style={rowLabelStyle}>Disabled</span>
      <div style={cellStyle}><Checkbox aria-label="disabled unchecked" disabled /></div>
      <div style={cellStyle}><Checkbox aria-label="disabled checked" disabled defaultChecked /></div>
      <div style={cellStyle}><Checkbox aria-label="disabled indeterminate" disabled indeterminate /></div>
    </div>
  ),
};

// ─── With label ──────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: { label: 'I agree to the terms and conditions' },
};

// ─── Parent / child selection ─────────────────────────────────────────────────

export const ParentChildSelection: Story = {
  name: 'Parent / Child Selection',
  parameters: {
    docs: {
      description: {
        story: 'A parent checkbox becomes indeterminate when some — but not all — children are selected. Clicking the parent toggles all children.',
      },
    },
  },
  render: () => {
    const options = ['Option A', 'Option B', 'Option C', 'Option D'];
    const [selected, setSelected] = useState<boolean[]>([true, false, true, false]);

    const allChecked = selected.every(Boolean);
    const someChecked = selected.some(Boolean) && !allChecked;

    const toggleAll = () => {
      setSelected(selected.fill(!allChecked).slice());
    };

    const toggle = (i: number) => {
      const next = [...selected];
      next[i] = !next[i];
      setSelected(next);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={toggleAll}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 28 }}>
          {options.map((opt, i) => (
            <Checkbox
              key={opt}
              label={opt}
              checked={selected[i]}
              onChange={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    );
  },
};

// ─── Form example ────────────────────────────────────────────────────────────

export const FormExample: Story = {
  name: 'Form — Multi-select',
  parameters: {
    docs: {
      description: {
        story: 'Typical use in a form where multiple options can be selected independently.',
      },
    },
  },
  render: () => {
    const [values, setValues] = useState({ email: true, sms: false, push: true });

    const toggle = (key: keyof typeof values) =>
      setValues((v) => ({ ...v, [key]: !v[key] }));

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 24,
        borderRadius: 12,
        border: '1px solid var(--ds-color-border-subtle)',
        minWidth: 280,
      }}>
        <span style={{
          fontFamily: 'var(--ds-font-family-body)',
          fontWeight: 600,
          fontSize: 14,
          color: 'var(--ds-color-text-primary)',
        }}>
          Notification preferences
        </span>
        <Checkbox label="Email notifications"  checked={values.email} onChange={() => toggle('email')} />
        <Checkbox label="SMS notifications"    checked={values.sms}   onChange={() => toggle('sms')} />
        <Checkbox label="Push notifications"   checked={values.push}  onChange={() => toggle('push')} />
      </div>
    );
  },
};
