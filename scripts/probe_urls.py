import json
import yt_dlp

URLS = [
    "https://youtu.be/CbvjhmFVMvA?si=5QofSh4wNQeN51Wx",
    "https://youtu.be/zO0y9LR9kpE?si=NVH6zXPxDVuW9ytI",
    "https://youtu.be/se9DDAwwGQY?si=QsYWmN5g8Vs9C4_L",
    "https://youtu.be/YrJ6OZ7VVWc?si=LdBICE5gRxHhKmJw",
    "https://youtu.be/8GudgjrX1aI?si=O_Wj26542Nwrw11T",
    "https://youtu.be/U0EI7XFkkV4?si=Oo8RCsjWBAFyqZMZ",
    "https://youtu.be/M5OCLifZK1w?si=bB1euxu3bcYYBg7X",
    "https://youtu.be/1uypbHj8-Mk?si=RDz02iu-CSBuoDQo"
]

ydl_opts = {
    'quiet': True,
    'skip_download': True,
    'extract_flat': False
}

results = []
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    for url in URLS:
        try:
            info = ydl.extract_info(url, download=False)
            results.append({
                'id': info.get('id'),
                'title': info.get('title'),
                'uploader': info.get('uploader') or info.get('channel'),
                'duration': info.get('duration'),
                'thumbnail': info.get('thumbnail'),
                'webpage_url': info.get('webpage_url')
            })
            print(f"Found: {info.get('title')} ({info.get('duration')}s)")
        except Exception as e:
            print(f"Error {url}: {e}")

with open("scripts/metadata.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
