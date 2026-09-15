type FlagIconProps = {
  country: 'pl' | 'gb';
};

export default function FlagIcon({ country }: FlagIconProps) {
  if (country === 'pl') {
    return (
      <svg className="language-flag" viewBox="0 0 30 20" aria-hidden="true">
        <rect width="30" height="10" fill="#ffffff" />
        <rect y="10" width="30" height="10" fill="#dc143c" />
      </svg>
    );
  }

  return (
    <svg className="language-flag" viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 60 40M60 0 0 40" stroke="#ffffff" strokeWidth="8" />
      <path d="M0 0 60 40M60 0 0 40" stroke="#c8102e" strokeWidth="4" />
      <path d="M30 0v40M0 20h60" stroke="#ffffff" strokeWidth="13" />
      <path d="M30 0v40M0 20h60" stroke="#c8102e" strokeWidth="7" />
    </svg>
  );
}
