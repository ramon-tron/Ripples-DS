import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Dropdown } from './Dropdown';
import type { DropdownItem } from './Dropdown';

// ─── Shared sample data ───────────────────────────────────────────────────────

const PEOPLE: DropdownItem[] = [
  { value: 'azra',   label: 'Azra Herrera',     supportingText: '@azra',   icon: 'person' },
  { value: 'mina',   label: 'Mina Chae-Young',  supportingText: '@mina',   icon: 'person' },
  { value: 'nathan', label: 'Nathan McClellan',  supportingText: '@nate',   icon: 'person' },
  { value: 'priya',  label: 'Priya Subramanian', supportingText: '@priya',  icon: 'person' },
  { value: 'sam',    label: 'Sam Okafor',        supportingText: '@sam',    icon: 'person' },
];

const PEOPLE_SECTIONED: DropdownItem[] = [
  { type: 'section', label: 'Recently Active' },
  { value: 'mina',   label: 'Mina Chae-Young',  supportingText: '@mina',   icon: 'person' },
  { value: 'azra',   label: 'Azra Herrera',     supportingText: '@azra',   icon: 'person' },
  { type: 'section', label: 'All Members', divider: true },
  { value: 'nathan', label: 'Nathan McClellan',  supportingText: '@nate',   icon: 'person' },
  { value: 'priya',  label: 'Priya Subramanian', supportingText: '@priya',  icon: 'person' },
  { value: 'sam',    label: 'Sam Okafor',        supportingText: '@sam',    icon: 'person' },
];

const PEOPLE_AVATARS: DropdownItem[] = [
  { value: 'mina',   label: 'Mina Chae-Young',  supportingText: '@mina',   avatar: { initials: 'MC' } },
  { value: 'azra',   label: 'Azra Herrera',     supportingText: '@azra',   avatar: { initials: 'AH' } },
  { value: 'nathan', label: 'Nathan McClellan',  supportingText: '@nate',   avatar: { initials: 'NM' } },
  { value: 'priya',  label: 'Priya Subramanian', supportingText: '@priya',  avatar: { initials: 'PS' } },
];

const ROLES: DropdownItem[] = [
  { value: 'admin',  label: 'Admin',   icon: 'shield_person' },
  { value: 'editor', label: 'Editor',  icon: 'edit' },
  { value: 'viewer', label: 'Viewer',  icon: 'visibility' },
  { type: 'divider' },
  { value: 'none',   label: 'No access', icon: 'block', disabled: true },
];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A composable dropdown (combobox) supporting four interaction modes.

**Types**
- **Default** — single-select, closed trigger
- **Search** — single-select with a search action button; typing filters items when open
- **Tags** — multi-select; selected items appear as dismissible chips in the trigger
- **Mini** — compact single-select for dense layouts; no label or helper text

**Sizes**
- **Default** — 48px trigger height (36px for Mini)
- **Small** — 40px trigger height (32px for Mini)

**Menu items**
- Regular option: optional leading icon or avatar, main label, optional supporting text
- Section header: uppercase bold label, optional left/right icons, optional top divider
- Divider: 1px separator line

