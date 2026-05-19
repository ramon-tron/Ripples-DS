import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';
import { StatusIconButton } from './StatusIconButton';
import type { StatusIconButtonStatus, StatusIconButtonSize } from './StatusIconButton';

const meta = {
  title: 'Components/StatusIconButton',
  component: StatusIconButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    status: {
      control: 'select',
      options: [
        'pending', 'in-progress', 'completed', 'approved',
        'excluded', 'review', 'revision',
      ] satisfies StatusIconButtonStatus[],
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'] satisfies StatusIconButtonSize[],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    status: 'pending',
    size: 'l',
    disabled: false,
  },
} satisfies Meta<typeof StatusIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = { args: { disabled: true } };

// ─── All Statuses ─────────────────────────────────────────────────────────────

const STATUSES: { status: StatusIconButtonStatus; label: string }[] = [
  { status: 'pending',     label: 'Pending' },
  { status: 'in-progress', label: 'In Progress' },
  { status: 'completed',   label: 'Completed' },
  { status: 'approved',    label: 'Approved' },
  { status: 'excluded',    label: 'Excluded' },
  { status: 'review',      label: 'In Review' },
  { status: 'revision',    label: 'Revision Requested' },
];

const SIZES: StatusIconButtonSize[] = ['s', 'm', 'l', 'xl'];

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '180px repeat(4, 1fr) 80px',
  gap: '8px',
  alignItems: 'center',
  fontFamily: 'var(--ds-font-family-body)',
};

const headerCellStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 500,
  color: 'var(--ds-color-text-tertiary)',
  textTransform: 'uppercase',
  letterSpacing: '0.65px',
  textAlign: 'center',
};

const labelCellStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--ds-color-text-secondary)',
};

export const AllStatuses: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Header row */}
      <div style={gridStyle}>
        <span />
        {SIZES.map(s => (
          <span key={s} style={headerCellStyle}>{s}</span>
        ))}
        <span style={headerCellStyle}>disabled</span>
      </div>

      {STATUSES.map(({ status, label }) => (
        <div key={status} style={gridStyle}>
          <span style={labelCellStyle}>{label}</span>
          {SIZES.map(size => (
            <div key={size} style={{ display: 'flex', justifyContent: 'center' }}>
              <StatusIconButton status={status} size={size} />
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StatusIconButton status={status} size="l" disabled />
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Per-status stories (autodocs) ───────────────────────────────────────────

export const Pending: Story            = { args: { status: 'pending' } };
export const InProgress: Story         = { args: { status: 'in-progress' } };
export const Completed: Story          = { args: { status: 'completed' } };
export const Approved: Story           = { args: { status: 'approved' } };
export const Excluded: Story           = { args: { status: 'excluded' } };
export const InReview: Story           = { args: { status: 'review' } };
export const RevisionRequested: Story  = { args: { status: 'revision' } };
