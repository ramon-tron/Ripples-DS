import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Icon } from './Icon';
import type { IconSize } from './Icon';
import {
  StatusInvitedIcon,
  StatusPendingIcon,
  StatusCancelledIcon,
  StatusInProgressIcon,
  StatusCompletedIcon,
  StatusRevisedIcon,
  StatusApprovedIcon,
  StatusExcludedIcon,
  StatusRevisionRequestedIcon,
  StatusInReviewIcon,
  StatusNotInReviewIcon,
  PriorityUrgentIcon,
  PriorityHighIcon,
  PriorityMediumIcon,
  PriorityLowIcon,
} from './CustomIcons';

// ─── Icon catalogue ───────────────────────────────────────────────────────────

const ICON_GROUPS: Record<string, string[]> = {
  'Navigation': [
    'arrow_back', 'arrow_forward', 'arrow_upward', 'arrow_downward',
    'chevron_left', 'chevron_right', 'expand_more', 'expand_less',
    'menu', 'close', 'first_page', 'last_page',
  ],
  'Actions': [
    'add', 'remove', 'edit', 'delete', 'save', 'send',
    'search', 'filter_list', 'sort', 'refresh', 'download', 'upload',
    'share', 'copy_all', 'open_in_new', 'launch', 'more_horiz', 'more_vert',
  ],
  'Status & Feedback': [
    'check_circle', 'cancel', 'error', 'warning', 'info',
    'check', 'done', 'done_all', 'pending', 'schedule',
    'thumb_up', 'thumb_down', 'star', 'star_border', 'favorite', 'favorite_border',
  ],
  'Communication': [
    'mail', 'mail_outline', 'chat', 'chat_bubble', 'notifications',
    'notifications_none', 'phone', 'call', 'message', 'forum',
  ],
  'Content': [
    'home', 'dashboard', 'settings', 'person', 'group', 'account_circle',
    'folder', 'folder_open', 'file_copy', 'description', 'image',
    'photo_camera', 'videocam', 'attach_file', 'link', 'calendar_today',
  ],
  'Media': [
    'play_arrow', 'pause', 'stop', 'skip_next', 'skip_previous',
    'volume_up', 'volume_off', 'fullscreen', 'fullscreen_exit',
    'replay', 'loop', 'shuffle',
  ],
  'Data & Charts': [
    'bar_chart', 'pie_chart', 'show_chart', 'trending_up', 'trending_down',
    'analytics', 'table_chart', 'grid_view', 'view_list', 'view_module',
  ],
  'UI Elements': [
    'toggle_on', 'toggle_off', 'radio_button_checked', 'radio_button_unchecked',
    'check_box', 'check_box_outline_blank', 'indeterminate_check_box',
    'tune', 'drag_handle', 'drag_indicator', 'swap_horiz', 'swap_vert',
  ],
};

const ALL_ICONS = Object.entries(ICON_GROUPS).flatMap(([group, icons]) =>
  icons.map(name => ({ name, group }))
);

// ─── Custom icon catalogues ───────────────────────────────────────────────────

type CustomIconComponent = (props: { size?: number }) => JSX.Element;

const STATUS_ICONS: { name: string; Component: CustomIconComponent }[] = [
  { name: 'Invited',            Component: StatusInvitedIcon },
  { name: 'Pending',            Component: StatusPendingIcon },
  { name: 'Cancelled',          Component: StatusCancelledIcon },
  { name: 'In Progress',        Component: StatusInProgressIcon },
  { name: 'Completed',          Component: StatusCompletedIcon },
  { name: 'Revised',            Component: StatusRevisedIcon },
  { name: 'Approved',           Component: StatusApprovedIcon },
  { name: 'Excluded',           Component: StatusExcludedIcon },
  { name: 'Revision Requested', Component: StatusRevisionRequestedIcon },
  { name: 'In Review',          Component: StatusInReviewIcon },
  { name: 'Not In Review',      Component: StatusNotInReviewIcon },
];

const PRIORITY_ICONS: { name: string; Component: CustomIconComponent }[] = [
  { name: 'Urgent', Component: PriorityUrgentIcon },
  { name: 'High',   Component: PriorityHighIcon },
  { name: 'Medium', Component: PriorityMediumIcon },
  { name: 'Low',    Component: PriorityLowIcon },
];

const CUSTOM_ICON_SIZE_PX: Record<IconSize, number> = {
  xs: 12,
  s:  16,
  m:  20,
  l:  24,
  xl: 32,
};

// ─── Controls ─────────────────────────────────────────────────────────────────

