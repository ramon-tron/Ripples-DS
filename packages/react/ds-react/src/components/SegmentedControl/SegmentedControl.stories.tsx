import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A hybrid between a button group, radio buttons, and tabs. Use to switch between alternate views of similar or related content.

**Types**
- **Text** — label with optional leading or trailing icon
- **Icon Only** — icon button per segment; uses the \`IconButton\` component internally

**Sizes**
- **Medium** — 32px tall
- **Small** — 24px tall

**Styles**
- **Framed** — bordered container with separator lines between segments
- **Frameless** — no border; each segment button is independently rounded

**Rules**
- Use one icon per button maximum (no left + right simultaneously)
- Do not mix icon buttons with text buttons within the same control
        `.trim(),
      },
    },
  },
  argTypes: {
    size:  { control: 'select', options: ['medium', 'sm'] },
    style: { control: 'select', options: ['framed', 'frameless'] },
  },
  args: {
    size: 'medium',
    style: 'framed',
    'aria-label': 'View options',
    options: [
      { value: 'day',   label: 'Day' },
      { value: 'week',  label: 'Week' },
      { value: 'month', label: 'Month' },
    ],
    defaultValue: 'day',
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Styles ───────────────────────────────────────────────────────────────────

export const Styles: Story = {
  name: 'Framed vs Frameless',
  parameters: { controls: { disable: true } },
  render: () => {
    const [val1, setVal1] = useState('week');
    const [val2, setVal2] = useState('week');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Framed</span>
          <SegmentedControl
            aria-label="Period"
            options={[
              { value: 'day',   label: 'Day' },
              { value: 'week',  label: 'Week' },
              { value: 'month', label: 'Month' },
            ]}
            value={val1}
            onChange={setVal1}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Frameless</span>
          <SegmentedControl
            style="frameless"
            aria-label="Period"
            options={[
              { value: 'day',   label: 'Day' },
              { value: 'week',  label: 'Week' },
              { value: 'month', label: 'Month' },
            ]}
            value={val2}
            onChange={setVal2}
          />
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
    const [med, setMed] = useState('list');
    const [sm, setSm] = useState('list');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Medium (32px)</span>
          <SegmentedControl
            size="medium"
            aria-label="View"
            options={[
              { value: 'list',  label: 'List' },
              { value: 'board', label: 'Board' },
              { value: 'gantt', label: 'Gantt' },
            ]}
            value={med}
            onChange={setMed}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Small (24px)</span>
          <SegmentedControl
            size="sm"
            aria-label="View"
            options={[
              { value: 'list',  label: 'List' },
              { value: 'board', label: 'Board' },
              { value: 'gantt', label: 'Gantt' },
            ]}
            value={sm}
            onChange={setSm}
          />
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
    const [framedMed, setFramedMed] = useState('edit');
    const [framedSm, setFramedSm] = useState('edit');
    const [framelessMed, setFramelessMed] = useState('edit');
    const [framelessSm, setFramelessSm] = useState('edit');
    const opts = [
      { value: 'edit',   icon: 'edit',       ariaLabel: 'Edit' },
      { value: 'copy',   icon: 'content_copy', ariaLabel: 'Copy' },
      { value: 'pin',    icon: 'push_pin',   ariaLabel: 'Pin' },
      { value: 'delete', icon: 'delete',     ariaLabel: 'Delete' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Framed / Medium</span>
            <SegmentedControl size="medium" style="framed" aria-label="Actions" options={opts} value={framedMed} onChange={setFramedMed} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Framed / Small</span>
            <SegmentedControl size="sm" style="framed" aria-label="Actions" options={opts} value={framedSm} onChange={setFramedSm} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Frameless / Medium</span>
            <SegmentedControl size="medium" style="frameless" aria-label="Actions" options={opts} value={framelessMed} onChange={setFramelessMed} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Frameless / Small</span>
            <SegmentedControl size="sm" style="frameless" aria-label="Actions" options={opts} value={framelessSm} onChange={setFramelessSm} />
          </div>
        </div>
      </div>
    );
  },
};

// ─── With Icons (text + icon) ─────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'Text + Icon',
  parameters: { controls: { disable: true } },
  render: () => {
    const [left, setLeft] = useState('list');
    const [right, setRight] = useState('list');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Icon Left</span>
          <SegmentedControl
            aria-label="Layout"
            options={[
              { value: 'list',  label: 'List',  icon: 'format_list_bulleted' },
              { value: 'board', label: 'Board', icon: 'grid_view' },
              { value: 'gantt', label: 'Gantt', icon: 'view_timeline' },
            ]}
            value={left}
            onChange={setLeft}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Icon Right</span>
          <SegmentedControl
            aria-label="Layout"
            options={[
              { value: 'list',  label: 'List',  icon: 'format_list_bulleted', iconPosition: 'right' },
              { value: 'board', label: 'Board', icon: 'grid_view',           iconPosition: 'right' },
              { value: 'gantt', label: 'Gantt', icon: 'view_timeline',       iconPosition: 'right' },
            ]}
            value={right}
            onChange={setRight}
          />
        </div>
      </div>
    );
  },
};

