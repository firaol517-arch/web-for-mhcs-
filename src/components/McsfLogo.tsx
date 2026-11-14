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
      {/* Obsidian Emblem Base */}
      <circle cx="32" cy="32" r="30" fill="#0B0B0C" stroke="#EA580C" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="25.5" stroke="#FAF6EE" strokeOpacity="0.22" strokeWidth="1" />

      {/* Christian Cross Centerpiece */}
      <path
        d="M29.5 13H34.5V23.5H45V28.5H34.5V43.5H29.5V28.5H19V23.5H29.5V13Z"
        fill="#FAF6EE"
      />

      {/* Medical Stethoscope / Care Pulse Arc */}
      <path
        d="M17.5 34.5C17.5 43.2 24 49.5 32 49.5C40 49.5 46.5 43.2 46.5 34.5"
        stroke="#FB923C"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="17.5" cy="34.5" r="2.2" fill="#FB923C" />
      <circle cx="46.5" cy="34.5" r="2.2" fill="#FB923C" />
      <circle cx="32" cy="50" r="3" fill="#EA580C" stroke="#FAF6EE" strokeWidth="1.2" />
    </svg>
  );
};
