#!/usr/bin/env python3
"""New Science page hero. The founder pushed back on the previous header
which read as a chemical-lab interior. New brief: keep water in frame,
no glassware-on-a-stainless-bench feel, and the brand mark 'Estoqi'
highlighted within the composition (etched / debossed onto a glass).
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _lib_openai_image import generate

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT_PATH = os.path.join(ROOT, "src/frontend/public/concepts/science_hero.webp")

PROMPT = (
    "A documentary editorial photograph, very wide cinematic crop. The "
    "subject: a single tall straight-sided clear glass tumbler filled to "
    "two-thirds with crystal-clear water, photographed at close range "
    "against a deeply blurred, softly-lit warm cream background. The "
    "glass sits on a worn dark-oak counter. A clean stream of water from "
    "above is mid-fall into the glass, breaking gently into the surface "
    "with real refractions and tiny droplets caught in side-light. "
    "Visible faint silvery micro-bubbles cling to the inside walls of "
    "the glass, suggesting the water is alive and freshly drawn.\n\n"
    "On the front face of the glass, etched into the surface as if "
    "sandblasted by a craftsperson, the lowercase wordmark 'estoqi' is "
    "subtly visible — the same italic, slightly bookish lettering of the "
    "brand. The etching is delicate, not loud — readable but not "
    "shouting; it sits within the visual hierarchy of the glass as a "
    "discreet maker's mark, catching light only where the surface "
    "catches the highlight from the upper-left soft daylight. No font "
    "outlines; the etched letters are part of the glass, not pasted on.\n\n"
    "Camera: 85mm prime, f/2.8, ISO 200. Single soft window light from "
    "upper-left, a low warm fill from the right. Restrained editorial "
    "colour science, faint sensor grain, real catchlight on the glass "
    "rim, real condensation droplets gathering on the lower outside of "
    "the glass. The mood: calm, considered, premium, scientifically "
    "literate without ever showing a single piece of laboratory "
    "equipment.\n\n"
    "Strictly forbidden in the frame: any laboratory glassware (no "
    "beakers, flasks, pipettes, test tubes, droppers); any stainless-"
    "steel workbench surface; any lab coats; any analytical instrument; "
    "any visible measurement scale; any photographic plastic; any HDR "
    "look; any signage, labels, badges, or watermarks other than the "
    "described etched 'estoqi' wordmark."
)


def main():
    result = generate(
        PROMPT,
        size="1536x1024",
        quality="high",
        out_path=OUT_PATH,
    )
    print(json.dumps(result))


if __name__ == "__main__":
    main()
