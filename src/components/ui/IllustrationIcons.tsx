import React from 'react';

export const MoonIcon = ({ className = "w-12 h-12 text-gold" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    <path d="M19 3v4M21 5h-4" className="animate-pulse" />
  </svg>
);

export const CrystalIcon = ({ className = "w-12 h-12 text-crystal" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 2-8 6 2 11 6 3 6-3 2-11-8-6Z" />
    <path d="M12 2v20" />
    <path d="m4 8 8 5 8-5" />
    <path d="M6 19 12 13 18 19" />
  </svg>
);

export const TarotCardsIcon = ({ className = "w-12 h-12 text-gold" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="5" width="8" height="14" rx="1" transform="rotate(-10 3 5)" />
    <rect x="11" y="4" width="8" height="14" rx="1" transform="rotate(5 11 4)" />
    <circle cx="15" cy="11" r="2" />
    <path d="m13 14 2-3 2 3" />
  </svg>
);

export const CrownIcon = ({ className = "w-12 h-12 text-gold" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
    <path d="M3 20h18" />
  </svg>
);

export const GemIcon = ({ className = "w-12 h-12 text-crystal" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 3h12l4 6-10 12L2 9z" />
    <path d="M11 3 8 9l4 12" />
    <path d="M13 3l3 6-4 12" />
    <path d="M2 9h20" />
  </svg>
);

export const StarSparkleIcon = ({ className = "w-12 h-12 text-gold" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <circle cx="5" cy="5" r="1" className="animate-ping" />
    <circle cx="19" cy="19" r="1" className="animate-ping" />
  </svg>
);

export const HandsIcon = ({ className = "w-12 h-12 text-rose" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8a6 6 0 0 0-12 0c0 2.2 1.3 4.5 3 6.5l3 3.5 3-3.5c1.7-2 3-4.3 3-6.5z" />
    <circle cx="12" cy="8" r="2" />
    <path d="M8 12h8" />
  </svg>
);