**Keyboard support**
\`↓\` / \`↑\` navigate items, \`Enter\` / \`Space\` select, \`Escape\` closes, \`Tab\` closes and moves focus.
        `.trim(),
      },
    },
  },
  argTypes: {
    type:            { control: 'select', options: ['default', 'search', 'tags', 'mini'] },
    size:            { control: 'select', options: ['default', 'sm'] },
    label:           { control: 'text' },
    placeholder:     { control: 'text' },
    helperText:      { control: 'text' },
    leadingIcon:     { control: 'text' },
    actionIcon:      { control: 'text' },
    actionAriaLabel: { control: 'text' },
    helpIcon:        { control: 'boolean' },
    error:           { control: 'boolean' },
    disabled:        { control: 'boolean' },
  },
  args: {
    label: 'Assign to',
    placeholder: 'Select a person',
    helperText: 'This field is required.',
    size: 'default',
    type: 'default',
    items: PEOPLE,
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Types ────────────────────────────────────────────────────────────────────

export const Types: Story = {
  name: 'Types',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Default, Search, Tags (multi-select), and Mini.' },
    },
  },
  render: () => {
    const [defVal, setDefVal] = useState<string | null>(null);
    const [searchVal, setSearchVal] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [miniVal, setMiniVal] = useState<string | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 360 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Default</span>
          <Dropdown
            label="Assign to"
            placeholder="Select a person"
            items={PEOPLE}
            value={defVal}
            onChange={setDefVal}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Search</span>
          <Dropdown
            type="search"
            label="Search members"
            placeholder="Type to search…"
            items={PEOPLE}
            value={searchVal}
            onChange={setSearchVal}
            leadingIcon="person_search"
            actionIcon="search"
            actionAriaLabel="Search"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Tags</span>
          <Dropdown
            type="tags"
            label="Add members"
            placeholder="Select people…"
            items={PEOPLE}
            values={tags}
            onChangeMulti={setTags}
            actionIcon="search"
            actionAriaLabel="Search members"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Mini</span>
          <Dropdown
            type="mini"
            placeholder="Role"
            items={ROLES}
            value={miniVal}
            onChange={setMiniVal}
            actionIcon="search"
            actionAriaLabel="Search"
          />
        </div>
      </div>
    );
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Default (48px) and Small (40px) for the Default type.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
      {(['default', 'sm'] as const).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>
            {size === 'default' ? 'Default (48px)' : 'Small (40px)'}
          </span>
          <Dropdown
            size={size}
            label="Assign to"
            placeholder="Select a person"
            items={PEOPLE}
            helperText="Team member assignment."
          />
        </div>
      ))}
    </div>
  ),
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Placeholder, filled, error, and disabled.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Placeholder</span>
        <Dropdown label="Assign to" placeholder="Select a person" items={PEOPLE} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Filled</span>
        <Dropdown label="Assign to" items={PEOPLE} defaultValue="mina" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Error</span>
        <Dropdown label="Assign to" items={PEOPLE} defaultValue="mina" error helperText="Please confirm the assignment." />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Disabled</span>
        <Dropdown label="Assign to" items={PEOPLE} defaultValue="mina" disabled helperText="Assignment is locked." />
      </div>
    </div>
  ),
};

// ─── With Section Headers ─────────────────────────────────────────────────────

export const WithSections: Story = {
  name: 'With Section Headers',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Section headers group related options. The second group uses `divider: true` to add a top border.' },
    },
  },
  render: () => (
    <div style={{ width: 360 }}>
      <Dropdown
        label="Assign to"
        placeholder="Select a person"
        items={PEOPLE_SECTIONED}
        helperText="Select someone from the team."
      />
    </div>
  ),
};

// ─── With Avatar Items ────────────────────────────────────────────────────────

export const WithAvatars: Story = {
  name: 'With Avatar Items',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Provide an `avatar` object on an item instead of `icon` to display an avatar.' },
    },
  },
  render: () => (
    <div style={{ width: 360 }}>
      <Dropdown
        label="Assign reviewer"
        placeholder="Choose a reviewer"
        items={PEOPLE_AVATARS}
      />
    </div>
  ),
};

// ─── Search ───────────────────────────────────────────────────────────────────

export const SearchDropdown: Story = {
  name: 'Search',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'When open, the trigger becomes a text input. Typing filters options client-side.' },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div style={{ width: 360 }}>
        <Dropdown
          type="search"
          label="Assign to"
          placeholder="Type to search…"
          items={PEOPLE_SECTIONED}
          value={value}
          onChange={setValue}
          leadingIcon="person_search"
          actionIcon="search"
          actionAriaLabel="Search"
          helperText={value ? `Selected: ${value}` : 'Start typing to filter members.'}
        />
      </div>
    );
  },
};

// ─── Tags ─────────────────────────────────────────────────────────────────────

export const TagsDropdown: Story = {
  name: 'Tags (Multi-select)',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Multi-select dropdown. Selected items appear as chips; type to filter; Backspace removes the last chip.' },
    },
  },
  render: () => {
    const [values, setValues] = useState<string[]>(['mina', 'azra']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>With selections</span>
          <Dropdown
            type="tags"
            label="Add members"
            placeholder="Select people…"
            items={PEOPLE}
            values={values}
            onChangeMulti={setValues}
            actionIcon="search"
            actionAriaLabel="Search members"
            helperText={`${values.length} member${values.length !== 1 ? 's' : ''} selected`}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Empty</span>
          <Dropdown
            type="tags"
            label="Add members"
            placeholder="Select people…"
            items={PEOPLE}
            actionIcon="search"
            actionAriaLabel="Search members"
          />
        </div>
      </div>
    );
  },
};

// ─── Mini ─────────────────────────────────────────────────────────────────────

