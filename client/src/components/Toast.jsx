import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ type = 'info', message, onClose }) {
  if (!message) return null;

  const styles = {
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
    error: 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400',
    info: 'bg-brand-500/10 border-brand-500/30 text-brand-700 dark:text-brand-300',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />,
    info: <Info className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />,
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md max-w-md animate-fade-in ${styles[type] || styles.info}`}>
      {icons[type] || icons.info}
      <div className="flex-1 text-sm leading-relaxed font-medium">
        {message}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
