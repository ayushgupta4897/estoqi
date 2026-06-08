#!/usr/bin/env python3
"""Generate sys_step01_tap concept image via OpenAI gpt-image-2."""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from _lib_openai_image import generate

PROMPT = (
    "A documentary editorial photograph of an ordinary Indian kitchen sink moment, "
    "captured at very close range. The subject: a polished stainless-steel kitchen tap "
    "with a clean stream of plain tap water running freely into a clear glass tumbler "
    "being held by a hand at the lower edge of frame. The water is mid-flow, breaking "
    "softly into the glass with real refractions and a small splash. Background: an "
    "honest small Indian kitchen — pale plaster wall in soft blur, an open shelf with a "
    "couple of stainless dabbas and a small stainless tiffin out of focus, a window edge "
    "with diffused afternoon daylight. The mood is calm, almost unceremonious — this is "
    "how the day begins. Camera: full-frame mirrorless at 50mm, f/2.8, ISO 400. "
    "Documentary editorial color science, real water, real reflections, faint sensor grain. "
    "No HDR, no plastic, no staged-shoot feel, no aspirational over-styling. "
    "Forbidden: any text, labels, logos, watermarks, signatures."
)

OUT_PATH = "src/frontend/public/concepts/sys_step01_tap.webp"
SIZE = "1024x1536"

def main():
    result = generate(PROMPT, size=SIZE, quality="high", out_path=OUT_PATH)
    print(json.dumps(result))

if __name__ == "__main__":
    main()
