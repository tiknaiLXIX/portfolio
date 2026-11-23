// Small inline SVG icon set (stroke icons, inherit currentColor).
const PATHS = {
  download: <><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  up: <><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  x: <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>,
  play: <path d="M8 5.5v13l10-6.5z" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10.5V17" />
      <path d="M8 7.2v.1" />
      <path d="M12 17v-3.8a2.2 2.2 0 0 1 4.4 0V17" />
      <path d="M12 10.5V17" />
    </>
  ),
};

export function Icon({ name, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
