import type { ButtonHTMLAttributes } from 'react';
import styles from './StatusIconButton.module.css';
import {
  StatusPendingIcon,
  StatusInProgressIcon,
  StatusCompletedIcon,
  StatusApprovedIcon,
  StatusExcludedIcon,
  StatusInReviewIcon,
  StatusRevisionRequestedIcon,
} from '../Icon/CustomIcons';

export type StatusIconButtonStatus =
  | 'pending'
  | 'in-progress'
  | 'completed'
  | 'approved'
  | 'excluded'
  | 'review'
  | 'revision';

export type StatusIconButtonSize = 's' | 'm' | 'l' | 'xl';

export interface StatusIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  status: StatusIconButtonStatus;
  size?: StatusIconButtonSize;
  /** Defaults to the human-readable status label if omitted */
  'aria-label'?: string;
}

type CustomIconComponent = (props: { size?: number }) => JSX.Element;

const STATUS_ICON_COMPONENT: Record<StatusIconButtonStatus, CustomIconComponent> = {
  'pending':     StatusPendingIcon,
  'in-progress': StatusInProgressIcon,
  'completed':   StatusCompletedIcon,
  'approved':    StatusApprovedIcon,
  'excluded':    StatusExcludedIcon,
  'review':      StatusInReviewIcon,
  'revision':    StatusRevisionRequestedIcon,
};

const STATUS_LABEL: Record<StatusIconButtonStatus, string> = {
  'pending':     'Pending',
  'in-progress': 'In Progress',
  'completed':   'Completed',
  'approved':    'Approved',
  'excluded':    'Excluded',
  'review':      'In Review',
  'revision':    'Revision Requested',
};

const SIZE_PX: Record<StatusIconButtonSize, number> = {
  s:  16,
  m:  20,
  l:  24,
  xl: 32,
};

export function StatusIconButton({
  status,
  size = 'l',
  disabled,
  'aria-label': ariaLabel,
  className = '',
  ...rest
}: StatusIconButtonProps) {
  const IconComponent = STATUS_ICON_COMPONENT[status];
  return (
    <button
      data-status={status}
      data-size={size}
      className={[styles.statusIconButton, className].filter(Boolean).join(' ')}
      disabled={disabled}
      aria-label={ariaLabel ?? STATUS_LABEL[status]}
      {...rest}
    >
      <IconComponent size={SIZE_PX[size]} />
    </button>
  );
}
