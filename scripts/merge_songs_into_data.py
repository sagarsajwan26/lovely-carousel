import json
import os

def merge():
    if not os.path.exists("scripts/new_songs.json"):
        print("No scripts/new_songs.json found.")
        return

    with open("scripts/new_songs.json", "r", encoding="utf-8") as f:
        new_songs = json.load(f)

    if not new_songs:
        print("new_songs is empty.")
        return

    # Read existing songs.ts
    with open("src/data/songs.ts", "r", encoding="utf-8") as f:
        content = f.read()

    # Create TypeScript array representation for new songs
    formatted_songs_ts = json.dumps(new_songs, indent=2, ensure_ascii=False)
    
    # We will prepend new songs or append them cleanly
    template = f"""import {{ Song }} from '@/types/song';

export const ROMANTIC_SONGS: Song[] = {formatted_songs_ts};
"""
    with open("src/data/songs.ts", "w", encoding="utf-8") as f:
        f.write(template)

    print(f"Updated src/data/songs.ts with {len(new_songs)} romantic songs.")

if __name__ == "__main__":
    merge()
