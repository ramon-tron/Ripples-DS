import type { CSSProperties } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './TranscriptAvatar.module.css';

export type TranscriptSpeaker =
  | 's1' | 's2' | 's3' | 's4' | 's5'
  | 's6' | 's7' | 's8' | 's9' | 's10'
  | 'gemini' | 'google-assistant' | 'alexa' | 'car' | 'phone';

export interface TranscriptAvatarProps {
  speaker: TranscriptSpeaker;
  className?: string;
  style?: CSSProperties;
}

const HUMAN_LABEL: Record<string, string> = {
  s1: 'S1', s2: 'S2', s3: 'S3', s4: 'S4', s5: 'S5',
  s6: 'S6', s7: 'S7', s8: 'S8', s9: 'S9', s10: 'S10',
};

// Brand logos served from public/icons/ as SVG for crisp rendering at any size
const BRAND_ICON: Record<string, string> = {
  'gemini':           '/icons/gemini.svg',
  'google-assistant': '/icons/google-assistant.svg',
  'alexa':            '/icons/alexa.svg',
};

// Device/system icons using Material Symbols
const DEVICE_ICON: Record<string, string> = {
  'car':   'directions_car',
  'phone': 'smartphone',
};

const HUMAN_SPEAKERS = new Set(Object.keys(HUMAN_LABEL));

const SPEAKER_LABELS: Record<string, string> = {
  'gemini':           'Google Gemini',
  'google-assistant': 'Google Assistant',
  'alexa':            'Amazon Alexa',
  'car':              'Car',
  'phone':            'Phone',
};

export function TranscriptAvatar({ speaker, className = '', style }: TranscriptAvatarProps) {
  const isHuman = HUMAN_SPEAKERS.has(speaker);

  if (isHuman) {
    return (
      <span
        style={style}
        className={[styles.avatar, styles[speaker], className].filter(Boolean).join(' ')}
        role="img"
        aria-label={`Speaker ${speaker.slice(1)}`}
      >
        <span className={styles.label} aria-hidden="true">
          {HUMAN_LABEL[speaker]}
        </span>
      </span>
    );
  }

  const brandSrc = BRAND_ICON[speaker];

  return (
    <span
      style={style}
      className={[styles.avatar, styles.device, className].filter(Boolean).join(' ')}
      role="img"
      aria-label={SPEAKER_LABELS[speaker] ?? speaker}
    >
      {brandSrc ? (
        <img src={brandSrc} alt="" width={20} height={20} aria-hidden />
      ) : (
        <Icon name={DEVICE_ICON[speaker]} size="s" aria-hidden />
      )}
    </span>
  );
}
