import React from 'react';

interface McsfLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circle' | 'badge';
  className?: string;
}

export const McsfLogo: React.FC<McsfLogoProps> = ({
  size = 'md',
  variant = 'circle',
  className = '',
}) => {
  if (variant === 'badge') {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`w-16 h-16 shrink-0 ${className}`}
      >
        <rect x="1.5" y="1.5" width="61" height="61" rx="15" fill="#0B0B0C" stroke="#EA580C" strokeWidth="2" />
        <rect x="29.6" y="8" width="4.8" height="34" rx="1.2" fill="#FAF6EE" />
        <rect x="23" y="14" width="18" height="4.8" rx="1.2" fill="#FAF6EE" />
        <rect x="24.4" y="26" width="3" height="11" rx="1.5" fill="#FAF6EE" />
        <rect x="19.8" y="29.5" width="3" height="6" rx="1.5" fill="#FAF6EE" />
        <rect x="36.6" y="26" width="3" height="11" rx="1.5" fill="#FAF6EE" />
        <rect x="41.2" y="29.5" width="3" height="6" rx="1.5" fill="#FAF6EE" />
        <text
          x="32"
          y="49"
          textAnchor="middle"
          fontSize="5"
          fontWeight="700"
          fill="#E2D6C3"
          fontFamily="DM Sans, sans-serif"
        >
          MCSF-የኛfellow
        </text>
        <circle cx="25" cy="55" r="1.1" fill="#FB923C" />
        <circle cx="29" cy="55" r="1.1" fill="#FACC15" />
        <circle cx="33" cy="55" r="1.1" fill="#FB923C" />
        <circle cx="37" cy="55" r="1.1" fill="#FACC15" />
      </svg>
    );
  }

  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  }[size];

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`${dimensions} shrink-0 ${className}`}
    >
      {/* Obsidian emblem base */}
      <circle cx="32" cy="32" r="30" fill="#0B0B0C" stroke="#EA580C" strokeWidth="2.5" />

      {/* Cross */}
      <rect x="29.5" y="11" width="5" height="42" rx="1.2" fill="#FAF6EE" />
      <rect x="22" y="18.5" width="20" height="5" rx="1.2" fill="#FAF6EE" />

      {/* Worship / voice bars flanking the cross */}
      <rect x="24" y="34" width="3" height="11" rx="1.5" fill="#FAF6EE" />
      <rect x="19.5" y="37.5" width="3" height="6" rx="1.5" fill="#FAF6EE" />
      <rect x="37" y="34" width="3" height="11" rx="1.5" fill="#FAF6EE" />
      <rect x="41.5" y="37.5" width="3" height="6" rx="1.5" fill="#FAF6EE" />
    </svg>
  );
};
