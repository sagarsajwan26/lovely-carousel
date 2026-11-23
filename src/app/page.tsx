'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import { ROMANTIC_SONGS } from '@/data/songs';
import { useAudioStore } from '@/lib/audioStore';
import { audioEngine } from '@/lib/audioEngine';
import { PlayerBackground } from '@/components/player/PlayerBackground';
import { PlayerArtwork } from '@/components/player/PlayerArtwork';
import { PlayerInfo } from '@/components/player/PlayerInfo';
import { PlayerControls } from '@/components/player/PlayerControls';
import { PlayerNextUp } from '@/components/player/PlayerNextUp';
import { PlayerBottomNav } from '@/components/player/PlayerBottomNav';
import { LovelyLoadingScreen } from '@/components/player/LovelyLoadingScreen';

// Dynamic import for modal drawer: Saves critical path bundle size and deferred execution
const PlayerDrawer = dynamic(
  () => import('@/components/player/PlayerDrawer').then((m) => m.PlayerDrawer),
  { ssr: false }
);

export default function HomePage() {
  // Production-Grade Fine-Grained Selectors:
  // Note: currentTime and duration are intentionally NOT subscribed to here!
  // Subscribing to them inside PlayerControls guarantees that timeupdate ticks NEVER re-render HomePage!
  const currentSong = useAudioStore((s) => s.currentSong);
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const selectedSongIndex = useAudioStore((s) => s.selectedSongIndex);
  const setSelectedSongIndex = useAudioStore((s) => s.setSelectedSongIndex);
  const nextSongAction = useAudioStore((s) => s.nextSong);
  const prevSongAction = useAudioStore((s) => s.prevSong);

  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);

  // Active Song
  const song = currentSong || ROMANTIC_SONGS[selectedSongIndex] || ROMANTIC_SONGS[0];

  // Next Song
  const currentIndex = ROMANTIC_SONGS.findIndex((s) => s.id === song.id);
  const nextSongItem = ROMANTIC_SONGS[(currentIndex + 1) % ROMANTIC_SONGS.length];

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      audioEngine.pause();
    } else {
      audioEngine.loadAndPlay(song);
    }
  }, [isPlaying, song]);

  const handleNext = useCallback(() => {
    setSlideDirection(1);
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * ROMANTIC_SONGS.length);
      const targetSong = ROMANTIC_SONGS[randomIndex];
      setSelectedSongIndex(randomIndex);
      audioEngine.loadAndPlay(targetSong);
    } else {
      nextSongAction();
      const next = useAudioStore.getState().currentSong;
      if (next) {
        audioEngine.loadAndPlay(next);
      }
    }
  }, [isShuffle, nextSongAction, setSelectedSongIndex]);

  const handlePrev = useCallback(() => {
    setSlideDirection(-1);
    prevSongAction();
    const prev = useAudioStore.getState().currentSong;
    if (prev) {
      audioEngine.loadAndPlay(prev);
    }
  }, [prevSongAction]);

  const handleSeek = useCallback((time: number) => {
    audioEngine.seek(time);
  }, []);

  const handleSelectSong = useCallback(
    (index: number, selectedSong: typeof song) => {
      setSlideDirection(index > selectedSongIndex ? 1 : -1);
      setShowDrawer(false);
      setSelectedSongIndex(index);
      audioEngine.loadAndPlay(selectedSong);
    },
    [selectedSongIndex, setSelectedSongIndex]
  );

  const handleOpenPlaylist = useCallback(() => setShowDrawer(true), []);
  const handleClosePlaylist = useCallback(() => setShowDrawer(false), []);
  const handleToggleFavorite = useCallback(() => setIsFavorited((prev) => !prev), []);
  const handleToggleShuffle = useCallback(() => setIsShuffle((prev) => !prev), []);
  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  return (
    <main className="relative min-h-screen w-full bg-[#12071C] text-white flex flex-col justify-between items-center overflow-x-hidden pt-6 pb-28 select-none contain-paint">
      {/* 0. Introductory Lovely Loading Screen with 3D Heart & Shared Quote Landing */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LovelyLoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* 1. Atmospheric Romantic Background with Dynamic Song Imagery */}
      <PlayerBackground activeCoverImage={song.coverImage} />

      {/* 2. Main Central Device Container */}
      <div className="relative z-10 w-full max-w-[390px] px-4 flex flex-col justify-between flex-1">
        {/* Main Player Section (Artwork, Title/Artist/Quote, Scrubber, Controls, Next Up) */}
        <div className="flex flex-col items-center">
          {/* Main Artwork with Smooth Slide Animation, Preload & Touch Swipe Support */}
          <PlayerArtwork
            song={song}
            nextSongCover={nextSongItem?.coverImage}
            direction={slideDirection}
            onTogglePlay={handleTogglePlay}
            onNext={handleNext}
            onPrev={handlePrev}
          />

          {/* Song Info & Romantic Quote (Smooth Landing Destination from Loading) */}
          <PlayerInfo song={song} />

          {/* Scrubber & 5-Button Controls with Fine-Grained Internal Selector */}
          <PlayerControls
            isShuffle={isShuffle}
            onTogglePlay={handleTogglePlay}
            onNext={handleNext}
            onPrev={handlePrev}
            onToggleShuffle={handleToggleShuffle}
            onSeek={handleSeek}
          />

          {/* Floating "Next Song" Glass Pill (Play Next & Playlist Menu) */}
          {nextSongItem && (
            <PlayerNextUp
              nextSong={nextSongItem}
              onPlayNext={handleNext}
              onOpenPlaylist={handleOpenPlaylist}
            />
          )}
        </div>

        {/* Floating Bottom Navigation Glass Dock */}
        <PlayerBottomNav
          isFavorited={isFavorited}
          onOpenPlaylist={handleOpenPlaylist}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>

      {/* Slide-Up Playlist Drawer Modal (Lazy Loaded) */}
      {showDrawer && (
        <PlayerDrawer
          isOpen={showDrawer}
          activeSongId={song.id}
          onClose={handleClosePlaylist}
          onSelectSong={handleSelectSong}
        />
      )}
    </main>
  );
}
