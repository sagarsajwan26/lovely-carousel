'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Song } from '@/types/song';
import { ROMANTIC_SONGS } from '@/data/songs';

interface PlayerDrawerProps {
  isOpen: boolean;
  activeSongId: string;
  onClose: () => void;
  onSelectSong: (index: number, song: Song) => void;
}

const SongItemRow = memo(function SongItemRow({
  item,
  index,
  isCurrent,
  onSelect,
}: {
  item: Song;
  index: number;
  isCurrent: boolean;
  onSelect: (index: number, song: Song) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index, item)}
      className={`w-full flex items-center gap-3 p-2 rounded-2xl transition-all text-left transform-gpu [content-visibility:auto] [contain-intrinsic-size:56px] ${
        isCurrent
          ? 'bg-[#FF2D6C]/25 border border-[#FF2D6C]/50'
          : 'hover:bg-white/10 active:bg-white/15'
      }`}
    >
      <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/20 flex-shrink-0">
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          sizes="44px"
          quality={70}
          className="object-cover"
        />
      </div>
      <div className="truncate flex-1">
        <span className={`text-xs block font-bold ${isCurrent ? 'text-pink-300' : 'text-white'}`}>
          {item.title}
        </span>
        <span className="text-[10px] text-white/60 block truncate">
          {item.artist} • {item.mood}
        </span>
      </div>
      {isCurrent && (
        <span className="text-xs text-[#FF2D6C] font-bold">Playing</span>
      )}
    </button>
  );
});

export const PlayerDrawer = memo(function PlayerDrawer({
  isOpen,
  activeSongId,
  onClose,
  onSelectSong,
}: PlayerDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end p-4 transform-gpu select-none"
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="bg-[#1C0D28] border border-white/20 rounded-3xl p-5 max-h-[75vh] overflow-hidden flex flex-col max-w-[420px] mx-auto w-full shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-bold text-base text-white">Full Song Archive</h3>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-white/60 hover:text-white px-2.5 py-1 rounded-full bg-white/10 active:scale-95 transition-transform"
              >
                Close ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 py-3 pr-1 overscroll-contain">
              {ROMANTIC_SONGS.map((item, idx) => (
                <SongItemRow
                  key={item.id}
                  item={item}
                  index={idx}
                  isCurrent={item.id === activeSongId}
                  onSelect={onSelectSong}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
