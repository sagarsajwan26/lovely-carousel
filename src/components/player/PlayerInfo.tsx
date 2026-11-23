'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Song } from '@/types/song';

interface PlayerInfoProps {
  song: Song;
}

export const PlayerInfo = memo(function PlayerInfo({ song }: PlayerInfoProps) {
  return (
    <div className="w-full text-left mt-3.5 select-none contain-layout">
      {/* 1. Song Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
        {song.title}
      </h1>

      {/* 2. Artist Name */}
      <p className="text-sm font-medium text-white/70 mt-0.5">
        {song.artist}
      </p>

      {/* 3. Romantic Cursive Italic Quote with Shared layoutId for Smooth Landing Animation */}
      <motion.div
        layoutId="romantic-quote"
        transition={{ type: 'spring', damping: 26, stiffness: 170 }}
        className="mt-1.5"
      >
        <p className="font-serif italic text-pink-200/90 text-sm leading-snug drop-shadow-sm flex flex-wrap items-center gap-x-1.5">
          <span>
            &ldquo;ke itna ameer toh nhi ki teri sari khawais poori kar saku, par maage tu toh waqt sara tere naam krdu&rdquo;
          </span>
          <span className="text-pink-300 font-normal text-xs whitespace-nowrap">- sagar ♡</span>
        </p>
      </motion.div>
    </div>
  );
});
