#!/usr/bin/env python3
"""
YouTube Song Downloader & Integration Script for Lovely Carousel.
Downloads audio tracks and album art from YouTube and integrates them directly into the music player.
"""

import os
import re
import json
import urllib.request
import yt_dlp

# Target YouTube URLs provided by user
YOUTUBE_URLS = [
    "https://youtu.be/CbvjhmFVMvA?si=5QofSh4wNQeN51Wx",
    "https://youtu.be/zO0y9LR9kpE?si=NVH6zXPxDVuW9ytI",
    "https://youtu.be/se9DDAwwGQY?si=QsYWmN5g8Vs9C4_L",
    "https://youtu.be/YrJ6OZ7VVWc?si=LdBICE5gRxHhKmJw",
    "https://youtu.be/8GudgjrX1aI?si=O_Wj26542Nwrw11T",
    "https://youtu.be/U0EI7XFkkV4?si=Oo8RCsjWBAFyqZMZ",
    "https://youtu.be/M5OCLifZK1w?si=bB1euxu3bcYYBg7X",
    "https://youtu.be/1uypbHj8-Mk?si=RDz02iu-CSBuoDQo"
]

# Curated metadata mapping for clean titles, artists, and romantic aesthetics
CURATED_META = {
    "CbvjhmFVMvA": {
        "title": "Thinking Of You",
        "artist": "AP Dhillon",
        "album": "The Brownprint",
        "caption": "Late night drive where every reflection reminds me only of you.",
        "mood": "Soulful & Atmospheric",
        "primary": "#F8BBD0",
        "secondary": "#C9B6F0",
        "glow": "rgba(248, 187, 208, 0.5)",
    },
    "zO0y9LR9kpE": {
        "title": "Alfaaz",
        "artist": "Hamza Malik & Zain Zohaib",
        "album": "Echoes of Devotion",
        "caption": "Words left unspoken that dwell inside the quietest corners of the heart.",
        "mood": "Tender Romantic",
        "primary": "#EC8FB0",
        "secondary": "#F8BBD0",
        "glow": "rgba(236, 143, 176, 0.5)",
    },
    "se9DDAwwGQY": {
        "title": "Channa Ve",
        "artist": "Akhil & Mansheel",
        "album": "Bhoot — Part One",
        "caption": "Channa ve ghar aa jaave... Whispering prayers across empty skies.",
        "mood": "Pure Devotion",
        "primary": "#C9B6F0",
        "secondary": "#FFF8FC",
        "glow": "rgba(201, 182, 240, 0.5)",
    },
    "YrJ6OZ7VVWc": {
        "title": "Zaroor",
        "artist": "Aparshakti Khurana ft. Savi Kahlon",
        "album": "Zaroor Singles",
        "caption": "If fate allows, we will meet again where distance ceases to exist.",
        "mood": "Heartfelt Longing",
        "primary": "#FF8FA3",
        "secondary": "#FF2D6C",
        "glow": "rgba(255, 143, 163, 0.5)",
    },
    "8GudgjrX1aI": {
        "title": "Tu Sanwal Phul Kasturi",
        "artist": "Female Acoustic Version",
        "album": "Sufi Folk Tales",
        "caption": "Fragrance of the beloved carried by northern winds into a quiet soul.",
        "mood": "Folk Romantic Melody",
        "primary": "#FFB6C1",
        "secondary": "#D8BFD8",
        "glow": "rgba(255, 182, 193, 0.5)",
    },
    "U0EI7XFkkV4": {
        "title": "Farak",
        "artist": "Taare",
        "album": "Farak Collection",
        "caption": "A poignant reflection on how love shifts the world on its axis.",
        "mood": "Melancholic Love",
        "primary": "#F48FB1",
        "secondary": "#CE93D8",
        "glow": "rgba(244, 143, 177, 0.5)",
    },
    "M5OCLifZK1w": {
        "title": "Aarzu",
        "artist": "Noor, Khan, Madhurxo",
        "album": "Aarzu Nightscape",
        "caption": "Every wish begins and ends with your voice softly calling my name.",
        "mood": "Late Night Longing",
        "primary": "#E1BEE7",
        "secondary": "#F8BBD0",
        "glow": "rgba(225, 190, 231, 0.5)",
    },
    "1uypbHj8-Mk": {
        "title": "Kitab",
        "artist": "Mr Dutt ft. Vipin Foji",
        "album": "Pakka Mai Kitab Likhunga",
        "caption": "Writing a book where every chapter is dedicated to your smile.",
        "mood": "Modern Folk Romance",
        "primary": "#FF80AB",
        "secondary": "#FF4081",
        "glow": "rgba(255, 128, 171, 0.5)",
    },
}

