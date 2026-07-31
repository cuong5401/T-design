export function LaundryTypeIcon({ type, className = "" }) {
  const iconClassName = `laundry-type-icon${className ? ` ${className}` : ""}`;

  if (type === "dry") {
    return (
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="5" y="3.75" width="14" height="16.5" rx="1.8" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12.3" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 12.3c1.1-1.15 2.95-1.15 4.05 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="8.6" cy="6.6" r="0.8" fill="currentColor" />
        <circle cx="11.2" cy="6.6" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="5" y="3.75" width="14" height="16.5" rx="1.8" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12.8" r="4.55" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8.6 12.5c1.35-1.05 2.7-1.05 4.05 0 1 .76 2 .78 3.05.05" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
      <path d="M8.4 6.6h2.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="14.9" cy="6.6" r="0.85" fill="currentColor" />
    </svg>
  );
}
