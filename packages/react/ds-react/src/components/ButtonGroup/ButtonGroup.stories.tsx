import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';
import { ButtonGroup } from './ButtonGroup';
import type { ButtonGroupOrientation } from './ButtonGroup';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A wrapper for exactly two related buttons, arranged either side-by-side or stacked. Use it any time a view presents a paired decision — a primary action alongside a way to back out.

**Orientations**
- **Horizontal** — buttons sit side-by-side with equal width. Use in dialog boxes, confirmation prompts, and form footers where there is sufficient horizontal space.
- **Vertical** — buttons stack full-width. Use when horizontal space is limited, such as on bottom sheets and mobile slide-over cards.

Each button's variant, label, icon, size, disabled, and loading states are configured independently via the \`button1\` and \`button2\` props.

**When to use something else**
- Use **ButtonPill Group** (or a row of ButtonPills) if you need to group more than two buttons, e.g. a set of filters.
- Use a single **Button** when there is only one available action.
        `.trim(),
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'] satisfies ButtonGroupOrientation[],
    },
  },
  args: {
    orientation: 'horizontal',
    button1: {
      children: 'Cancel',
      variant: 'tertiary',
      size: 'xl',
      onClick: fn(),
    },
    button2: {
      children: 'Confirm',
      variant: 'primary',
      size: 'xl',
      onClick: fn(),
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Orientations ────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  parameters: {
    docs: {
      description: {
        story: 'Use in dialog boxes and form footers where horizontal space is available.',
      },
    },
  },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [
    (Story) => React.createElement('div', { style: { width: 320 } }, React.createElement(Story)),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Use on bottom sheets and mobile slide-over cards where horizontal space is limited.',
      },
    },
  },
};

// ─── Common pairings ─────────────────────────────────────────────────────────

export const ConfirmCancel: Story = {
  args: {
    button1: { children: 'Cancel',  variant: 'tertiary', size: 'xl', onClick: fn() },
    button2: { children: 'Confirm', variant: 'primary',   size: 'xl', onClick: fn() },
  },
};

export const DeleteCancel: Story = {
  args: {
    button1: { children: 'Cancel', variant: 'tertiary',  size: 'xl', onClick: fn() },
    button2: { children: 'Delete', variant: 'destructive', size: 'xl', onClick: fn() },
  },
};

export const SaveDiscard: Story = {
  args: {
    button1: { children: 'Discard', variant: 'tertiary', size: 'xl', onClick: fn() },
    button2: { children: 'Save',    variant: 'primary',  size: 'xl', onClick: fn() },
  },
};

// ─── States ──────────────────────────────────────────────────────────────────

export const WithLoadingPrimary: Story = {
  args: {
    button1: { children: 'Cancel',  variant: 'tertiary', size: 'xl', onClick: fn() },
    button2: { children: 'Confirm', variant: 'primary',   size: 'xl', onClick: fn(), loading: true },
  },
};

export const BothDisabled: Story = {
  args: {
    button1: { children: 'Cancel',  variant: 'tertiary', size: 'xl', onClick: fn(), disabled: true },
    button2: { children: 'Confirm', variant: 'primary',   size: 'xl', onClick: fn(), disabled: true },
  },
};

// ─── All sizes ────────────────────────────────────────────────────────────────

const SIZES = ['sm', 'md', 'lg', 'xl'] as const;

export const AllSizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'ButtonGroup inherits whatever size is set on each button.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            width: 24,
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--ds-color-text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.65px',
            fontFamily: 'monospace',
            flexShrink: 0,
          }}>
            {size}
          </span>
          <ButtonGroup
            button1={{ children: 'Cancel',  variant: 'tertiary', size }}
            button2={{ children: 'Confirm', variant: 'primary',   size }}
          />
        </div>
      ))}
    </div>
  ),
};
