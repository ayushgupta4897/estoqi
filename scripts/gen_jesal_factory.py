#!/usr/bin/env python3
"""Generate jesal_factory.webp via image-to-image edit using the shared helper."""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _lib_openai_image import edit  # noqa: E402

REPO = Path(__file__).resolve().parent.parent

REFERENCE = REPO / ".assets" / "jesal_source.jpg"
OUT_PATH = REPO / "src" / "frontend" / "public" / "concepts" / "jesal_factory.webp"

PROMPT = (
    "A documentary editorial portrait of the same man as in the input photo, "
    "photographed inside a sophisticated water-technology factory floor that doubles "
    "as a small clean-room laboratory. The man stands three-quarter angle, centered, "
    "with calm assured posture and a warm easy smile (matching his expression in the "
    "reference) — one hand resting lightly on a polished stainless rail, the other "
    "relaxed at his side or in his pocket. He wears the same dark navy button-down "
    "shirt with the collar open and dark trousers with a black belt, exactly as in "
    "the reference photo. His face, hair (short, brushed back), build (early-thirties "
    "Indian man, medium build), skin tone, and overall identity are preserved exactly "
    "from the reference. The warm friendly smile is preserved exactly.\n\n"
    "The setting behind him:\n"
    "- Mid-ground left: a row of bright stainless-steel cylindrical electrolysis chambers "
    "being assembled by two or three technicians in clean white coats and disposable hair "
    "covers. Visible polished components, a small tray of titanium electrode plates, soft "
    "warm task-lights on swing arms.\n"
    "- Mid-ground right: a glass-walled small laboratory bench area where two scientists in "
    "lab coats work over calibrated instruments — a pH meter, a small spectrophotometer, an "
    "open ring binder with charts. Slight motion blur in their hands.\n"
    "- Background: pale concrete floor with subtle factory-line markings, a high steel-truss "
    "ceiling, large cool overhead LED panels mixed with warm tungsten work-light from the "
    "side, a hint of a stainless mixing skid in the soft blur.\n\n"
    "Camera: full-frame mirrorless at 50mm prime, f/2.8, ISO 800. Documentary photography "
    "discipline. Restrained editorial color science. Real materials, real shadow, faint "
    "sensor grain. No HDR. No plastic. No staged-shoot feel. Skin texture preserved natural. "
    "Forbidden: any text, labels, logos, watermarks, signatures, or readable brand names "
    "anywhere in the frame."
)


def main() -> int:
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    result = edit(
        str(REFERENCE),
        PROMPT,
        size="1024x1536",
        quality="high",
        out_path=str(OUT_PATH),
    )
    print(json.dumps(result, default=str))
    return 0 if result.get("ok") else 1


if __name__ == "__main__":
    sys.exit(main())
