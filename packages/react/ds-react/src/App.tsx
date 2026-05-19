import './App.css';
import { Button } from './components/Button/Button';
import type { ButtonVariant } from './components/Button/Button';

const VARIANT_GROUPS: { label: string; variants: ButtonVariant[] }[] = [
  {
    label: 'Brand',
    variants: ['primary', 'secondary', 'tertiary'],
  },
  {
    label: 'Mono',
    variants: ['mono-primary', 'mono-secondary', 'mono-tertiary'],
  },
  {
    label: 'Destructive',
    variants: ['destructive', 'destructive-secondary', 'destructive-tertiary'],
  },
  {
    label: 'Text',
    variants: ['text', 'text-mono', 'text-destructive'],
  },
];

const SIZES = ['sm', 'md', 'lg', 'xl'] as const;

function variantLabel(v: ButtonVariant) {
  return v.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function App() {
  return (
    <main className="showcase">
      <header className="showcase-header">
        <h1>Button</h1>
        <p className="showcase-subtitle">
          12 variants × 4 sizes × loading + disabled states
        </p>
      </header>

      {/* Sizes */}
      <section className="showcase-section">
        <h2>Sizes</h2>
        <div className="showcase-row">
          {SIZES.map((size) => (
            <Button key={size} variant="primary" size={size}>
              {size.toUpperCase()}
            </Button>
          ))}
        </div>
      </section>

      {/* All variants */}
      {VARIANT_GROUPS.map((group) => (
        <section key={group.label} className="showcase-section">
          <h2>{group.label}</h2>
          <div className="variant-grid">
            <div className="variant-grid-header">
              <span />
              {SIZES.map((s) => (
                <span key={s} className="grid-size-label">{s}</span>
              ))}
              <span className="grid-size-label">disabled</span>
              <span className="grid-size-label">loading</span>
            </div>
            {group.variants.map((variant) => (
              <div key={variant} className="variant-grid-row">
                <span className="variant-label">{variantLabel(variant)}</span>
                {SIZES.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    Label
                  </Button>
                ))}
                <Button variant={variant} size="md" disabled>
                  Label
                </Button>
                <Button variant={variant} size="md" loading>
                  Label
                </Button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
