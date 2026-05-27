import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A form control that allows users to enter words, numbers, or characters.

**Sizes**
- **Default** — 48px height, ideal for standalone forms
- **Small** — 40px height, for denser layouts

**States**
- **Default** — ready to receive input
- **Focus** — blue border ring when active
- **Error** — red border, automatic error icon in trailing slot, error-coloured helper text
- **Disabled** — muted fill and text, not interactive

**Slots**
- \`leadingIcon\` — contextual icon before the input text (e.g. \`"person"\`, \`"search"\`)
- \`trailingIcon\` — contextual icon after the text; overridden by the error icon when \`error=true\`
- \`actionIcon\` — adds a secondary action button to the right with a vertical divider (e.g. \`"search"\`)

**Helper text**
- Appears below the input in secondary color normally; switches to error color when \`error=true\`
        `.trim(),
      },
    },
  },
  argTypes: {
    size:         { control: 'select', options: ['default', 'sm'] },
    type:         { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'] },
    label:        { control: 'text' },
    placeholder:  { control: 'text' },
    helperText:   { control: 'text' },
    leadingIcon:  { control: 'text' },
    trailingIcon: { control: 'text' },
    actionIcon:   { control: 'text' },
    helpIcon:     { control: 'boolean' },
    error:        { control: 'boolean' },
    disabled:     { control: 'boolean' },
  },
  args: {
    label: 'Input Label',
    placeholder: 'Single line placeholder',
    helperText: 'This text gives further instructions.',
    size: 'default',
    type: 'text',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Default (48px) and Small (40px).' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      {(['default', 'sm'] as const).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>
            {size === 'default' ? 'Default (48px)' : 'Small (40px)'}
          </span>
          <Input
            size={size}
            label="Input Label"
            placeholder="Single line placeholder"
            helperText="This text gives further instructions."
          />
        </div>
      ))}
    </div>
  ),
};

// ─── States ──────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Default, filled (uncontrolled value), error, and disabled.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Default</span>
        <Input label="Input Label" placeholder="Single line placeholder" helperText="This text gives further instructions." />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Filled</span>
        <Input label="Input Label" defaultValue="mina.chae-young@example.com" helperText="This text gives further instructions." />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Error</span>
        <Input label="Input Label" defaultValue="invalid-email" error helperText="Please enter a valid email address." />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Disabled</span>
        <Input label="Input Label" defaultValue="mina.chae-young@example.com" disabled helperText="This text gives further instructions." />
      </div>
    </div>
  ),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'With Icons',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Leading and trailing icons can be any Material Symbol. In the error state, the trailing icon is automatically replaced with the error indicator.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Leading icon</span>
        <Input label="Full name" placeholder="Jane Smith" leadingIcon="person" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Trailing icon</span>
        <Input label="Password" placeholder="Enter password" type="password" trailingIcon="visibility" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Both icons</span>
        <Input label="Email" placeholder="you@example.com" type="email" leadingIcon="mail" trailingIcon="check_circle" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Error (auto error icon)</span>
        <Input label="Email" defaultValue="not-an-email" leadingIcon="mail" error helperText="Please enter a valid email." />
      </div>
    </div>
  ),
};

// ─── With Action Button ───────────────────────────────────────────────────────

export const WithActionButton: Story = {
  name: 'With Action Button',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'An action button attached to the right side with a vertical divider, useful for search or submit patterns.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Search action</span>
        <Input placeholder="Search..." actionIcon="search" actionAriaLabel="Search" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>With leading icon + action</span>
        <Input label="Search users" placeholder="Name or email" leadingIcon="person_search" actionIcon="search" actionAriaLabel="Search" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Disabled</span>
        <Input placeholder="Search..." actionIcon="search" actionAriaLabel="Search" disabled />
      </div>
    </div>
  ),
};

// ─── Number ───────────────────────────────────────────────────────────────────