// ─── Many Options ─────────────────────────────────────────────────────────────

export const ManyOptions: Story = {
  name: 'Many Options (6)',
  parameters: { controls: { disable: true } },
  render: () => {
    const [val, setVal] = useState('mon');
    return (
      <SegmentedControl
        aria-label="Day of week"
        options={[
          { value: 'mon', label: 'Mon' },
          { value: 'tue', label: 'Tue' },
          { value: 'wed', label: 'Wed' },
          { value: 'thu', label: 'Thu' },
          { value: 'fri', label: 'Fri' },
          { value: 'sat', label: 'Sat' },
        ]}
        value={val}
        onChange={setVal}
      />
    );
  },
};

// ─── Disabled Options ─────────────────────────────────────────────────────────

export const DisabledOptions: Story = {
  name: 'Disabled Options',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Text — some options disabled</span>
        <SegmentedControl
          aria-label="View"
          defaultValue="list"
          options={[
            { value: 'list',     label: 'List' },
            { value: 'board',    label: 'Board' },
            { value: 'timeline', label: 'Timeline', disabled: true },
            { value: 'gantt',    label: 'Gantt',    disabled: true },
          ]}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Icon only — some options disabled</span>
        <SegmentedControl
          aria-label="Actions"
          defaultValue="edit"
          options={[
            { value: 'edit',   icon: 'edit',    ariaLabel: 'Edit' },
            { value: 'copy',   icon: 'content_copy', ariaLabel: 'Copy', disabled: true },
            { value: 'delete', icon: 'delete',  ariaLabel: 'Delete', disabled: true },
          ]}
        />
      </div>
    </div>
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const textOpts = [
      { value: 'day',   label: 'Day' },
      { value: 'week',  label: 'Week' },
      { value: 'month', label: 'Month' },
    ];
    const iconOpts = [
      { value: 'list',  icon: 'format_list_bulleted', ariaLabel: 'List' },
      { value: 'board', icon: 'grid_view',            ariaLabel: 'Board' },
      { value: 'gantt', icon: 'view_timeline',        ariaLabel: 'Gantt' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {(['framed', 'frameless'] as const).map(s => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)', textTransform: 'capitalize' }}>{s}</span>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              {(['medium', 'sm'] as const).map(sz => (
                <div key={sz} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>
                    {sz === 'medium' ? 'Medium — Text' : 'Small — Text'}
                  </span>
                  <SegmentedControl size={sz} style={s} aria-label="Period" options={textOpts} defaultValue="day" />
                </div>
              ))}
              {(['medium', 'sm'] as const).map(sz => (
                <div key={sz + '-icon'} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>
                    {sz === 'medium' ? 'Medium — Icon' : 'Small — Icon'}
                  </span>
                  <SegmentedControl size={sz} style={s} aria-label="View" options={iconOpts} defaultValue="list" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
