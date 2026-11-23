'use client';

import React, { memo, useCallback } from 'react';
import { useAudioStore } from '@/lib/audioStore';
import { formatTime } from '@/lib/utils';
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
} from 'lucide-react';

interface PlayerControlsProps {
  isShuffle: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleShuffle: () => void;
  onSeek: (time: number) => void;
}

export const PlayerControls = memo(function PlayerControls({
  isShuffle,
  onTogglePlay,
  onNext,
  onPrev,
  onToggleShuffle,
  onSeek,
}: PlayerControlsProps) {
  const currentTime = useAudioStore((s) => s.currentTime);
  const duration = useAudioStore((s) => s.duration);
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const repeat = useAudioStore((s) => s.repeat);
  const toggleRepeat = useAudioStore((s) => s.toggleRepeat);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      onSeek(val);
    },
    [onSeek]
  );

  return (
    <div className="w-full mt-4 pointer-events-auto select-none contain-layout">
      {/* 1. Liquid Scrubber / Progress Bar */}
      <div className="relative flex items-center w-full">
        <input
          type="range"
          min="0"
          max={duration > 0 ? duration : 100}
          step="0.1"
          value={currentTime}
          onChange={handleSliderChange}
          className="w-full h-1.5 bg-white/25 rounded-full appearance-none cursor-pointer accent-[#FF2D6C] hover:h-2 transition-all transform-gpu"
        />
      </div>

      {/* Timestamps */}
      <div className="flex justify-between text-[11px] font-mono text-white/60 mt-1.5 tabular-nums">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* 2. Playback Controls Row (Optimized CSS Frosted Glass without Backdrop Blur Cascades) */}
      <div className="w-full flex items-center justify-between mt-3 px-1">
        {/* Shuffle Button */}
        <button
          type="button"
          onClick={onToggleShuffle}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-90 transform-gpu ${
            isShuffle
              ? 'bg-[#FF2D6C]/40 text-[#FF4B7A] border border-[#FF2D6C]/70 shadow-[0_0_12px_rgba(255,45,108,0.35)]'
              : 'bg-white/[0.12] text-white/75 hover:text-white border border-white/20 hover:bg-white/[0.18]'
          }`}
          aria-label="Toggle shuffle"
          title="Shuffle"
        >
          <Shuffle className="w-4 h-4" />
        </button>

        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          className="w-12 h-12 rounded-full bg-white/[0.12] hover:bg-white/[0.2] active:scale-90 border border-white/20 flex items-center justify-center text-white transition-all transform-gpu"
          aria-label="Previous song"
          title="Previous song"
        >
          <SkipBack className="w-5 h-5 fill-white" />
        </button>

        {/* Large Center Play/Pause Button with Glowing Hot-Pink Ring */}
        <button
          type="button"
          onClick={onTogglePlay}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF2D6C] to-[#FF5E8E] border-2 border-pink-300 ring-4 ring-[#FF2D6C]/50 flex items-center justify-center text-white shadow-[0_0_28px_rgba(255,45,108,0.7)] active:scale-90 transition-transform transform-gpu"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-7 h-7 fill-white text-white drop-shadow-sm" />
          ) : (
            <Play className="w-7 h-7 fill-white text-white ml-0.5 drop-shadow-sm" />
          )}
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          className="w-12 h-12 rounded-full bg-white/[0.12] hover:bg-white/[0.2] active:scale-90 border border-white/20 flex items-center justify-center text-white transition-all transform-gpu"
          aria-label="Next song"
          title="Next song"
        >
          <SkipForward className="w-5 h-5 fill-white" />
        </button>

        {/* Repeat Button */}
        <button
          type="button"
          onClick={toggleRepeat}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-90 transform-gpu ${
            repeat
              ? 'bg-[#FF2D6C]/40 text-[#FF4B7A] border border-[#FF2D6C]/70 shadow-[0_0_12px_rgba(255,45,108,0.35)]'
              : 'bg-white/[0.12] text-white/75 hover:text-white border border-white/20 hover:bg-white/[0.18]'
          }`}
          aria-label="Toggle repeat"
          title="Repeat"
        >
          <Repeat className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});
