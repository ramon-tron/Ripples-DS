import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import styles from './Toast.module.css';

// ─── Public types ─────────────────────────────────────────────────────────────

export type ToastType = 'default' | 'success' | 'destructive' | 'informational' | 'alert';

export interface ToastProps {
  title: string;
  description?: string;
  type?: ToastType;
  /**
   * When true the close button is shown and the toast persists until the user
   * closes it. When false the toast auto-dismisses after `duration` ms.
   * @default false
   */
  dismissible?: boolean;
  /**
   * Auto-dismiss delay in ms. Minimum enforced: 10 000. Ignored when dismissible=true.
   * @default 10000
   */
  duration?: number;
}

// ─── Internal ─────────────────────────────────────────────────────────────────

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  dismissible: boolean;
  duration: number;
  exiting: boolean;
}

interface ToastContextValue {
  addToast: (props: ToastProps) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TYPE_ICON: Record<ToastType, string | null> = {
  success:       'check_circle',
  destructive:   'cancel',
  informational: 'info',
  alert:         'error',
  default:       null,
};

const MIN_DURATION  = 10_000;
const EXIT_DURATION = 220;

// ─── Toast bubble (presentational) ───────────────────────────────────────────

interface ToastBubbleProps extends ToastProps {
  onDismiss?: () => void;
}

export function Toast({
  title,
  description,
  type = 'default',
  dismissible = false,
  onDismiss,
}: ToastBubbleProps) {
  const iconName = TYPE_ICON[type];

  const bubbleClass = [
    styles.toast,
    type === 'default'       ? styles.toastDefault       : undefined,
    type === 'success'       ? styles.typeSuccess        : undefined,
    type === 'destructive'   ? styles.typeDestructive    : undefined,
    type === 'informational' ? styles.typeInformational  : undefined,
    type === 'alert'         ? styles.typeAlert          : undefined,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={bubbleClass}
      role={type === 'destructive' || type === 'alert' ? 'alert' : 'status'}
    >
      <div className={styles.left}>
        {iconName && (
          <span className={styles.iconWrap}>
            <Icon name={iconName} size="s" aria-hidden />
          </span>
        )}
        <div className={styles.textCol}>
          <span className={styles.title}>{title}</span>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
      {dismissible && (
        <IconButton
          icon="close"
          variant="inverse"
          size="xs"
          shape="circular"
          aria-label="Dismiss notification"
          onClick={onDismiss}
        />
      )}
    </div>
  );
}

// ─── ToastProvider ────────────────────────────────────────────────────────────

export function ToastProvider({ children, portalTheme }: { children: ReactNode; portalTheme?: string }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const startExit = useCallback((id: string) => {
    // Clear any pending auto-dismiss timer
    const existing = timers.current.get(id);
    if (existing) {
      clearTimeout(existing);
      timers.current.delete(id);
    }
    // Start exit animation then remove from DOM
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    const exitTimer = setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
      timers.current.delete(`exit-${id}`);
    }, EXIT_DURATION);
    timers.current.set(`exit-${id}`, exitTimer);
  }, []);

  const addToast = useCallback((props: ToastProps) => {
    const id = crypto.randomUUID();
    const dismissible = props.dismissible ?? false;
    const duration = Math.max(props.duration ?? MIN_DURATION, MIN_DURATION);

    setToasts(prev => [
      ...prev,
      {
        id,
        title: props.title,
        description: props.description,
        type: props.type ?? 'default',
        dismissible,
        duration,
        exiting: false,
      },
    ]);

    if (!dismissible) {
      const t = setTimeout(() => startExit(id), duration);
      timers.current.set(id, t);
    }
  }, [startExit]);

  // Cleanup all timers on unmount
  useEffect(() => {
    const map = timers.current;
    return () => { map.forEach(clearTimeout); };
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className={styles.portal} aria-live="polite" aria-atomic="false" {...(portalTheme ? { 'data-theme': portalTheme } : {})}>
          {toasts.map(item => (
            <div
              key={item.id}
              className={[styles.toastWrapper, item.exiting ? styles.exiting : ''].filter(Boolean).join(' ')}
            >
              <Toast
                title={item.title}
                description={item.description}
                type={item.type}
                dismissible={item.dismissible}
                onDismiss={() => startExit(item.id)}
              />
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

// ─── useToast ─────────────────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a <ToastProvider>');
  return ctx;
}

/** Returns the toast context if a ToastProvider ancestor exists, otherwise null. */
export function useOptionalToast(): ToastContextValue | null {
  return useContext(ToastContext);
}