export const NumberInput: Story = {
  name: 'Number',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'When `type="number"`, a compact `[−] value [+]` stepper replaces the text field. `min`, `max`, and `step` attributes are respected.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Default</span>
        <Input label="Quantity" type="number" defaultValue={1} min={0} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>With step and helper text</span>
        <Input label="Budget" type="number" defaultValue={100} step={10} min={0} helperText="Increments by $10." />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Small</span>
        <Input label="Seats" type="number" defaultValue={5} min={1} max={99} size="sm" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Disabled</span>
        <Input label="Quantity" type="number" defaultValue={3} disabled />
      </div>
    </div>
  ),
};

// ─── Password ─────────────────────────────────────────────────────────────────

export const PasswordInput: Story = {
  name: 'Password',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'When `type="password"`, a visibility toggle button appears automatically. Clicking it reveals the text and switches the icon.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Default</span>
        <Input label="Password" placeholder="At least 8 characters" type="password" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>With value</span>
        <Input label="Password" defaultValue="hunter2" type="password" helperText="Use a mix of letters, numbers, and symbols." />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Error (toggle hidden, error icon takes priority)</span>
        <Input label="Password" defaultValue="abc" type="password" error helperText="Password must be at least 8 characters." />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Disabled</span>
        <Input label="Password" defaultValue="hunter2" type="password" disabled />
      </div>
    </div>
  ),
};

// ─── With Help Icon ───────────────────────────────────────────────────────────

export const WithHelpIcon: Story = {
  name: 'With Help Icon',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'A help icon next to the label signals that more context is available.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      <Input
        label="Monthly budget"
        helpIcon
        placeholder="0.00"
        type="number"
        helperText="Set a monthly spending limit for this account."
        leadingIcon="attach_money"
      />
      <Input
        label="API key"
        helpIcon
        placeholder="sk-..."
        type="password"
        helperText="Find your API key in the developer console."
        trailingIcon="visibility"
        disabled
      />
    </div>
  ),
};

// ─── Small Size ───────────────────────────────────────────────────────────────

export const SmallSize: Story = {
  name: 'Small Size — All States',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Small (40px) size across all states.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 400 }}>
      {[
        { label: 'Default',  props: { placeholder: 'Single line placeholder' } },
        { label: 'Filled',   props: { defaultValue: 'mina.chae-young@example.com' } },
        { label: 'Error',    props: { defaultValue: 'invalid-email', error: true, helperText: 'Please enter a valid email.' } },
        { label: 'Disabled', props: { defaultValue: 'mina.chae-young@example.com', disabled: true } },
      ].map(({ label, props }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>{label}</span>
          <Input size="sm" label="Input Label" leadingIcon="person" trailingIcon="visibility" {...props} />
        </div>
      ))}
    </div>
  ),
};

// ─── In a Form ────────────────────────────────────────────────────────────────

export const InAForm: Story = {
  name: 'In a Form',
  parameters: {
    controls: { disable: true },
    layout: 'padded',
    docs: {
      description: { story: 'Typical sign-up form demonstrating inputs in a real layout.' },
    },
  },
  render: () => (
    <form
      onSubmit={e => e.preventDefault()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: 400,
        padding: 24,
        borderRadius: 12,
        border: '1px solid var(--ds-color-border-subtle)',
        fontFamily: 'var(--ds-font-family-body)',
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ds-color-text-primary)', marginBottom: 4 }}>
        Create account
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Input label="First name" placeholder="Jane" size="sm" />
        <Input label="Last name" placeholder="Smith" size="sm" />
      </div>
      <Input
        label="Email address"
        placeholder="jane@example.com"
        type="email"
        leadingIcon="mail"
        helpIcon
        helperText="We'll never share your email."
        size="sm"
      />
      <Input
        label="Password"
        placeholder="At least 8 characters"
        type="password"
        trailingIcon="visibility"
        helperText="Use a mix of letters, numbers, and symbols."
        size="sm"
      />
      <Input
        label="Username"
        placeholder="janedoe"
        leadingIcon="alternate_email"
        defaultValue="jane!!!"
        error
        helperText="Only letters, numbers, and underscores are allowed."
        size="sm"
      />
    </form>
  ),
};
