"""Generate featured background image via gpt-image-2."""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from _lib_openai_image import generate

PROMPT = (
    "A sophisticated documentary editorial photograph of a desk-top still life: "
    "a neatly stacked pile of five or six folded prestige business broadsheet newspapers "
    "and one or two thick magazine issues, slightly fanned out, photographed from above "
    "and slightly to the side. The papers have visible neutral editorial typography but "
    "no legible text or readable brand names; the texture of the newsprint, the gentle "
    "shadows between sheets, and the subtle paper grain are clearly visible. Surface: a "
    "worn warm-brown leather-topped writing desk with a single closed fountain pen and a "
    "small folded pair of reading glasses placed naturally to the side. A vintage brass "
    "desk lamp throws a soft pool of warm light from the upper left. Camera: 35mm at f/4, "
    "ISO 400, soft window light combined with the warm lamp. Restrained editorial palette: "
    "warm sepia, ink-black, cream, with one small accent of deep navy on the pen barrel. "
    "Mood: serious, considered, archival. No HDR. No plastic. No CG. Forbidden: any text, "
    "labels, logos, watermarks, signatures, or readable brand names anywhere in the frame."
)

OUT_PATH = os.path.join(
    os.path.dirname(__file__), "..",
    "src/frontend/public/concepts/featured_bg.webp",
)
OUT_PATH = os.path.abspath(OUT_PATH)

result = generate(PROMPT, size="1536x1024", quality="high", out_path=OUT_PATH)
print(json.dumps(result))
