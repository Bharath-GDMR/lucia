import os
import json

# Paths
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
T4_SMALL_DIR = os.path.join(ROOT_DIR, 't4', 'small')
GALLERY2_JSON_PATH = os.path.join(ROOT_DIR, 'gallery2.json')

# Get list of image files
image_files = [f for f in os.listdir(T4_SMALL_DIR) if f.endswith('.JPG')]

# Create data structure
gallery_data = []
for filename in image_files:
    gallery_data.append({
        "title": "Stellar Raga Launch",
        "author": "Titan GDMR",
        "small": f"t4/small/{filename}",
        "full": f"t4/small/{filename}",
        "thumb": f"t4/thumbnails/{filename}"
    })

# Write to gallery2.json
with open(GALLERY2_JSON_PATH, 'w') as f:
    json.dump(gallery_data, f, indent=2)

print(f"Successfully created {GALLERY2_JSON_PATH} with {len(gallery_data)} entries.")
