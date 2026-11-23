import json
import re

COVER_MAP = [
    "/images/romantic/the-heirs.jpg",
    "/images/romantic/romantic-couple-01.jpg",
    "/images/romantic/romantic-couple-02.jpg",
    "/images/romantic/romantic-couple-03.jpg",
    "/images/romantic/romantic-couple-04.jpg",
    "/images/romantic/romantic-couple-05.jpg",
    "/images/romantic/romantic-couple-06.jpg",
    "/images/romantic/romantic-couple-07.jpg",
    "/images/romantic/romantic-couple-10.jpg",
    "/images/romantic/romantic-couple-11.jpg",
    "/images/romantic/romantic-couple-12.jpg",
    "/images/romantic/romantic-couple-13.jpg",
]

# Read songs.ts
with open("src/data/songs.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Match the json array
json_match = re.search(r'export const ROMANTIC_SONGS: Song\[\] = (\[.*\]);', text, re.DOTALL)
if json_match:
    songs = json.loads(json_match.group(1))
    for i, song in enumerate(songs):
        cover = COVER_MAP[i % len(COVER_MAP)]
        song["coverImage"] = cover
    
    new_text = f"""import {{ Song }} from '@/types/song';

export const ROMANTIC_SONGS: Song[] = {json.dumps(songs, indent=2, ensure_ascii=False)};
"""
    with open("src/data/songs.ts", "w", encoding="utf-8") as f:
        f.write(new_text)
    print(f"Updated {len(songs)} songs with romantic couple covers!")
else:
    print("Could not parse ROMANTIC_SONGS array.")