const SIZES: IconSize[] = ['xs', 's', 'm', 'l', 'xl'];

// ─── Components ───────────────────────────────────────────────────────────────

function ControlChip<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ds-color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'monospace', flexShrink: 0 }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: 4 }}>
        {options.map(opt => {
          const active = opt === value;
          return (
            <button
              key={String(opt)}
              onClick={() => onChange(opt)}
              style={{
                padding: '4px 10px',
                borderRadius: 99,
                border: `1px solid ${active ? 'var(--ds-color-border-brand)' : 'var(--ds-color-border-subtle)'}`,
                background: active ? 'var(--ds-color-fill-brand)' : 'transparent',
                color: active ? 'var(--ds-color-text-primary-inverse)' : 'var(--ds-color-text-secondary)',
                fontSize: 12,
                fontWeight: active ? 700 : 400,
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'all 0.1s',
              }}
            >
              {String(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function IconTile({ name, size }: { name: string; size: IconSize }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard?.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={handleClick}
      title={`${name}\nClick to copy`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '16px 8px 12px',
        borderRadius: 8,
        border: '1px solid transparent',
        background: 'transparent',
        color: 'inherit',
        cursor: 'pointer',
        transition: 'background 0.1s, border-color 0.1s',
        minWidth: 88,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--ds-color-fill-subtle)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ds-color-border-subtle)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent';
      }}
    >
      <Icon name={name} size={size} />
      <span
        style={{
          fontSize: 10,
          fontFamily: 'monospace',
          color: copied ? 'var(--ds-color-text-brand)' : 'var(--ds-color-text-tertiary)',
          textAlign: 'center',
          wordBreak: 'break-all',
          lineHeight: 1.3,
        }}
      >
        {copied ? 'Copied!' : name}
      </span>
    </button>
  );
}

function CustomIconTile({ name, Component, size }: { name: string; Component: CustomIconComponent; size: IconSize }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard?.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={handleClick}
      title={`${name}\nClick to copy`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '16px 8px 12px',
        borderRadius: 8,
        border: '1px solid transparent',
        background: 'transparent',
        color: 'inherit',
        cursor: 'pointer',
        transition: 'background 0.1s, border-color 0.1s',
        minWidth: 88,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--ds-color-fill-subtle)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ds-color-border-subtle)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent';
      }}
    >
      <div style={{ width: CUSTOM_ICON_SIZE_PX[size], height: CUSTOM_ICON_SIZE_PX[size], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Component size={CUSTOM_ICON_SIZE_PX[size]} />
      </div>
      <span
        style={{
          fontSize: 10,
          fontFamily: 'monospace',
          color: copied ? 'var(--ds-color-text-brand)' : 'var(--ds-color-text-tertiary)',
          textAlign: 'center',
          wordBreak: 'break-all',
          lineHeight: 1.3,
        }}
      >
        {copied ? 'Copied!' : name}
      </span>
    </button>
  );
}

function CustomIconSection({
  title,
  description,
  icons,
  size,
}: {
  title: string;
  description: string;
  icons: { name: string; Component: CustomIconComponent }[];
  size: IconSize;
}) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--ds-color-text-tertiary)',
          margin: '0 0 4px',
          paddingBottom: 12,
          borderBottom: '2px solid var(--ds-color-border-subtle)',
          fontFamily: 'monospace',
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 12, color: 'var(--ds-color-text-tertiary)', margin: '8px 0 4px', fontFamily: 'var(--ds-body-m-regular-font-family)' }}>
        {description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {icons.map(({ name, Component }) => (
          <CustomIconTile key={name} name={name} Component={Component} size={size} />
        ))}
      </div>
    </section>
  );
}

