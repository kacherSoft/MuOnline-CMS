/**
 * Toast Notification System
 * MuOnline-themed toast notifications with animations
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const toastVariants = cva(
  'relative flex items-center gap-3 rounded-lg border p-4 shadow-xl backdrop-blur-sm min-w-[300px] max-w-md animate-slide-in-right',
  {
    variants: {
      variant: {
        success: 'border-green-500/50 bg-green-500/10 text-green-100',
        error: 'border-red-500/50 bg-red-500/10 text-red-100',
        warning: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-100',
        info: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-100',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, onClose, autoClose = true, duration = 5000, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
      if (autoClose && duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [autoClose, duration]);

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    };

    const icons = {
      success: <CheckCircle className="h-5 w-5 text-green-400" />,
      error: <AlertCircle className="h-5 w-5 text-red-400" />,
      warning: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
      info: <Info className="h-5 w-5 text-cyan-400" />,
    };

    return (
      <div
        ref={ref}
        className={cn(
          toastVariants({ variant }),
          !isVisible && 'animate-slide-out-right',
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className="flex-shrink-0">{icons[variant || 'info']}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-semibold text-sm">{title}</p>
          )}
          {description && (
            <p className="text-sm opacity-90 mt-0.5">{description}</p>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Progress bar */}
        {autoClose && duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-current opacity-30">
            <div
              className="h-full bg-current"
              style={{
                animation: `toastProgress ${duration}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

interface ToastData {
  id: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          title={toast.title}
          description={toast.description}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export { Toast, toastVariants };
export default Toast;
