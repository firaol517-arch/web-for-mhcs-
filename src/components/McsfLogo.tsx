import React from 'react';

interface McsfLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'emblem' | 'full';
  className?: string;
}

const MCSF_LOGO_SRC = '/assets/aistudio/photo_2026-11-14_11-32-49_25b46ce2.jpg';

export const McsfLogo: React.FC<McsfLogoProps> = ({
  size = 'md',
  variant = 'emblem',
  className = '',
}) => {
  const dimensions = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }[size];

  if (variant === 'full') {
    return (
      <span
        className={`${dimensions} shrink-0 inline-flex items-center justify-center rounded-2xl overflow-hidden bg-black border border-[#EA580C]/80 shadow-md ${className}`}
      >
        <img
          src={MCSF_LOGO_SRC}
          alt="MCSF Fellowship Logo"
          className="w-full h-full object-contain scale-[1.12]"
        />
      </span>
    );
  }

  return (
    <span
      className={`${dimensions} shrink-0 inline-flex items-center justify-center rounded-full overflow-hidden bg-black border-2 border-[#EA580C] shadow-sm ${className}`}
    >
      <img
        src={MCSF_LOGO_SRC}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-contain scale-[1.85] origin-[50%_30%]"
      />
    </span>
  );
};
