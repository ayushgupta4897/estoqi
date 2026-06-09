#!/usr/bin/env python3
"""Refine /our-journey hero: add the painted word 'estoqi' to the front of
the countertop ioniser in the 'with Estoqi' kitchen. Uses the existing
journey_hero.webp as the edit base so the rest of the panoramic painting
is preserved as-is. If the model regenerates the whole frame, fall back
to gen_journey_hero.py with the branding baked into the prompt."""
import json
import os
import shutil
import sys
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _lib_openai_image import edit

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC = os.path.join(ROOT, "src/frontend/public/concepts/journey/journey_hero.webp")
OUT = os.path.join(ROOT, "src/frontend/public/concepts/journey/journey_hero.webp")
BACKUP_DIR = os.path.join(ROOT, ".assets")

PROMPT = (
    "Take the input painting and modify ONLY one detail. Leave every other "
    "element, every figure, every colour, the sky, the fields, the seed "
    "shop, the harvest, the sabzi mandi, the family meal — all of it — "
    "exactly as it is in the input.\n\n"
    "Look at the right-hand side of the painting where there are two "
    "adjacent kitchen scenes separated by a faint hand-painted dotted "
    "line. In the 'with Estoqi' kitchen (the one on the right where the "
    "woman in the deep red saree stands at the counter, with the small "
    "white countertop water-dispensing appliance and a clear glass basin "
    "below the colander catching visibly amber-yellow runoff): on the "
    "front face of that countertop appliance, paint the word \"estoqi\" "
    "in small, clean, lowercase letters. The lettering should be:\n"
    "  - Painted in the same watercolour + ink hand as the rest of the "
    "    painting, with the same slightly trembling ink linework.\n"
    "  - In a deep navy blue colour that matches the painting's existing "
    "    indigo palette.\n"
    "  - Small and restrained — like a real brand name on a small "
    "    countertop appliance, not a billboard. Roughly the height of "
    "    one of the smaller produce items in the scene.\n"
    "  - Centred horizontally on the appliance face, sitting just below "
    "    the top edge.\n"
    "  - All lowercase. The letters are e, s, t, o, q, i. Six letters. "
    "    Spelled E-S-T-O-Q-I.\n\n"
    "No other text appears anywhere else in the painting. No labels, no "
    "captions, no signatures, no watermarks. Only the painted lowercase "
    "word 'estoqi' on the front of that one small countertop appliance."
)


def backup_existing():
    if not os.path.exists(SRC):
        return None
    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    dst = os.path.join(BACKUP_DIR, f"journey_hero_pre_brand_{stamp}.webp")
    shutil.copy2(SRC, dst)
    return dst


def main():
    backup = backup_existing()
    result = edit(
        SRC,
        PROMPT,
        size="1536x1024",
        quality="high",
        out_path=OUT,
    )
    if backup:
        result["backup"] = backup
    print(json.dumps(result))


if __name__ == "__main__":
    main()
