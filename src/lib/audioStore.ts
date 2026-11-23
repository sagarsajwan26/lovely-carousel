import { create } from 'zustand';
import { Song } from '@/types/song';
import { ROMANTIC_SONGS } from '@/data/songs';

interface AudioStoreState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  repeat: boolean;
  hasInteracted: boolean;
  selectedSongIndex: number;
  isTransitioning: boolean;
  carouselRotationPaused: boolean;
  
  // Actions
  setCurrentSong: (song: Song) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleRepeat: () => void;
  setSelectedSongIndex: (index: number) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  setCarouselRotationPaused: (paused: boolean) => void;
  setHasInteracted: (interacted: boolean) => void;
  selectSongBySlug: (slug: string) => Song | undefined;
  nextSong: () => void;
  prevSong: () => void;
}

export const useAudioStore = create<AudioStoreState>((set, get) => ({
  currentSong: ROMANTIC_SONGS[0],
  isPlaying: false,
  currentTime: 0,
  duration: ROMANTIC_SONGS[0].duration,
  volume: 0.8,
  isMuted: false,
  repeat: false,
  hasInteracted: false,
  selectedSongIndex: 0,
  isTransitioning: false,
  carouselRotationPaused: false,

  setCurrentSong: (song) => {
    const index = ROMANTIC_SONGS.findIndex((s) => s.id === song.id);
    set({
      currentSong: song,
      selectedSongIndex: index !== -1 ? index : 0,
      duration: song.duration,
      currentTime: 0,
    });
  },

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration: duration }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleRepeat: () => set((state) => ({ repeat: !state.repeat })),
  setSelectedSongIndex: (index) => {
    const validIndex = (index + ROMANTIC_SONGS.length) % ROMANTIC_SONGS.length;
    set({
      selectedSongIndex: validIndex,
      currentSong: ROMANTIC_SONGS[validIndex],
    });
  },
  setIsTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  setCarouselRotationPaused: (paused) => set({ carouselRotationPaused: paused }),
  setHasInteracted: (interacted) => set({ hasInteracted: interacted }),

  selectSongBySlug: (slug: string) => {
    const found = ROMANTIC_SONGS.find((s) => s.slug === slug);
    if (found) {
      const index = ROMANTIC_SONGS.findIndex((s) => s.id === found.id);
      set({ currentSong: found, selectedSongIndex: index });
      return found;
    }
    return undefined;
  },

  nextSong: () => {
    const { selectedSongIndex } = get();
    const nextIdx = (selectedSongIndex + 1) % ROMANTIC_SONGS.length;
    set({
      selectedSongIndex: nextIdx,
      currentSong: ROMANTIC_SONGS[nextIdx],
      currentTime: 0,
      duration: ROMANTIC_SONGS[nextIdx].duration,
    });
  },

  prevSong: () => {
    const { selectedSongIndex } = get();
    const prevIdx = (selectedSongIndex - 1 + ROMANTIC_SONGS.length) % ROMANTIC_SONGS.length;
    set({
      selectedSongIndex: prevIdx,
      currentSong: ROMANTIC_SONGS[prevIdx],
      currentTime: 0,
      duration: ROMANTIC_SONGS[prevIdx].duration,
    });
  },
}));