export const MiniDropdown: Story = {
  name: 'Mini',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Compact trigger for dense layouts — no label or helper text. Default (36px) and Small (32px).' },
    },
  },
  render: () => {
    const [val1, setVal1] = useState<string | null>(null);
    const [val2, setVal2] = useState<string | null>('editor');
    const [val3, setVal3] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)', width: 100 }}>Default (36px)</span>
          <Dropdown type="mini" placeholder="Role" items={ROLES} value={val1} onChange={setVal1} actionIcon="search" actionAriaLabel="Search" />
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)', width: 100 }}>Filled</span>
          <Dropdown type="mini" placeholder="Role" items={ROLES} value={val2} onChange={setVal2} actionIcon="search" actionAriaLabel="Search" />
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)', width: 100 }}>Small (32px)</span>
          <Dropdown type="mini" size="sm" placeholder="Role" items={ROLES} value={val3} onChange={setVal3} actionIcon="search" actionAriaLabel="Search" />
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)', width: 100 }}>Disabled</span>
          <Dropdown type="mini" placeholder="Role" items={ROLES} defaultValue="viewer" disabled actionIcon="search" actionAriaLabel="Search" />
        </div>
      </div>
    );
  },
};

// ─── With Help Icon ───────────────────────────────────────────────────────────

export const WithHelpIcon: Story = {
  name: 'With Help Icon',
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Help icon next to the label signals that additional context is available.' },
    },
  },
  render: () => (
    <div style={{ width: 360 }}>
      <Dropdown
        label="Billing plan"
        helpIcon
        placeholder="Select a plan"
        items={[
          { value: 'starter',  label: 'Starter',      icon: 'rocket_launch' },
          { value: 'growth',   label: 'Growth',       icon: 'trending_up' },
          { value: 'business', label: 'Business',     icon: 'business' },
          { value: 'enterprise', label: 'Enterprise', icon: 'domain' },
        ]}
        helperText="Your plan determines seat limits and features."
      />
    </div>
  ),
};

// ─── All Sizes × All Types ────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes × All Types',
  parameters: {
    controls: { disable: true },
    layout: 'padded',
    docs: {
      description: { story: 'Every type at both sizes for a quick visual comparison.' },
    },
  },
  render: () => {
    const rows: Array<{ type: 'default' | 'search' | 'tags' | 'mini'; label: string }> = [
      { type: 'default', label: 'Default' },
      { type: 'search',  label: 'Search' },
      { type: 'tags',    label: 'Tags' },
      { type: 'mini',    label: 'Mini' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {rows.map(({ type, label }) => (
          <div key={type} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)', width: 60, paddingTop: type === 'mini' ? 6 : 24 }}>
              {label}
            </span>
            {(['default', 'sm'] as const).map(size => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>
                  {size}
                </span>
                <Dropdown
                  type={type}
                  size={size}
                  label={type !== 'mini' ? 'Assign to' : undefined}
                  placeholder="Select…"
                  items={PEOPLE}
                  defaultValues={type === 'tags' ? ['mina'] : undefined}
                  actionIcon={type !== 'default' ? 'search' : undefined}
                  actionAriaLabel={type !== 'default' ? 'Search' : undefined}
                  wrapperStyle={{ width: type === 'mini' ? undefined : 280 }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

// ─── In a Form ────────────────────────────────────────────────────────────────

export const InAForm: Story = {
  name: 'In a Form',
  parameters: {
    controls: { disable: true },
    layout: 'padded',
    docs: {
      description: { story: 'Dropdowns in a realistic form alongside other inputs.' },
    },
  },
  render: () => {
    const [role, setRole] = useState<string | null>(null);
    const [assignee, setAssignee] = useState<string | null>(null);
    const [reviewers, setReviewers] = useState<string[]>([]);

    return (
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
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ds-color-text-primary)', marginBottom: 4 }}>
          Create task
        </div>
        <Dropdown
          label="Assignee"
          placeholder="Select a member"
          items={PEOPLE_AVATARS}
          value={assignee}
          onChange={setAssignee}
          leadingIcon="person"
          helperText="Who owns this task?"
          size="sm"
        />
        <Dropdown
          type="search"
          label="Project"
          placeholder="Search projects…"
          items={[
            { value: 'alpha', label: 'Alpha Redesign', icon: 'palette' },
            { value: 'beta',  label: 'Beta Launch',    icon: 'rocket_launch' },
            { value: 'gamma', label: 'Gamma Platform',  icon: 'layers' },
          ]}
          size="sm"
          actionIcon="search"
          actionAriaLabel="Search projects"
        />
        <Dropdown
          label="Role"
          placeholder="Assign a role"
          helpIcon
          items={ROLES}
          value={role}
          onChange={setRole}
          error={role === null}
          helperText={role === null ? 'Role is required.' : undefined}
          size="sm"
        />
        <Dropdown
          type="tags"
          label="Reviewers"
          placeholder="Add reviewers…"
          items={PEOPLE}
          values={reviewers}
          onChangeMulti={setReviewers}
          actionIcon="search"
          actionAriaLabel="Search reviewers"
          helperText={`${reviewers.length} reviewer${reviewers.length !== 1 ? 's' : ''} added`}
          size="sm"
        />
      </form>
    );
  },
};
