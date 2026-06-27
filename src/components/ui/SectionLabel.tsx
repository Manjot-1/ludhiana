import React from 'react';

interface SectionLabelProps {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className = '' }: SectionLabelProps) {
  return (
    <div id="section-label" className={`text-center ${className}`}>
      <span className="font-display italic text-gold tracking-[0.3em] text-sm md:text-base uppercase select-none block mb-2">
        {label}
      </span>
    </div>
  );
}
