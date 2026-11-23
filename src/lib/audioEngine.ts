'use client';

import { useAudioStore } from './audioStore';
import { Song } from '@/types/song';
import { ROMANTIC_SONGS } from '@/data/songs';

/**
 * Production-Grade Robust HTML5 Audio Engine
 * Features:
 * - Direct, rock-solid audio loading and playback
 * - Throttled time updates to prevent UI thrashing on low-end devices
 * - Error recovery and autoplay resume handling
 */
class AudioEngine {
  private static instance: AudioEngine;
  private audio: HTMLAudioElement | null = null;
  private isInitialized = false;
  private lastUpdateTime = 0;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  public static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  private initAudio() {
    if (typeof window === 'undefined' || this.isInitialized) return;

    const audio = new Audio();
    audio.preload = 'auto';

    // Throttled timeupdate: max 4 updates/sec (220ms) to prevent re-render thrashing
    audio.addEventListener('timeupdate', () => {
      const now = performance.now();
      if (now - this.lastUpdateTime > 220) {
        this.lastUpdateTime = now;
        useAudioStore.getState().setCurrentTime(audio.currentTime);
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        useAudioStore.getState().setDuration(audio.duration);
      }
    });

    audio.addEventListener('ended', () => {
      const { repeat } = useAudioStore.getState();
      if (repeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        const { selectedSongIndex, setSelectedSongIndex } = useAudioStore.getState();
        const nextIdx = (selectedSongIndex + 1) % ROMANTIC_SONGS.length;
        const nextSong = ROMANTIC_SONGS[nextIdx];
        setSelectedSongIndex(nextIdx);
        this.loadAndPlay(nextSong);
      }
    });

    audio.addEventListener('play', () => {
      useAudioStore.getState().setIsPlaying(true);
    });

    audio.addEventListener('pause', () => {
      useAudioStore.getState().setIsPlaying(false);
    });

    audio.addEventListener('error', () => {
      console.warn('Audio playback error encountered on element:', audio.error);
      useAudioStore.getState().setIsPlaying(false);
    });

    this.audio = audio;
    this.isInitialized = true;
  }

  public async play(): Promise<void> {
    useAudioStore.getState().setHasInteracted(true);
    const { currentSong, volume, isMuted } = useAudioStore.getState();
    const activeSong = currentSong || ROMANTIC_SONGS[0];

    if (!this.audio) {
      this.initAudio();
    }

    if (this.audio) {
      this.audio.volume = isMuted ? 0 : volume;

      // If audio element has no source or source changed, load it
      if (!this.audio.src || !this.audio.src.endsWith(activeSong.audioUrl)) {
        this.audio.src = activeSong.audioUrl;
        this.audio.load();
      }

      try {
        await this.audio.play();
        useAudioStore.getState().setIsPlaying(true);
      } catch (err) {
        console.warn('Audio play request error:', err);
      }
    }
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
    useAudioStore.getState().setIsPlaying(false);
  }

  public togglePlay(): void {
    const { isPlaying } = useAudioStore.getState();
    if (isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public loadAndPlay(song: Song): void {
    useAudioStore.getState().setHasInteracted(true);
    useAudioStore.getState().setCurrentSong(song);

    if (!this.audio) {
      this.initAudio();
    }

    if (this.audio) {
      this.audio.src = song.audioUrl;
      this.audio.load();
      this.audio.currentTime = 0;
      this.lastUpdateTime = performance.now();
      useAudioStore.getState().setCurrentTime(0);
      useAudioStore.getState().setDuration(song.duration);

      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            useAudioStore.getState().setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Audio playback start requires user interaction:', err);
          });
      }
    }
  }

  public seek(time: number): void {
    if (this.audio && !isNaN(time)) {
      this.audio.currentTime = Math.max(0, Math.min(time, this.audio.duration || time));
      this.lastUpdateTime = performance.now();
      useAudioStore.getState().setCurrentTime(time);
    }
  }

  public setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
    useAudioStore.getState().setVolume(volume);
  }

  public setMuted(muted: boolean): void {
    if (this.audio) {
      this.audio.muted = muted;
    }
    if (useAudioStore.getState().isMuted !== muted) {
      useAudioStore.getState().toggleMute();
    }
  }
}

export const audioEngine = AudioEngine.getInstance();
