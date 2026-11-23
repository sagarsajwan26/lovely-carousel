import os
import shutil
import json

SOURCE_IMAGES = [
    ("The-Heirs_1.jpg", "the-heirs.jpg"),
    ("18ca2d6c7c3fdf732ddc8b9085db2e16.jpg", "romantic-couple-01.jpg"),
    ("7046562_orig.jpg", "romantic-couple-02.jpg"),
    ("ff51837afbde903f1ffaf81866b18b92.jpg", "romantic-couple-03.jpg"),
    ("rbPmjc.jpg", "romantic-couple-04.jpg"),
    ("images.jpg", "romantic-couple-05.jpg"),
    ("images (1).jpg", "romantic-couple-06.jpg"),
    ("images (2).jpg", "romantic-couple-07.jpg"),
    ("images (3).jpg", "romantic-couple-08.jpg"),
    ("images (4).jpg", "romantic-couple-09.jpg"),
    ("images (5).jpg", "romantic-couple-10.jpg"),
    ("images (6).jpg", "romantic-couple-11.jpg"),
    ("images (7).jpg", "romantic-couple-12.jpg"),
    ("images (8).jpg", "romantic-couple-13.jpg"),
    ("images (9).jpg", "romantic-couple-14.jpg"),
    ("images (10).jpg", "romantic-couple-15.jpg"),
    ("images (11).jpg", "romantic-couple-16.jpg"),
    ("images (12).jpg", "romantic-couple-17.jpg"),
    ("images (13).jpg", "romantic-couple-18.jpg"),
    ("images (14).jpg", "romantic-couple-19.jpg"),
]

os.makedirs("public/images/romantic", exist_ok=True)

# Copy all images cleanly
mapped_paths = []
for src_name, clean_name in SOURCE_IMAGES:
    src_path = os.path.join("public", src_name)
    dst_path = os.path.join("public", "images", "romantic", clean_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        mapped_paths.append(f"/images/romantic/{clean_name}")
        print(f"Copied {src_name} -> {dst_path}")

print(f"Total romantic images prepared: {len(mapped_paths)}")
