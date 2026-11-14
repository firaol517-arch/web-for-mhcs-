import React from 'react';

interface McsfLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const McsfLogo: React.FC<McsfLogoProps> = ({ size = 'md', className = '' }) => {
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
