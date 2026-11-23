'use client';

import { useAudioStore } from './audioStore';
import { Song } from '@/types/song';
import { ROMANTIC_SONGS } from '@/data/songs';

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

  public play(song?: Song): void {
    useAudioStore.getState().setHasInteracted(true);
    if (!this.audio) {
      this.initAudio();
    }
    if (!this.audio) return;

    const { currentSong, volume, isMuted } = useAudioStore.getState();
    const activeSong = song || currentSong || ROMANTIC_SONGS[0];

    this.audio.volume = isMuted ? 0 : volume;

    const currentSrc = this.audio.src;
    const isTargetLoaded = currentSrc && (
      currentSrc.endsWith(activeSong.audioUrl) ||
      currentSrc.endsWith(encodeURI(activeSong.audioUrl))
    );

    if (!isTargetLoaded) {
      this.audio.src = activeSong.audioUrl;
      useAudioStore.getState().setCurrentSong(activeSong);
    }

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          useAudioStore.getState().setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio play request error:', err);
          useAudioStore.getState().setIsPlaying(false);
        });
    }
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
    useAudioStore.getState().setIsPlaying(false);
  }

  public togglePlay(song?: Song): void {
    const { isPlaying } = useAudioStore.getState();
    if (isPlaying) {
      this.pause();
    } else {
      this.play(song);
    }
  }

  public loadAndPlay(song: Song): void {
    useAudioStore.getState().setHasInteracted(true);
    useAudioStore.getState().setCurrentSong(song);
    useAudioStore.getState().setCurrentTime(0);
    useAudioStore.getState().setDuration(song.duration);

    if (!this.audio) {
      this.initAudio();
    }
    if (!this.audio) return;

    this.audio.src = song.audioUrl;
    this.audio.currentTime = 0;
    this.lastUpdateTime = performance.now();

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          useAudioStore.getState().setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio playback start requires user interaction:', err);
          useAudioStore.getState().setIsPlaying(false);
        });
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
