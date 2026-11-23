'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayerBackgroundProps {
  activeCoverImage?: string;
}

/**
 * Atmospheric Romantic Background with Dynamic Cover Art Blending
 * - Blends the base romantic liquid-glass wallpaper with the active song's artwork
 * - Cross-fades seamlessly when tracks change with soft romantic blur and vignette
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
        className="object-cover object-center pointer-events-none select-none opacity-85"
      />

      {/* 2. Dynamic Ambient Song Artwork Layer (Smooth Cross-fade Blending) */}
      <AnimatePresence>
        {activeCoverImage && (
          <motion.div
            key={activeCoverImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 transform-gpu overflow-hidden pointer-events-none"
          >
            <Image
              src={activeCoverImage}
              alt="Song Romantic Backdrop"
              fill
              priority
              quality={70}
              sizes="100vw"
              className="object-cover object-center pointer-events-none select-none scale-105 filter blur-[2px]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Soft Romantic Tint & Vignette Overlays for Contrast & Readability */}
      <div className="absolute inset-0 bg-[#12071C]/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12071C] via-transparent to-[#12071C]/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(18,7,28,0.7)_100%)] pointer-events-none" />
    </div>
  );
});
