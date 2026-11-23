import json

with open("scripts/new_songs.json", "r", encoding="utf-8") as f:
    new_songs = json.load(f)

# Read existing file to extract existing songs
with open("src/data/songs.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Parse or import existing songs by running a node script or reading JSON
existing_songs_raw = [
  {
    "id": "song-1",
    "slug": "barsaat-banjaare",
    "title": "Barsaat",
    "artist": "Banjaare",
    "album": "Monsoon of the Heart",
    "year": "2025",
    "coverImage": "/media/cover-barsaat.jpg",
    "audioUrl": "/media/barsaat.mp4",
    "videoUrl": "/media/barsaat.mp4",
    "caption": "Some rains wash away the sorrow, but this one brings only thoughts of you.",
    "mood": "Monsoon Reverie",
    "bpm": 74,
    "key": "Db Major",
    "color": {
      "primary": "#F8BBD0",
      "secondary": "#C9B6F0",
      "glow": "rgba(248, 187, 208, 0.5)"
    },
    "duration": 218,
    "lyricsSynced": True,
    "lyricsSource": "Original Lyrics — Banjaare",
    "lyricsLicense": "Public Media Library",
    "story": "Like gentle raindrops falling against a steamed windowpane, this melody weaves tender longing.",
    "lyrics": [
      { "time": 0, "text": "Girte hue paani ki boondon mein..." },
      { "time": 10, "text": "Teri hi khushboo ghuli rehti hai" },
      { "time": 48, "text": "Yeh barsaat, yeh tanhai aur tera khayal" },
      { "time": 185, "text": "Hamesha ke liye tere ho chale." }
    ]
  },
  {
    "id": "song-2",
    "slug": "dooron-dooron",
    "title": "Dooron Dooron",
    "artist": "Paresh Pahuja ft. Harleen Sethi",
    "album": "Echoes of Distance",
    "year": "2024",
    "coverImage": "/media/cover-dooron.jpg",
    "audioUrl": "/media/dooron-dooron.mp4",
    "videoUrl": "/media/dooron-dooron.mp4",
    "caption": "Watching you from afar, where silent prayers become our only melody.",
    "mood": "Tender & Melancholic",
    "bpm": 68,
    "key": "F# Minor",
    "color": {
      "primary": "#EC8FB0",
      "secondary": "#F8BBD0",
      "glow": "rgba(236, 143, 176, 0.5)"
    },
    "duration": 195,
    "lyricsSynced": True,
    "lyricsSource": "Paresh Pahuja & Harleen Sethi",
    "lyricsLicense": "Public Media Library",
    "story": "An intimate, soul-stirring ballad exploring love that thrives across unspoken distances.",
    "lyrics": [
      { "time": 0, "text": "Dooron dooron vekheya tenu..." },
      { "time": 24, "text": "Kujh keh vi na paaye assi" },
      { "time": 132, "text": "Tu meri dastaan, tu hi meri zindagani" }
    ]
  },
  {
    "id": "song-3",
    "slug": "kinna-sona",
    "title": "Kinna Sona",
    "artist": "Sunil Kamath",
    "album": "Bhaag Johnny",
    "year": "2024",
    "coverImage": "/media/cover-kinna-sona.jpg",
    "audioUrl": "/media/kinna-sona.mp4",
    "videoUrl": "/media/kinna-sona.mp4",
    "caption": "Kinna sona tenu rab ne banaya... Jee kare dekhta rahoon.",
    "mood": "Pure Devotion",
    "bpm": 78,
    "key": "A Major",
    "color": {
      "primary": "#C9B6F0",
      "secondary": "#FFF8FC",
      "glow": "rgba(201, 182, 240, 0.5)"
    },
    "duration": 215,
    "lyricsSynced": True,
    "lyricsSource": "Sunil Kamath (T-Series)",
    "lyricsLicense": "Public Media Library",
    "story": "A tribute of unconditional admiration and timeless romance.",
    "lyrics": [
      { "time": 0, "text": "Kinna sona tenu rab ne banaya..." },
      { "time": 20, "text": "Dil kare dekhta rahoon" }
    ]
  },
  {
    "id": "song-4",
    "slug": "khat-navjot",
    "title": "Khat",
    "artist": "Navjot Ahuja",
    "album": "Letters in Autumn",
    "year": "2024",
    "coverImage": "/media/cover-khat.jpg",
    "audioUrl": "/media/khat.mp4",
    "videoUrl": "/media/khat.mp4",
    "caption": "Letters folded in fragrance, waiting for hands that may never open them.",
    "mood": "Nostalgic Longing",
    "bpm": 70,
    "key": "E Minor",
    "color": {
      "primary": "#FF8FA3",
      "secondary": "#E01B5E",
      "glow": "rgba(255, 143, 163, 0.5)"
    },
    "duration": 182,
    "lyricsSynced": True,
    "lyricsSource": "Navjot Ahuja",
    "lyricsLicense": "Public Media Library",
    "story": "Handwritten emotions carried across time and seasons.",
    "lyrics": [
      { "time": 0, "text": "Khat jo likhe the maine tere naam ke..." },
      { "time": 30, "text": "Har lafz mein basi hai teri yaad" }
    ]
  }
]

# Combined library: new songs first, followed by previous
all_songs = new_songs + existing_songs_raw

ts_output = f"""import {{ Song }} from '@/types/song';

export const ROMANTIC_SONGS: Song[] = {json.dumps(all_songs, indent=2, ensure_ascii=False)};
"""

with open("src/data/songs.ts", "w", encoding="utf-8") as f:
    f.write(ts_output)

print(f"Successfully integrated {len(all_songs)} songs into src/data/songs.ts")
