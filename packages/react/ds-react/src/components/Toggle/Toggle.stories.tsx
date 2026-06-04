import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Toggle is a control used to quickly switch between two possible states. Toggles are only used for binary actions that occur immediately after the user "flips the switch". They are commonly used for "on/off" switches.

---

**When to Use**
- To turn a single binary option on or off that affects system or page settings.
- Ideal for settings or preferences that can be immediately applied.
- Recommended for actions where the change is reversible without additional confirmation.

**When to Use Something Else**
- Avoid toggles if the action requires confirmation before applying (e.g. deleting a file).
- Don't use toggles for more than two options — use a **Dropdown**, **Radio**, or **Checkbox** instead.
- Avoid toggles for settings that aren't binary or don't apply instantly — use a **Checkbox** paired with a **Button**.

---

**Sizes**
- **Default** — 44×24px track, 20px thumb
- **Small** — 36×20px track, 16px thumb

**States**
- **Off** — neutral gray track; thumb on the left
- **On** — green track; thumb springs to the right
- **Disabled Off** — muted gray track, no interaction
- **Disabled On** — subtle green track, no interaction
        `.trim(),
      },
    },
  },
  argTypes: {
    size:    { control: 'select', options: ['default', 'sm'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'default',
    defaultChecked: false,
    disabled: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => {
    const [defOff, setDefOff] = useState(false);
    const [defOn, setDefOn]   = useState(true);
    const [smOff, setSmOff]   = useState(false);
    const [smOn, setSmOn]     = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Default</span>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Toggle size="default" checked={defOff} onChange={setDefOff} aria-label="Default off" />
            <Toggle size="default" checked={defOn}  onChange={setDefOn}  aria-label="Default on" />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Small</span>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Toggle size="sm" checked={smOff} onChange={setSmOff} aria-label="Small off" />
            <Toggle size="sm" checked={smOn}  onChange={setSmOn}  aria-label="Small on" />
          </div>
        </div>
      </div>
    );
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => {
    const rows = [
      { label: 'Off',           checked: false, disabled: false },
      { label: 'On',            checked: true,  disabled: false },
      { label: 'Disabled Off',  checked: false, disabled: true  },
      { label: 'Disabled On',   checked: true,  disabled: true  },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 340 }}>
        {rows.map(({ label, checked, disabled }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontFamily: 'monospace', color: 'var(--ds-color-text-secondary)' }}>{label}</span>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <Toggle size="default" checked={checked} disabled={disabled} aria-label={`Default ${label}`} />
              <Toggle size="sm"      checked={checked} disabled={disabled} aria-label={`Small ${label}`} />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ─── With Label ───────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  name: 'With Label',
  parameters: { controls: { disable: true } },
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode]           = useState(false);
    const [autoSave, setAutoSave]           = useState(true);
    const [analytics, setAnalytics]         = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 320 }}>
        {[
          { id: 'notif',     label: 'Push notifications', sub: 'Receive alerts for activity',     checked: notifications, set: setNotifications },
          { id: 'dark',      label: 'Dark mode',          sub: 'Switch to a darker interface',    checked: darkMode,      set: setDarkMode      },
          { id: 'autosave',  label: 'Auto-save',          sub: 'Save changes automatically',      checked: autoSave,      set: setAutoSave      },
          { id: 'analytics', label: 'Analytics',          sub: 'Share anonymous usage data',      checked: analytics,     set: setAnalytics     },
        ].map(({ id, label, sub, checked, set }) => (
          <div
            key={id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              padding: '12px 0',
              borderBottom: '1px solid var(--ds-color-border-subtle)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <label
                htmlFor={id}
                style={{ fontSize: 14, fontWeight: 500, color: 'var(--ds-color-text-primary)', cursor: 'pointer' }}
              >
                {label}
              </label>
              <span style={{ fontSize: 12, color: 'var(--ds-color-text-secondary)' }}>{sub}</span>
            </div>
            <Toggle id={id} checked={checked} onChange={set} aria-label={label} />
          </div>
        ))}
      </div>
    );
  },
};
