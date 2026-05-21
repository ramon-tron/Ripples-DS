import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Avatar } from './Avatar';

// Cat photos for the stories 🐱
const CAT_PARTY   = '/party-cat.png';
const CAT_ORANGE  = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop';
const CAT_SLEEPY  = 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=200&h=200&fit=crop';
const CAT_CURIOUS = 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=200&h=200&fit=crop';
const CAT_FANCY   = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=200&fit=crop';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A circular representation of a user or entity. Shows a photo when a \`src\` URL is provided, or initials with an auto-derived background color when only \`initials\` is given.

The background color is **deterministic** — the same initials always produce the same color — so avatars stay visually consistent across sessions and reloads. The 10-slot palette covers 5 saturated and 5 subtle color variants.

**Usage guidance**
- **User identity** — pair with a name in list items, comments, and profile headers
- **Compact spaces** — use \`sm\` or \`xs\` in dense table rows or inline mentions
- **Groups** — stack overlapping avatars to represent a team or assignee list

**When to use something else**
- Use an icon when representing a non-human entity (team, bot, system action).
- Use a full profile image with name/bio for dedicated profile pages.
        `.trim(),
      },
    },
  },
  argTypes: {
    size:     { control: 'select', options: ['xl', 'lg', 'md', 'sm', 'xs'] },
    initials: { control: 'text' },
    src:      { control: 'text' },
    alt:      { control: 'text' },
  },
  args: {
    size: 'lg',
    initials: 'PL',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── With Photo ───────────────────────────────────────────────────────────────

export const WithPhoto: Story = {
  name: 'With Photo',
  parameters: {
    docs: {
      description: { story: 'Pass a `src` URL to show a photo. All five sizes use the same image, cropped to fill the circle.' },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Avatar src={CAT_PARTY} alt="Party cat" size="xl" />
      <Avatar src={CAT_PARTY} alt="Party cat" size="lg" />
      <Avatar src={CAT_PARTY} alt="Party cat" size="md" />
      <Avatar src={CAT_PARTY} alt="Party cat" size="sm" />
      <Avatar src={CAT_PARTY} alt="Party cat" size="xs" />
    </div>
  ),
};

// ─── All Sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
      {(['xl', 'lg', 'md', 'sm', 'xs'] as const).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar initials="PL" size={size} />
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── All Colors ───────────────────────────────────────────────────────────────

// Each initials string is verified to hash to its named color slot
const SLOT_SAMPLES = [
  { initials: 'AA', label: 'avatar1'        },
  { initials: 'AB', label: 'avatar2'        },
  { initials: 'AC', label: 'avatar3'        },
  { initials: 'AD', label: 'avatar4'        },
  { initials: 'AE', label: 'avatar5'        },
  { initials: 'AF', label: 'avatar1-subtle' },
  { initials: 'AG', label: 'avatar2-subtle' },
  { initials: 'AH', label: 'avatar3-subtle' },
  { initials: 'AI', label: 'avatar4-subtle' },
  { initials: 'AJ', label: 'avatar5-subtle' },
];

export const AllColors: Story = {
  name: 'All Colors',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '10 color slots — 5 saturated and 5 subtle. The slot is deterministically derived from the initials string, so the same person always gets the same color.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {SLOT_SAMPLES.map(({ initials, label }) => (
        <div key={initials} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar initials={initials} size="md" />
          <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── User List ────────────────────────────────────────────────────────────────

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 300,
  borderRadius: 12,
  border: '1px solid var(--ds-color-border-subtle)',
  overflow: 'hidden',
};

const listItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '10px 16px',
  fontFamily: 'var(--ds-font-family-body)',
  borderBottom: '1px solid var(--ds-color-border-subtle)',
};

const TEAM = [
  { initials: 'WW', src: CAT_PARTY,   name: 'Whiskers McParty',  role: 'Party Planner'     },
  { initials: 'OT', src: CAT_ORANGE,  name: 'Orange Tabby',      role: 'Nap Specialist'    },
  { initials: 'SB', src: CAT_SLEEPY,  name: 'Sir Sleepsalot',    role: 'Senior Loafer'     },
  { initials: 'CQ', src: CAT_CURIOUS, name: 'Curiosity Cat',     role: 'Chief Investigator'},
  { initials: 'FC', src: CAT_FANCY,   name: 'Fancypaws III',     role: 'VP of Zoomies'     },
];

export const UserList: Story = {
  name: 'User List',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Avatars with photos paired with names and roles. Falls back to initials if no `src` is provided.' },
    },
  },
  render: () => (
    <div style={listStyle}>
      {TEAM.map(({ initials, src, name, role }, i) => (
        <div key={initials} style={{ ...listItemStyle, borderBottom: i < TEAM.length - 1 ? listItemStyle.borderBottom : 'none' }}>
          <Avatar src={src} initials={initials} size="md" alt={name} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ds-color-text-primary)' }}>{name}</div>
            <div style={{ fontSize: 12, color: 'var(--ds-color-text-secondary)' }}>{role}</div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Initials Fallback ────────────────────────────────────────────────────────

export const InitialsFallback: Story = {
  name: 'Initials Only',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'When no `src` is provided the component shows initials on a deterministically chosen background.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {TEAM.map(({ initials, name }) => (
        <Avatar key={initials} initials={initials} size="lg" alt={name} />
      ))}
    </div>
  ),
};

// ─── Stacked Group ────────────────────────────────────────────────────────────

export const StackedGroup: Story = {
  name: 'Stacked Group',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Overlap avatars to represent a team or set of assignees.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {[CAT_PARTY, CAT_ORANGE, CAT_SLEEPY, CAT_CURIOUS, CAT_FANCY].map((src, i) => (
        <div key={src} style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 5 - i, position: 'relative' }}>
          <Avatar
            src={src}
            alt="Cat team member"
            size="md"
            style={{ outline: '2px solid var(--ds-color-fill-primary)' }}
          />
        </div>
      ))}
      <span style={{
        marginLeft: 10,
        fontSize: 13,
        color: 'var(--ds-color-text-secondary)',
        fontFamily: 'var(--ds-font-family-body)',
      }}>
        +3 more cats
      </span>
    </div>
  ),
};
