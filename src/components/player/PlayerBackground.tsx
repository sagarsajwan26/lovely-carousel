'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayerBackgroundProps {
  activeCoverImage?: string;
}

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
        className="object-cover object-center pointer-events-none select-none opacity-90"
      />

      {/* 2. Dynamic Ambient Romantic Backdrop Layer (Cross-fading with Active Song Artwork) */}
      <AnimatePresence mode="popLayout">
        {activeCoverImage && (
          <motion.div
            key={activeCoverImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.38 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 transform-gpu"
          >
            <Image
              src={activeCoverImage}
              alt="Song Romantic Backdrop"
              fill
              quality={65}
              sizes="100vw"
              className="object-cover object-center pointer-events-none filter blur-[1.5px] scale-105"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Soft Romantic Vignette Overlays for High Contrast & Readability */}
      <div className="absolute inset-0 bg-[#12071C]/35 backdrop-blur-[0.5px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12071C] via-transparent to-[#12071C]/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(18,7,28,0.7)_100%)]" />
    </div>
  );
});