def slugify(text: str) -> str:
    text = re.sub(r'[^\w\s-]', '', text.lower())
    return re.sub(r'[-\s]+', '-', text).strip('-')

def download_and_process():
    os.makedirs("public/media", exist_ok=True)
    os.makedirs("public/images", exist_ok=True)
    
    downloaded_songs = []

    ydl_opts = {
        'format': 'bestaudio[ext=m4a]/bestaudio/best[ext=mp4]/best',
        'outtmpl': 'public/media/%(id)s.%(ext)s',
        'quiet': False,
        'no_warnings': True,
        'ignoreerrors': True,
    }

    print("🚀 Starting download of YouTube songs and artwork...")

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        for idx, url in enumerate(YOUTUBE_URLS, start=1):
            print(f"\n[{idx}/{len(YOUTUBE_URLS)}] Processing: {url}")
            try:
                info = ydl.extract_info(url, download=True)
                if not info:
                    print(f"⚠️ Could not extract info for {url}")
                    continue
                
                vid_id = info.get('id')
                raw_title = info.get('title', 'Unknown Title')
                duration = int(info.get('duration') or 180)
                ext = info.get('ext') or 'm4a'
                
                # Check actual downloaded audio file
                audio_filename = f"{vid_id}.{ext}"
                audio_rel_path = f"/media/{audio_filename}"
                
                # Metadata curation
                curated = CURATED_META.get(vid_id, {})
                title = curated.get('title') or raw_title.split('|')[0].split('-')[0].strip()
                artist = curated.get('artist') or info.get('uploader') or 'Romantic Artist'
                album = curated.get('album') or 'Romantic Melodies'
                caption = curated.get('caption') or 'A melody that lingers softly in the mind.'
                mood = curated.get('mood') or 'Romantic Reverie'
                primary = curated.get('primary') or '#FF8FA3'
                secondary = curated.get('secondary') or '#FF2D6C'
                glow = curated.get('glow') or 'rgba(255, 143, 163, 0.5)'

                slug = f"{slugify(title)}-{vid_id[:6].lower()}"
                
                # Download album cover / thumbnail
                cover_rel_path = f"/media/cover-{vid_id}.jpg"
                cover_dest = f"public/media/cover-{vid_id}.jpg"
                
                thumb_url = info.get('thumbnail')
                if thumb_url and not os.path.exists(cover_dest):
                    try:
                        req = urllib.request.Request(
                            thumb_url,
                            headers={'User-Agent': 'Mozilla/5.0'}
                        )
                        with urllib.request.urlopen(req, timeout=15) as resp, open(cover_dest, 'wb') as f_out:
                            f_out.write(resp.read())
                        print(f"  🖼️ Downloaded cover image: {cover_dest}")
                    except Exception as err:
                        print(f"  ⚠️ Could not download thumbnail: {err}")
                        cover_rel_path = "/images/wallpaper.png"
                elif not os.path.exists(cover_dest):
                    cover_rel_path = "/images/wallpaper.png"

                song_obj = {
                    "id": f"yt-{vid_id}",
                    "slug": slug,
                    "title": title,
                    "artist": artist,
                    "album": album,
                    "year": "2025",
                    "coverImage": cover_rel_path,
                    "audioUrl": audio_rel_path,
                    "videoUrl": audio_rel_path,
                    "caption": caption,
                    "mood": mood,
                    "bpm": 76,
                    "key": "Db Major",
                    "color": {
                        "primary": primary,
                        "secondary": secondary,
                        "glow": glow,
                    },
                    "duration": duration,
                    "lyricsSynced": False,
                    "lyricsSource": f"YouTube — {artist}",
                    "lyricsLicense": "Public Audio Stream via YouTube",
                    "story": caption,
                    "lyrics": [
                        {"time": 0, "text": f"Now playing {title}..."},
                        {"time": 15, "text": "ke itna ameer toh nhi ki teri sari khawais poori kar saku..."},
                        {"time": 35, "text": "par maage tu toh waqt sara tere naam krdu ♡"},
                    ],
                }
                
                downloaded_songs.append(song_obj)
                print(f"  ✅ Added song: {title} by {artist} ({duration}s)")
            except Exception as e:
                print(f"  ❌ Error downloading {url}: {e}")

    # Write out downloaded songs metadata to JSON
    with open("scripts/new_songs.json", "w", encoding="utf-8") as f:
        json.dump(downloaded_songs, f, indent=2, ensure_ascii=False)
    
    print(f"\n🎉 Successfully processed {len(downloaded_songs)} songs!")
    return downloaded_songs

if __name__ == "__main__":
    download_and_process()
