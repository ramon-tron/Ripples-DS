import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from './Pagination';
import type { PaginationProps } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Pagination organizes large sets of content across pages and gives users control over navigation.

**Types**
- **Compact** — a pill-shaped indicator strip ideal for carousels and slideshows. Supports autoplay with a configurable interval, a play/pause button, and swipe gestures.
- **Full** — a full-width bar typically paired with a data table. Shows a range summary, an items-per-page dropdown, and prev/next page controls with a page number input.

**Sizes** — \`default\` and \`large\` for both types.
        `.trim(),
      },
    },
  },
  argTypes: {
    type: { control: 'radio', options: ['compact', 'full'] },
    size: { control: 'radio', options: ['default', 'large'] },
  },
  args: {
    type: 'compact',
    count: 9,
    size: 'default',
    autoPlay: true,
    autoPlayInterval: 10000,
  } as PaginationProps,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Compact ──────────────────────────────────────────────────────────────────

export const CompactDefault: Story = {
  parameters: { layout: 'centered' },
  args: {
    type: 'compact',
    count: 9,
    size: 'default',
    autoPlay: true,
    autoPlayInterval: 10000,
  } as PaginationProps,
};

export const CompactLarge: Story = {
  parameters: { layout: 'centered' },
  args: {
    type: 'compact',
    count: 9,
    size: 'large',
    autoPlay: true,
    autoPlayInterval: 10000,
  } as PaginationProps,
};

export const CompactNoAutoPlay: Story = {
  name: 'Compact — No Autoplay',
  parameters: { layout: 'centered' },
  args: {
    type: 'compact',
    count: 9,
    size: 'default',
    autoPlay: false,
  } as PaginationProps,
};

export const CompactNoAutoPlayLarge: Story = {
  name: 'Compact — No Autoplay, Large',
  parameters: { layout: 'centered' },
  args: {
    type: 'compact',
    count: 9,
    size: 'large',
    autoPlay: false,
  } as PaginationProps,
};

// ─── Full ─────────────────────────────────────────────────────────────────────

export const FullDefault: Story = {
  name: 'Full — Default',
  parameters: { layout: 'padded' },
  render: () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    return (
      <div style={{ width: '100%' }}>
        <Pagination
          type="full"
          total={100}
          size="default"
          page={page}
          itemsPerPage={perPage}
          onPageChange={setPage}
          onItemsPerPageChange={v => { setPerPage(v); setPage(1); }}
        />
      </div>
    );
  },
};

export const FullLarge: Story = {
  name: 'Full — Large',
  parameters: { layout: 'padded' },
  render: () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    return (
      <div style={{ width: '100%' }}>
        <Pagination
          type="full"
          total={100}
          size="large"
          page={page}
          itemsPerPage={perPage}
          onPageChange={setPage}
          onItemsPerPageChange={v => { setPerPage(v); setPage(1); }}
        />
      </div>
    );
  },
};

export const FullControlled: Story = {
  name: 'Full — Controlled',
  parameters: { layout: 'padded' },
  render: () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#767676', fontFamily: 'sans-serif' }}>
          Page <strong>{page}</strong> · {perPage} per page
        </p>
        <Pagination
          type="full"
          total={235}
          page={page}
          itemsPerPage={perPage}
          onPageChange={setPage}
          onItemsPerPageChange={v => { setPerPage(v); setPage(1); }}
        />
      </div>
    );
  },
};

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, fontFamily: 'var(--ds-font-family-body)' }}>
      <section>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#767676', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>
          Compact Pagination
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(['default', 'large'] as const).flatMap(size =>
            ([true, false] as const).map(autoPlay => (
              <div key={`${size}-${autoPlay}`} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ width: 220, fontSize: 12, color: '#767676' }}>
                  {size} / autoPlay={String(autoPlay)}
                </span>
                <Pagination
                  type="compact"
                  count={9}
                  size={size}
                  autoPlay={autoPlay}
                  autoPlayInterval={10000}
                />
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#767676', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>
          Full Pagination
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {(['default', 'large'] as const).map(size => (
            <div key={size}>
              <p style={{ fontSize: 12, color: '#767676', marginBottom: 8 }}>{size}</p>
              <Pagination type="full" total={100} size={size} defaultPage={1} defaultItemsPerPage={10} />
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
