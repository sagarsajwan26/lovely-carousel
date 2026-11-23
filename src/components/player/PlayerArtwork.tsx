'use client';

import React, { memo, useRef } from 'react';
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
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.22,
      ease: [0.25, 1, 0.5, 1],
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
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff < -40) {
      onNext?.();
    } else if (diff > 40) {
      onPrev?.();
    }
    touchStartX.current = null;
  };

  return (
    <div className="w-full flex justify-center mt-2 relative select-none">

      {nextSongCover && (
        <link rel="preload" as="image" href={nextSongCover} />
      )}

      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={onTogglePlay}
        className="relative w-full aspect-square rounded-[36px] overflow-hidden border-[2.5px] border-white/30 shadow-[0_12px_40px_rgba(255,45,108,0.25),inset_0_1px_8px_rgba(255,255,255,0.3)] bg-[#1A0B28] cursor-pointer transform-gpu contain-paint"
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={song.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative w-full h-full will-change-transform transform-gpu"
          >

            <Image
              src={song.coverImage}
              alt={song.title}
              fill
              priority
              quality={80}
              sizes="(max-width: 640px) 90vw, 380px"
              className="object-cover pointer-events-none"
            />

            <div className="absolute inset-0 rounded-[34px] pointer-events-none ring-1 ring-inset ring-white/40 bg-gradient-to-tr from-black/50 via-transparent to-white/20" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 pointer-events-none" />

            <div className="absolute top-4 left-5 right-5 text-left pointer-events-none">
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-pink-300 font-bold block drop-shadow-sm">
                ORIGINAL SCORE FROM THE
              </span>
              <span className="text-[10px] text-white/90 tracking-wider uppercase font-semibold">
                {song.album}
              </span>
            </div>

            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#FF2D6C]" />
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
