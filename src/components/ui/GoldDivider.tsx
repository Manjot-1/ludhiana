import React from 'react';

export default function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <div id="gold-divider" className={`flex items-center justify-center space-x-4 my-8 ${className}`}>
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold opacity-60"></div>
      <span className="text-gold text-lg select-none">✦</span>
      <div className="h-[1px] w-8 bg-gold opacity-40"></div>
      <span className="text-gold text-lg select-none">✦</span>
      <div className="h-[1px] w-8 bg-gold opacity-40"></div>
      <span className="text-gold text-lg select-none">✦</span>
      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold opacity-60"></div>
    </div>
  );
}