function IconsPage() {
  const [query, setQuery] = useState('');
  const [size, setSize]   = useState<IconSize>('m');

  const filtered = query.trim()
    ? ALL_ICONS.filter(i => i.name.includes(query.toLowerCase().replace(/\s+/g, '_')))
    : null; // null = show grouped

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '40px 24px 80px',
        color: 'var(--ds-color-text-primary)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--ds-headline-l-black-font-family)',
          fontSize: 'var(--ds-headline-l-black-font-size)',
          fontWeight: 'var(--ds-headline-l-black-font-weight)',
          lineHeight: 'var(--ds-headline-l-black-line-height)',
          letterSpacing: 'var(--ds-headline-l-black-letter-spacing)',
          margin: '0 0 8px',
        }}
      >
        Iconography
      </h1>
      <p
        style={{
          fontFamily: 'var(--ds-body-l-regular-font-family)',
          fontSize: 'var(--ds-body-l-regular-font-size)',
          color: 'var(--ds-color-text-secondary)',
          margin: '0 0 28px',
        }}
      >
        Google Material Symbols — Rounded, filled, weight 500. Click any icon to copy its name.
      </p>

      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          gap: 20,
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '16px 20px',
          background: 'var(--ds-color-fill-subtle)',
          borderRadius: 12,
          marginBottom: 36,
        }}
      >
        {/* Search */}
        <input
          type="search"
          placeholder="Search icons…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            flex: '1 1 180px',
            minWidth: 160,
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--ds-color-border-subtle)',
            background: 'var(--ds-color-fill-primary)',
            color: 'var(--ds-color-text-primary)',
            fontFamily: 'var(--ds-body-m-regular-font-family)',
            fontSize: 'var(--ds-body-m-regular-font-size)',
            outline: 'none',
          }}
        />

        <ControlChip label="Size" options={SIZES} value={size} onChange={setSize} />
      </div>

      {/* Grid — filtered */}
      {filtered && (
        filtered.length === 0 ? (
          <p style={{ color: 'var(--ds-color-text-tertiary)', fontFamily: 'monospace', fontSize: 14 }}>
            No icons match "{query}"
          </p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {filtered.map(({ name }) => (
              <IconTile key={name} name={name} size={size} />
            ))}
          </div>
        )
      )}

      {/* Grid — grouped */}
      {!filtered && Object.entries(ICON_GROUPS).map(([group, icons]) => (
        <section key={group} style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ds-color-text-tertiary)',
              margin: '0 0 4px',
              paddingBottom: 12,
              borderBottom: '2px solid var(--ds-color-border-subtle)',
              fontFamily: 'monospace',
            }}
          >
            {group}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {icons.map(name => (
              <IconTile key={name} name={name} size={size} />
            ))}
          </div>
        </section>
      ))}

      {/* Custom icon sections — always visible regardless of search */}
      {!filtered && (
        <>
          <h2
            style={{
              fontFamily: 'var(--ds-headline-m-bold-font-family)',
              fontSize: 'var(--ds-headline-m-bold-font-size)',
              fontWeight: 'var(--ds-headline-m-bold-font-weight)',
              color: 'var(--ds-color-text-primary)',
              margin: '48px 0 20px',
            }}
          >
            Custom Icons
          </h2>
          <CustomIconSection
            title="Status"
            description="Custom status icons used in StatusIconButton and status indicators."
            icons={STATUS_ICONS}
            size={size}
          />
          <CustomIconSection
            title="Priority"
            description="Custom priority icons used in priority indicators."
            icons={PRIORITY_ICONS}
            size={size}
          />
        </>
      )}
    </div>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design Tokens/Iconography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A reference catalogue for all icons available in the Ripples design system.

**Material Symbols** (Google's variable icon font) make up the primary icon set. Icons are rendered via the \`<Icon>\` component using the \`name\` prop (snake_case icon name), with controls for \`size\`, \`weight\`, \`fill\`, and \`grade\`.

Available sizes map to fixed pixel dimensions: \`xs\` 12 px · \`s\` 16 px · \`m\` 20 px · \`l\` 24 px · \`xl\` 32 px.

**Custom icons** — status and priority SVG icons specific to Ripples — are listed in the sections below the Material Symbols grid. These are imported as React components (e.g. \`<StatusInProgressIcon />\`) and used internally by **StatusIconButton**.

**Usage guidance**
- Click any icon tile to copy its name to the clipboard.
- Use the size, weight, fill, and grade controls to preview how icons look across token combinations before choosing one.
- Pass the copied name as the \`icon\` prop on **IconButton** or **MegaButton**, or as the \`name\` prop on the standalone \`<Icon>\` component.

**When to use something else**
- Use **StatusIconButton** when a status icon needs to be interactive.
- Use custom status/priority SVG components directly only when building new icon-adjacent components — for interactive use prefer \`StatusIconButton\`.
        `.trim(),
      },
    },
  },
};

export default meta;

export const AllIcons: StoryObj = {
  name: 'All Icons',
  render: () => React.createElement(IconsPage),
};

export const IconComponent: StoryObj<typeof Icon> = {
  name: 'Icon Component',
  render: args => React.createElement(Icon, args),
  args: {
    name: 'star',
    size: 'm',
  },
  argTypes: {
    name:   { control: 'text' },
    size:   { control: 'select', options: SIZES },
    weight: { control: false },
    fill:   { control: false },
    grade:  { control: false },
    color:  { control: false },
  },
};
