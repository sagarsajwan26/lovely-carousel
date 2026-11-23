export interface LyricLine {
  time: number;
  text: string;
  translation?: string;
}

export interface Song {
  id: string;
  slug: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  coverImage: string;
  audioUrl: string;
  videoUrl?: string;
  caption: string;
  mood: string;
  bpm: number;
  key: string;
  color: {
    primary: string;
    secondary: string;
    glow: string;
  };
  duration: number;
  lyricsSynced: boolean;
  lyrics: LyricLine[];
  lyricsSource: string;
  lyricsLicense: string;
  story: string;
}
