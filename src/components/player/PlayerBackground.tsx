'use client';

import React, { memo } from 'react';
import Image from 'next/image';

export const PlayerBackground = memo(function PlayerBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
      {/* 1. Wallpaper Background Image with Production Sizes & Quality */}
      <Image
        src="/images/wallpaper.png"
        alt="Romantic Liquid Glass Wallpaper"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-center pointer-events-none select-none"
      />

      {/* 2. Soft Ambient Vignette for High Contrast & Readability */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
    </div>
  );
});
