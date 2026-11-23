'use client';

import React, { memo } from 'react';
import { Home, Music, Heart } from 'lucide-react';

interface PlayerBottomNavProps {
  isFavorited: boolean;
  onOpenPlaylist: () => void;
  onToggleFavorite: () => void;
}

export const PlayerBottomNav = memo(function PlayerBottomNav({
  isFavorited,
  onOpenPlaylist,
  onToggleFavorite,
}: PlayerBottomNavProps) {
  return (
    <nav className="fixed bottom-3 left-6 right-6 z-40 max-w-[320px] mx-auto rounded-full bg-[#180A26]/90 border border-white/20 px-8 py-2.5 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.6)] select-none transform-gpu contain-paint">
      {/* 1. Home (Active with Hot Pink Glow) */}
      <button
        type="button"
        className="flex flex-col items-center gap-0.5 text-xs font-medium text-[#FF2D6C] active:scale-90 transition-transform transform-gpu"
        title="Home"
      >
        <Home className="w-4 h-4 text-[#FF2D6C]" />
        <span className="text-[10px] text-[#FF2D6C] font-semibold">Home</span>
      </button>

      {/* 2. Playlist */}
      <button
        type="button"
        onClick={onOpenPlaylist}
        className="flex flex-col items-center gap-0.5 text-xs font-medium text-white/70 hover:text-white active:scale-90 transition-all transform-gpu"
        title="Playlist"
      >
        <Music className="w-4 h-4" />
        <span className="text-[10px]">Playlist</span>
      </button>

      {/* 3. Favorites */}
      <button
        type="button"
        onClick={onToggleFavorite}
        className="flex flex-col items-center gap-0.5 text-xs font-medium text-white/70 hover:text-white active:scale-90 transition-all transform-gpu"
        title="Favorites"
      >
        <Heart className={`w-4 h-4 ${isFavorited ? 'text-[#FF4B7A] fill-[#FF4B7A]' : ''}`} />
        <span className="text-[10px]">Favorites</span>
      </button>
    </nav>
  );
});
