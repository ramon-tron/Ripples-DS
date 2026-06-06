import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Toast, ToastProvider, useToast } from './Toast';
import type { ToastType } from './Toast';
import { Button } from '../Button/Button';
import { SegmentedControl } from '../SegmentedControl/SegmentedControl';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A type of alert which appears in a layer above other content, visually similar to a mobile or desktop push notification.

---

**When to Use**
- Communicate updates about the process of an application.
- Deliver lower-priority messages that do not require user action.

**When to Use Something Else**
- Use **Banners** when communicating persistent messages about system errors or alerts.
- Use **Dialogs** when the user must acknowledge or act on critical information before continuing.

---

**Types**
\`default\` · \`success\` · \`destructive\` · \`informational\` · \`alert\`

**Behavior**
- Toasts animate up from the bottom of the screen.
- Non-dismissible toasts auto-close after a minimum of 10 seconds.
- Dismissible toasts (with a close button) persist until manually closed.

**Usage**

Wrap your app (or the relevant subtree) in \`<ToastProvider>\`, then call \`useToast()\` to trigger toasts imperatively:

\`\`\`tsx
function App() {
  return (
    <ToastProvider>
      <MyApp />
    </ToastProvider>
  );
}

function MyApp() {
  const { addToast } = useToast();
  return (
    <button onClick={() => addToast({ title: 'Saved!', type: 'success', dismissible: false })}>
      Save
    </button>
  );
}
\`\`\`
        `.trim(),
      },
    },
  },
  argTypes: {
    type:        { control: 'select', options: ['default', 'success', 'destructive', 'informational', 'alert'] },
    dismissible: { control: 'boolean' },
    title:       { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    title: 'Feedback Submitted!',
    description: 'Continue submitting or stop recording.',
    type: 'success',
    dismissible: true,
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: { controls: { disable: true } },
  render: () => {
    const variants: { label: string; type: ToastType }[] = [
      { label: 'Success',       type: 'success' },
      { label: 'Destructive',   type: 'destructive' },
      { label: 'Informational', type: 'informational' },
      { label: 'Alert',         type: 'alert' },
      { label: 'Default',       type: 'default' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {variants.map(({ label, type }) => (
          <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>{label}</span>
            <Toast
              title="Feedback Submitted!"
              description="Continue submitting or stop recording."
              type={type}
              dismissible={type !== 'default'}
            />
          </div>
        ))}
      </div>
    );
  },
};

// ─── Dismissible vs Auto-dismiss ──────────────────────────────────────────────

export const DismissibleVsAuto: Story = {
  name: 'Dismissible vs Auto-dismiss',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>
          dismissible=true — persists until closed
        </span>
        <Toast title="Feedback Submitted!" description="Close the toast using the × button." type="success" dismissible />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>
          dismissible=false — auto-closes after 10s (no close button)
        </span>
        <Toast title="Feedback Submitted!" description="This toast will auto-close after 10 seconds." type="success" dismissible={false} />
      </div>
    </div>
  ),
};

// ─── Live Demo ────────────────────────────────────────────────────────────────

const DEMO_TOASTS: { label: string; type: ToastType; dismissible: boolean }[] = [
  { label: 'Success',       type: 'success',       dismissible: false },
  { label: 'Destructive',   type: 'destructive',   dismissible: true  },
  { label: 'Informational', type: 'informational', dismissible: false },
  { label: 'Alert',         type: 'alert',         dismissible: true  },
  { label: 'Default',       type: 'default',       dismissible: false },
];

function LiveDemoInner({ theme, onThemeChange }: { theme: 'light' | 'dark'; onThemeChange: (t: 'light' | 'dark') => void }) {
  const { addToast } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      <SegmentedControl
        style="framed"
        value={theme}
        onChange={v => onThemeChange(v as 'light' | 'dark')}
        aria-label="Toast theme"
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark',  label: 'Dark'  },
        ]}
      />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {DEMO_TOASTS.map(({ label, type, dismissible }) => (
          <Button
            key={type}
            variant="secondary"
            onClick={() =>
              addToast({
                title: `${label} Toast`,
                description: dismissible ? 'Close using the × button.' : 'Auto-closes after 10 seconds.',
                type,
                dismissible,
              })
            }
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function LiveDemoStory() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  return (
    <ToastProvider portalTheme={theme}>
      <LiveDemoInner theme={theme} onThemeChange={setTheme} />
    </ToastProvider>
  );
}

export const LiveDemo: Story = {
  name: 'Live Demo',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => <LiveDemoStory />,
};

// ─── On Light and Dark Backgrounds ───────────────────────────────────────────

export const LightAndDark: Story = {
  name: 'Light and Dark',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const toast = (
      <Toast
        title="Feedback Submitted!"
        description="Continue submitting or stop recording."
        type="success"
        dismissible
      />
    );
    return (
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <div style={{ borderRadius: 12, background: 'var(--ds-color-fill-inverse)', border: '1px solid var(--ds-color-border-subtle)' }}>
          <div data-theme="light" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 32, borderRadius: 12 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Light mode</span>
            {toast}
          </div>
        </div>
        <div data-theme="dark" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 32, borderRadius: 12, background: 'var(--ds-color-surface-l1)' }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Dark mode</span>
          {toast}
        </div>
      </div>
    );
  },
};
