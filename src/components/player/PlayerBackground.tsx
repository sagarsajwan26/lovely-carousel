'use client';

import React, { memo } from 'react';
import Image from 'next/image';

interface PlayerBackgroundProps {
  activeCoverImage?: string;
}

/**
 * Ultra-High-Performance Player Background
 * Eliminates stacked runtime CSS blur filters and multi-pass framebuffers for silky-smooth 60-120fps.
 */
export const PlayerBackground = memo(function PlayerBackground({
  activeCoverImage,
}: PlayerBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu select-none">
      {/* 1. Base Romantic Wallpaper */}
      <Image
        src="/images/wallpaper.png"
        alt="Romantic Liquid Glass Wallpaper"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-center pointer-events-none select-none"
      />

      {/* 2. Soft Tinted Romantic Vignette (Zero GPU Blur Overhead) */}
      <div className="absolute inset-0 bg-[#12071C]/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12071C] via-transparent to-[#12071C]/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(18,7,28,0.7)_100%)]" />
    </div>
  );
});
