import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { PaymentLabel } from './PaymentLabel';

const meta = {
  title: 'Components/PaymentLabel',
  component: PaymentLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Payment Labels are informational components specific to payment-related contexts. They communicate the payment status of an invoice, transaction, or order at a glance.

**Types**
- **Pending** — payment is expected but not yet received; outlined in green
- **Paid in Full** — fully paid; solid green fill
- **Partial** — partially paid; subtle green fill
- **No Payment** — no payment has been made or expected; neutral gray

**Usage guidance**
- Use in tables and list views alongside invoice amounts
- Pair with the actual currency amount the status refers to
- Use \`sm\` in dense tables; \`md\` for primary views with more breathing room
        `.trim(),
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['pending', 'paid', 'partial', 'none'],
    },
    size: { control: 'select', options: ['md', 'sm'] },
    amount: { control: 'text' },
  },
  args: {
    type: 'pending',
    size: 'md',
    amount: '+ $600',
  },
} satisfies Meta<typeof PaymentLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All Types ────────────────────────────────────────────────────────────────

const TYPES: Array<{ type: React.ComponentProps<typeof PaymentLabel>['type']; label: string }> = [
  { type: 'pending',  label: 'Pending'      },
  { type: 'paid',     label: 'Paid in Full' },
  { type: 'partial',  label: 'Partial'      },
  { type: 'none',     label: 'No Payment'   },
];

export const AllTypes: Story = {
  name: 'All Types',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All four payment statuses in both sizes.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'var(--ds-font-family-body)' }}>
      {(['md', 'sm'] as const).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>
            {size === 'md' ? 'Default' : 'Small'}
          </span>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {TYPES.map(({ type, label }) => (
              <div key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <PaymentLabel type={type} size={size} amount="+ $600" />
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Payment History Table ────────────────────────────────────────────────────

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'var(--ds-font-family-body)',
  fontSize: 14,
};

const thStyle: React.CSSProperties = {
  padding: '8px 16px',
  textAlign: 'left',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--ds-color-text-secondary)',
  borderBottom: '1px solid var(--ds-color-border-subtle)',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderBottom: '1px solid var(--ds-color-border-subtle)',
  color: 'var(--ds-color-text-primary)',
};

const INVOICES = [
  { id: 'INV-001', client: 'Acme Corp',       date: 'May 1, 2026',  amount: '+ $1,200', type: 'paid'    },
  { id: 'INV-002', client: 'Globex Inc',       date: 'May 8, 2026',  amount: '+ $850',   type: 'partial' },
  { id: 'INV-003', client: 'Initech LLC',      date: 'May 14, 2026', amount: '+ $600',   type: 'pending' },
  { id: 'INV-004', client: 'Umbrella Co',      date: 'May 19, 2026', amount: '+ $2,400', type: 'none'    },
  { id: 'INV-005', client: 'Stark Industries', date: 'May 20, 2026', amount: '+ $975',   type: 'paid'    },
] as const;

export const PaymentTable: Story = {
  name: 'Payment History Table',
  parameters: {
    controls: { disable: true },
    layout: 'padded',
    docs: {
      description: {
        story: 'Typical usage inside a payment history table. Use the `sm` size in dense table rows.',
      },
    },
  },
  render: () => (
    <div style={{ minWidth: 520, borderRadius: 12, border: '1px solid var(--ds-color-border-subtle)', overflow: 'hidden' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Invoice</th>
            <th style={thStyle}>Client</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {INVOICES.map((inv, i) => (
            <tr key={inv.id}>
              <td style={{ ...tdStyle, borderBottom: i < INVOICES.length - 1 ? tdStyle.borderBottom : 'none', fontWeight: 600 }}>{inv.id}</td>
              <td style={{ ...tdStyle, borderBottom: i < INVOICES.length - 1 ? tdStyle.borderBottom : 'none' }}>{inv.client}</td>
              <td style={{ ...tdStyle, borderBottom: i < INVOICES.length - 1 ? tdStyle.borderBottom : 'none', color: 'var(--ds-color-text-secondary)' }}>{inv.date}</td>
              <td style={{ ...tdStyle, borderBottom: i < INVOICES.length - 1 ? tdStyle.borderBottom : 'none' }}>
                <PaymentLabel type={inv.type} size="sm" amount={inv.amount} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
