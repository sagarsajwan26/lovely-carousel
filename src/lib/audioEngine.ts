'use client';

import { useAudioStore } from './audioStore';
import { Song } from '@/types/song';

/**
 * Production-Grade Robust HTML5 Audio Engine
 * Features:
 * - Throttled time updates (reduces main thread wakeups on low-end CPUs)
 * - Memory & garbage collection safe
 * - Audio buffer warm-up & low-latency seek
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

    // Throttled timeupdate: max 4 updates/sec (250ms) to prevent re-render thrashing on low-end mobile CPUs
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
      const { repeat, nextSong } = useAudioStore.getState();
      if (repeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        nextSong();
        const next = useAudioStore.getState().currentSong;
        if (next) {
          this.loadAndPlay(next);
        }
      }
    });

    audio.addEventListener('play', () => {
      useAudioStore.getState().setIsPlaying(true);
    });

    audio.addEventListener('pause', () => {
      useAudioStore.getState().setIsPlaying(false);
    });

    this.audio = audio;
    this.isInitialized = true;
  }

  public async play(): Promise<void> {
    useAudioStore.getState().setHasInteracted(true);
    const { currentSong, volume, isMuted } = useAudioStore.getState();
    if (!currentSong) return;

    if (!this.audio) {
      this.initAudio();
    }

    if (this.audio) {
      this.audio.volume = isMuted ? 0 : volume;

      if (!this.audio.src || !this.audio.src.includes(encodeURI(currentSong.audioUrl))) {
        this.audio.src = currentSong.audioUrl;
        this.audio.load();
      }

      try {
        await this.audio.play();
        useAudioStore.getState().setIsPlaying(true);
      } catch (err) {
        console.warn('Audio play request interrupted or requires user gesture:', err);
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
            console.warn('Direct play postponed until user tap:', err);
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
