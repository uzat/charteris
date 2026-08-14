interface TransientBannerProps {
  message: string;
  detail: string;
  onDismiss: () => void;
}

export default function TransientBanner({ message, detail, onDismiss }: TransientBannerProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="rounded-lg bg-navy-dark border border-sand/20 px-4 py-3 flex items-start justify-between gap-3"
    >
      <div>
        <p className="text-sm font-semibold text-sand">{message}</p>
        <p className="mt-0.5 text-xs text-sand/60">{detail}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="shrink-0 text-sand/40 hover:text-sand/70 transition-colors text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
