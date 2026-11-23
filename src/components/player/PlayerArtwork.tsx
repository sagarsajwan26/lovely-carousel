'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Song } from '@/types/song';

interface PlayerArtworkProps {
  song: Song;
  nextSongCover?: string;
  direction?: number;
  onTogglePlay: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.22 },
      scale: { duration: 0.22 },
    },
  }),
};

export const PlayerArtwork = memo(function PlayerArtwork({
  song,
  nextSongCover,
  direction = 1,
  onTogglePlay,
  onNext,
  onPrev,
}: PlayerArtworkProps) {
  return (
    <div className="w-full flex justify-center mt-2 relative select-none">
      {/* Preload Next Track's Image in background for Instant Zero-Lag Transitions */}
      {nextSongCover && (
        <link rel="preload" as="image" href={nextSongCover} />
      )}

      <div className="relative w-full aspect-square rounded-[38px] overflow-hidden border-[3px] border-white/35 shadow-[0_16px_45px_rgba(255,45,108,0.35),inset_0_2px_12px_rgba(255,255,255,0.35)] bg-[#180B24]/95 backdrop-blur-md transform-gpu contain-paint">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={song.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.22}
            onDragEnd={(_, info) => {
              if (info.offset.x < -45 || info.velocity.x < -300) {
                onNext?.();
              } else if (info.offset.x > 45 || info.velocity.x > 300) {
                onPrev?.();
              } else if (Math.abs(info.offset.x) < 5) {
                onTogglePlay();
              }
            }}
            onClick={onTogglePlay}
            className="relative w-full h-full cursor-grab active:cursor-grabbing group will-change-transform transform-gpu"
          >
            {/* Cover Image: Responsive, AVIF/WebP enabled, optimized quality */}
            <Image
              src={song.coverImage}
              alt={song.title}
              fill
              priority
              quality={80}
              sizes="(max-width: 640px) 90vw, 380px"
              className="object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700"
            />

            {/* Specular Liquid Glass Rim Highlight */}
            <div className="absolute inset-0 rounded-[35px] pointer-events-none ring-1 ring-inset ring-white/50 bg-gradient-to-tr from-black/60 via-transparent to-white/30" />

            {/* Dark Vignette Overlay for Typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

            {/* Top Text: ORIGINAL SCORE FROM THE... */}
            <div className="absolute top-5 left-5 right-5 text-left pointer-events-none">
              <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-pink-300 font-bold block drop-shadow-md">
                ORIGINAL SCORE FROM THE
              </span>
              <span className="text-[10px] text-white/90 tracking-wider uppercase font-semibold">
                {song.album}
              </span>
            </div>

            {/* Bottom Floating Music Badge with Heart */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#FF2D6C] animate-ping" />
                <span className="text-[10px] font-mono tracking-widest text-pink-200 uppercase font-semibold">
                  Romantic Session
                </span>
              </div>
              <span className="text-white/80 font-mono text-xs tracking-wider">
                {song.mood}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});
