import React from 'react';

// Maps DS size tokens to optical size + px dimensions.
// Material Symbols' `font-size` drives the rendered size;
// `font-variation-settings: 'opsz'` keeps stroke weight proportional.
const SIZE_MAP = {
  xs: { fontSize: 16, opsz: 16 },
  s:  { fontSize: 20, opsz: 20 },
  m:  { fontSize: 24, opsz: 24 },
  l:  { fontSize: 32, opsz: 32 },
  xl: { fontSize: 40, opsz: 40 },
} as const;

export type IconSize   = keyof typeof SIZE_MAP;
export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;
export type IconFill   = 0 | 1;
export type IconGrade  = -25 | 0 | 200;

export interface IconProps {
  /** Material Symbols icon name in snake_case, e.g. "arrow_forward" */
  name: string;
  size?: IconSize;
  weight?: IconWeight;
  fill?: IconFill;
  grade?: IconGrade;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function Icon({
  name,
  size = 'm',
  weight = 500,
  fill = 1,
  grade = 0,
  color,
  className,
  style,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: IconProps) {
  const { fontSize, opsz } = SIZE_MAP[size];

  return (
    <span
      className={`material-symbols-rounded${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
      style={{
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opsz}`,
        fontSize,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        flexShrink: 0,
        color: color ?? 'currentColor',
        ...style,
      }}
    >
      {name}
    </span>
  );
}
