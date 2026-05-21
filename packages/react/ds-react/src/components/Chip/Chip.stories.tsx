import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Chip } from './Chip';
import { Avatar } from '../Avatar/Avatar';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Chips are compact, interactive labels used to represent keywords, tags, or applied filters. They can optionally include a dismiss button, an icon, or an avatar.

**States:** Unselected · Hover · Selected · Pressed · Disabled

**Usage guidance**
- **Tags** — show user-generated or system-assigned keywords on content
- **Filters** — display and allow removal of active filter selections
- **Selections** — represent chosen items (assignees, categories) in a compact form

**When to use something else**
- Use a **Label** for read-only status indicators that never need to be dismissed.
- Use a **ButtonPill** when the intent is navigation or selection between fixed options.
- Use a **Select / Combobox** when users need to search and pick from a long list.
        `.trim(),
      },
    },
  },
  argTypes: {
    size:     { control: 'select', options: ['md', 'sm'] },
    icon:     { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    children: 'Keyword',
    selected: false,
    disabled: false,
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => {
    const [visible, setVisible] = React.useState(true);
    if (!visible) {
      return (
        <button onClick={() => setVisible(true)} style={{ fontSize: 13, cursor: 'pointer' }}>
          Restore chip
        </button>
      );
    }
    return <Chip {...args} onDismiss={() => setVisible(false)} />;
  },
};

// ─── No Dismiss ───────────────────────────────────────────────────────────────

export const NoDismiss: Story = {
  name: 'No Dismiss',
  parameters: {
    docs: {
      description: { story: 'Omit `onDismiss` for a read-only chip with no X button.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Chip>Design</Chip>
      <Chip>Engineering</Chip>
      <Chip>Product</Chip>
    </div>
  ),
};

// ─── With Dismiss ─────────────────────────────────────────────────────────────

export const WithDismiss: Story = {
  name: 'With Dismiss',
  parameters: {
    docs: {
      description: { story: 'Pass `onDismiss` to show the X button. Manage visibility in state.' },
    },
  },
  render: () => {
    const [tags, setTags] = useState(['Design', 'Engineering', 'Product', 'Research']);
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', minWidth: 300 }}>
        {tags.map(tag => (
          <Chip key={tag} onDismiss={() => setTags(t => t.filter(x => x !== tag))}>
            {tag}
          </Chip>
        ))}
        {tags.length === 0 && (
          <span style={{ fontSize: 13, color: 'var(--ds-color-text-tertiary)', fontFamily: 'var(--ds-font-family-body)' }}>
            All tags removed
          </span>
        )}
      </div>
    );
  },
};

// ─── With Icon ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'With Icon',
  parameters: {
    docs: {
      description: { story: 'Pass an `icon` (Material Symbol name) to prepend an icon before the label.' },
    },
    controls: { disable: true },
  },
  render: () => {
    const [tags, setTags] = useState(['Urgent', 'Flagged', 'Pinned', 'Starred']);
    const icons: Record<string, string> = {
      Urgent: 'priority_high',
      Flagged: 'flag',
      Pinned: 'push_pin',
      Starred: 'star',
    };
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tags.map(tag => (
          <Chip key={tag} icon={icons[tag]} onDismiss={() => setTags(t => t.filter(x => x !== tag))}>
            {tag}
          </Chip>
        ))}
      </div>
    );
  },
};

// ─── With Avatar ──────────────────────────────────────────────────────────────

export const WithAvatar: Story = {
  name: 'With Avatar',
  parameters: {
    docs: {
      description: { story: 'Pass an `avatar` node (typically a sized Avatar) to show a person or entity next to the label.' },
    },
    controls: { disable: true },
  },
  render: () => {
    const [assignees, setAssignees] = useState(['RS', 'AK', 'MT', 'JL']);
    const names: Record<string, string> = { RS: 'Ramon S.', AK: 'Alicia K.', MT: 'Marcus T.', JL: 'Jamie L.' };
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {assignees.map(initials => (
          <Chip
            key={initials}
            avatar={<Avatar initials={initials} size="sm" />}
            onDismiss={() => setAssignees(a => a.filter(x => x !== initials))}
          >
            {names[initials]}
          </Chip>
        ))}
      </div>
    );
  },
};

// ─── Selected State ───────────────────────────────────────────────────────────

export const Selected: Story = {
  name: 'Selected State',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Use `selected` to show the active/chosen state. Typically toggled by an `onClick` handler on the chip.' },
    },
  },
  render: () => {
    const OPTIONS = ['Design', 'Engineering', 'Product', 'Research', 'Marketing'];
    const [active, setActive] = useState<string[]>(['Design', 'Product']);

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {OPTIONS.map(opt => (
          <span
            key={opt}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer', display: 'inline-flex' }}
            onClick={() => setActive(a => a.includes(opt) ? a.filter(x => x !== opt) : [...a, opt])}
            onKeyDown={(e) => e.key === 'Enter' && setActive(a => a.includes(opt) ? a.filter(x => x !== opt) : [...a, opt])}
          >
            <Chip selected={active.includes(opt)}>{opt}</Chip>
          </span>
        ))}
      </div>
    );
  },
};

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Visual reference for all chip states: Default, Hover (hover in browser), Selected, and Disabled.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip>Default</Chip>
      <Chip selected>Selected</Chip>
      <Chip disabled onDismiss={() => {}}>Disabled</Chip>
      <Chip onDismiss={() => {}}>With Dismiss</Chip>
      <Chip selected onDismiss={() => {}}>Selected + Dismiss</Chip>
    </div>
  ),
};

// ─── Both Sizes ───────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Chip size="md" onDismiss={() => {}}>Default</Chip>
      <Chip size="sm" onDismiss={() => {}}>Small</Chip>
    </div>
  ),
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { disabled: true, children: 'Locked', onDismiss: () => {} },
};

// ─── Active Filter Bar ────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: 20,
  borderRadius: 12,
  border: '1px solid var(--ds-color-border-subtle)',
  minWidth: 380,
  fontFamily: 'var(--ds-font-family-body)',
};

export const FilterBar: Story = {
  name: 'Active Filter Bar',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Chips used to display and clear active filters on a search or list view.' },
    },
  },
  render: () => {
    const [filters, setFilters] = useState([
      { id: 'status', label: 'Status: Active', icon: 'radio_button_checked' },
      { id: 'type',   label: 'Type: Component', icon: 'category' },
      { id: 'owner',  label: 'Owner: Ramon', icon: 'person' },
    ]);
    const remove = (id: string) => setFilters(f => f.filter(x => x.id !== id));

    return (
      <div style={cardStyle}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ds-color-text-secondary)' }}>
          Active filters
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {filters.length === 0 ? (
            <span style={{ fontSize: 13, color: 'var(--ds-color-text-tertiary)' }}>No filters applied</span>
          ) : (
            filters.map(f => (
              <Chip key={f.id} size="sm" icon={f.icon} onDismiss={() => remove(f.id)}>
                {f.label}
              </Chip>
            ))
          )}
        </div>
      </div>
    );
  },
};
