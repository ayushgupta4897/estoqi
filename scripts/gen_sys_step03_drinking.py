import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from _lib_openai_image import generate

PROMPT = (
    "A documentary editorial photograph of a tall straight-sided clear glass tumbler "
    "filled with pH 9.5 hydrogen-rich drinking water, resting on a worn dark-oak counter "
    "in soft natural daylight. The glass is perfectly clear; visible faint silvery "
    "micro-bubbles cling to the inside surfaces of the glass, suggesting dissolved "
    "molecular hydrogen still releasing slowly. Beside the glass: a small handmade "
    "ceramic dish with a fresh sprig of mint, the edge of a folded linen napkin in soft "
    "blur, and a small wedge of cut lime. Behind, softly out of focus, a single pale "
    "green plant frond catches the side window light. Camera: 100mm macro, f/4, ISO 400, "
    "single soft daylight from a tall window to the left, fill bounce from the right. "
    "Restrained editorial color science, faint sensor grain, real catchlight on the "
    "glass rim. No HDR. No plastic. No stock-photo coloring. Forbidden: any text, "
    "labels, logos, watermarks, signatures."
)

OUT_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "src/frontend/public/concepts/sys_step03_drinking.webp",
)

result = generate(PROMPT, size="1024x1536", quality="high", out_path=OUT_PATH)
print(json.dumps(result))
