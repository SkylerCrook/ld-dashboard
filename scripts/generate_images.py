import os, json

# Where the images live on disk:
IMG_DIR = 'docs/images/conveyor'

# How they should appear in your site URLs:
URL_DIR = 'images/conveyor'

# Where to write the manifest:
OUT_FILE = 'docs/conveyor_images.json'

# 1) Gather & sort image filenames
files = sorted([
    f for f in os.listdir(IMG_DIR)
    if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))
])

# 2) Build manifest of relative URLs (no 'docs/' prefix)
manifest = [f"{URL_DIR}/{fname}" for fname in files]

# 3) Write out JSON
with open(OUT_FILE, 'w') as fp:
    json.dump(manifest, fp, indent=2)

print(f"✔ Wrote {len(manifest)} entries to {OUT_FILE}")
