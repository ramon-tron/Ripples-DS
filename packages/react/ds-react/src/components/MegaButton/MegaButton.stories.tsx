import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { MegaButton } from './MegaButton';
import type { MegaButtonVariant } from './MegaButton';

const meta = {
  title: 'Components/MegaButton',
  component: MegaButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A large square button (min 94 × 94 px) that stacks a Material Symbols icon above a text label in a vertical flex layout. Designed for prominent launcher-style actions in dashboards, toolbars, or shortcut grids where icon and label together communicate the action.

**Variants**
- **Mono** — neutral fill with primary text and icon colors. Use on standard surfaces.
- **Brand** — subtle brand fill with brand-colored icon and text. Use to draw attention to the primary action in a group.

**Usage guidance**
- Keep labels short (one or two words) to maintain a square-ish proportion — the width grows to fit the text but the height is fixed at 94 px.
- Group 4–8 MegaButtons in a row or grid for launcher and shortcut panels.
- Use the \`icon\` prop with any Material Symbols icon name (snake_case), e.g. \`"arrow_forward"\`, \`"settings"\`.

**When to use something else**
- Use **Button** for form submissions and inline CTAs where vertical stacking would be disproportionate.
- Use **IconButton** when space is limited and the icon alone conveys the action.
- Use **ButtonPill** for filter or tag-like selections.
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['mono', 'brand'] satisfies MegaButtonVariant[],
    },
    icon: { control: 'text' },
    loading:  { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    children: 'Label',
    variant: 'mono',
    icon: 'star',
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof MegaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── States ──────────────────────────────────────────────────────────────────

export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story  = { args: { loading: true } };

// ─── Per-variant stories ──────────────────────────────────────────────────────

export const Mono:  Story = { args: { variant: 'mono' } };
export const Brand: Story = { args: { variant: 'brand' } };

// ─── All Variants ─────────────────────────────────────────────────────────────

const VARIANTS: MegaButtonVariant[] = ['mono', 'brand'];

const ICONS = [
  'star',
  'home',
  'settings',
  'notifications',
  'person',
  'favorite',
  'share',
  'add',
];

export const AllVariants: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {VARIANTS.map((variant) => (
        <section key={variant}>
          <h2 style={{
            fontFamily: 'var(--ds-font-family-body)',
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '16px',
            color: 'var(--ds-color-text-primary)',
            textTransform: 'capitalize',
          }}>
            {variant}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-start' }}>
            {ICONS.map((icon) => (
              <MegaButton key={icon} variant={variant} icon={icon}>
                {icon}
              </MegaButton>
            ))}
            <MegaButton variant={variant} icon="star" disabled>
              disabled
            </MegaButton>
            <MegaButton variant={variant} icon="star" loading>
              loading
            </MegaButton>
          </div>
        </section>
      ))}
    </div>
  ),
};

// ─── Icon Showcase ────────────────────────────────────────────────────────────

export const IconShowcase: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        story: 'MegaButton accepts any Material Symbols icon name via the `icon` prop.',
      },
    },
  },
  render: () => (
    <div style={{ padding: '32px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {ICONS.map((icon) => (
        <MegaButton key={icon} variant="brand" icon={icon}>
          {icon}
        </MegaButton>
      ))}
    </div>
  ),
};
