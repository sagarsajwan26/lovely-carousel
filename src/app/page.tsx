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

const PlayerDrawer = dynamic(
  () => import('@/components/player/PlayerDrawer').then((m) => m.PlayerDrawer),
  { ssr: false }
);

export default function HomePage() {
  const currentSong = useAudioStore((s) => s.currentSong);
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const selectedSongIndex = useAudioStore((s) => s.selectedSongIndex);

  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);

  const song = currentSong || ROMANTIC_SONGS[selectedSongIndex] || ROMANTIC_SONGS[0];

  const currentIndex = ROMANTIC_SONGS.findIndex((s) => s.id === song.id);
  const validIndex = currentIndex !== -1 ? currentIndex : selectedSongIndex;
  const nextSongItem = ROMANTIC_SONGS[(validIndex + 1) % ROMANTIC_SONGS.length];

  const handleTogglePlay = useCallback(() => {
    const { isPlaying: playing, currentSong: active } = useAudioStore.getState();
    if (playing) {
      audioEngine.pause();
    } else {
      audioEngine.play(active || song);
    }
  }, [song]);

  const handleNext = useCallback(() => {
    setSlideDirection(1);
    const { selectedSongIndex: currIdx, setSelectedSongIndex } = useAudioStore.getState();
    const nextIdx = isShuffle
      ? Math.floor(Math.random() * ROMANTIC_SONGS.length)
      : (currIdx + 1) % ROMANTIC_SONGS.length;
    const targetSong = ROMANTIC_SONGS[nextIdx];
    setSelectedSongIndex(nextIdx);
    audioEngine.loadAndPlay(targetSong);
  }, [isShuffle]);

  const handlePrev = useCallback(() => {
    setSlideDirection(-1);
    const { selectedSongIndex: currIdx, setSelectedSongIndex } = useAudioStore.getState();
    const prevIdx = (currIdx - 1 + ROMANTIC_SONGS.length) % ROMANTIC_SONGS.length;
    const targetSong = ROMANTIC_SONGS[prevIdx];
    setSelectedSongIndex(prevIdx);
    audioEngine.loadAndPlay(targetSong);
  }, []);

  const handleSeek = useCallback((time: number) => {
    audioEngine.seek(time);
  }, []);

  const handleSelectSong = useCallback(
    (index: number, selectedSong: typeof song) => {
      setSlideDirection(index > selectedSongIndex ? 1 : -1);
      setShowDrawer(false);
      useAudioStore.getState().setSelectedSongIndex(index);
      audioEngine.loadAndPlay(selectedSong);
    },
    [selectedSongIndex]
  );

  const handleOpenPlaylist = useCallback(() => setShowDrawer(true), []);
  const handleClosePlaylist = useCallback(() => setShowDrawer(false), []);
  const handleToggleFavorite = useCallback(() => setIsFavorited((prev) => !prev), []);
  const handleToggleShuffle = useCallback(() => setIsShuffle((prev) => !prev), []);
  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  return (
    <main className="relative min-h-screen w-full bg-[#12071C] text-white flex flex-col justify-between items-center overflow-x-hidden pt-6 pb-28 select-none">

      <AnimatePresence>
        {isLoading && (
          <LovelyLoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <PlayerBackground activeCoverImage={song.coverImage} />

      <div className="relative z-10 w-full max-w-[390px] px-4 flex flex-col justify-between flex-1 pointer-events-auto">

        <div className="flex flex-col items-center">

          <PlayerArtwork
            song={song}
            nextSongCover={nextSongItem?.coverImage}
            direction={slideDirection}
            onTogglePlay={handleTogglePlay}
            onNext={handleNext}
            onPrev={handlePrev}
          />

          <PlayerInfo song={song} showQuote={!isLoading} />

          <PlayerControls
            isShuffle={isShuffle}
            onTogglePlay={handleTogglePlay}
            onNext={handleNext}
            onPrev={handlePrev}
            onToggleShuffle={handleToggleShuffle}
            onSeek={handleSeek}
          />

          {nextSongItem && (
            <PlayerNextUp
              nextSong={nextSongItem}
              onPlayNext={handleNext}
              onOpenPlaylist={handleOpenPlaylist}
            />
          )}
        </div>

        <PlayerBottomNav
          isFavorited={isFavorited}
          onOpenPlaylist={handleOpenPlaylist}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>

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
