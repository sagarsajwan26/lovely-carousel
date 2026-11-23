'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { Song } from '@/types/song';
import { Play } from 'lucide-react';

interface PlayerNextUpProps {
  nextSong: Song;
  onPlayNext: () => void;
  onOpenPlaylist: () => void;
}

export const PlayerNextUp = memo(function PlayerNextUp({
  nextSong,
  onPlayNext,
  onOpenPlaylist,
}: PlayerNextUpProps) {
  return (
    <div
      onClick={onPlayNext}
      className="w-full rounded-2xl bg-[#1D0C2E]/85 hover:bg-[#25103A]/90 active:scale-[0.99] cursor-pointer border border-white/20 p-2.5 mt-3 flex items-center justify-between shadow-lg select-none transform-gpu contain-paint transition-all group"
      title="Click to play next song"
    >
      {/* 1. Left Thumbnail & Track Info */}
      <div className="flex items-center gap-2.5 truncate flex-1 mr-2 pointer-events-none">
        <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/20 flex-shrink-0 bg-black/40">
          <Image
            src={nextSong.coverImage}
            alt={nextSong.title}
            fill
            sizes="40px"
            quality={75}
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="truncate text-left">
          <span className="text-[9px] font-mono text-white/50 uppercase tracking-wider block">
            Next Song
          </span>
          <span className="text-xs font-bold text-white truncate block">
            {nextSong.title}
          </span>
          <span className="text-[10px] text-white/60 truncate block">
            {nextSong.artist}
          </span>
        </div>
      </div>

      {/* 2. Right Action Controls */}
      <div className="flex items-center gap-2">
        {/* Play Next Pill Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlayNext();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF2D6C] hover:bg-[#FF4B7A] text-white text-xs font-semibold border border-white/25 active:scale-90 transition-all shadow-md transform-gpu"
          title="Play next song immediately"
        >
          <Play className="w-3 h-3 fill-white" />
          <span>Play Next</span>
        </button>

        {/* Circular Playlist Menu Button (≡) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenPlaylist();
          }}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors border border-white/15 active:scale-90 transform-gpu"
          aria-label="Open Playlist"
          title="Open full playlist"
        >
          <span className="text-sm leading-none font-bold">≡</span>
        </button>
      </div>
    </div>
  );
});
