"""Driver: generate a Forbes-cover-style editorial portrait of Jesal via image-to-image edit."""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _lib_openai_image import edit

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

REFERENCE = os.path.join(ROOT, ".assets", "jesal_source.jpg")
OUT_PATH = os.path.join(ROOT, "src/frontend/public/concepts/jesal_forbes.webp")

PROMPT = (
    "A Forbes-magazine cover-style editorial portrait of the same man as in the input photo. "
    "His face, hair (short, brushed back), build (early-thirties Indian man, medium build), "
    "skin tone, and identity are preserved exactly from the reference. He wears the same "
    "dark navy button-down shirt with the collar open, exactly as in the reference photo. "
    "The same warm friendly smile from the reference is preserved — open and approachable, "
    "the eyes warm.\n\n"
    "Composition: tight three-quarter frame from chest up, eyes meeting the lens directly. "
    "Expression: the same warm easy smile as in the reference photo — confident, "
    "approachable, the considered gaze of a founder who is comfortable in his own "
    "company.\n\n"
    "Lighting: a single large soft-box positioned upper-left at about 45 degrees creates gentle "
    "modeling on the face with a clean catchlight in both eyes; a low-bounce fill from the right "
    "opens the shadow side without flattening; a subtle hair-light separates him cleanly from the background.\n\n"
    "Background: a softly textured warm cream-to-grey gradient backdrop, slightly out of focus, "
    "with the suggestion of a single soft architectural shadow on the left edge to add depth — "
    "clean, neutral, magazine-cover ready.\n\n"
    "Camera: 85mm prime, f/2.8, ISO 200. Editorial photography discipline: natural skin texture "
    "preserved, real pores, real micro-shadows, a single tiny catchlight on the lower lip. "
    "No HDR. No plastic smoothing. No retouching-heavy beauty look. No CG.\n\n"
    "Forbidden: any text, labels, logos, watermarks, signatures, or any printed Forbes mark in the frame. "
    "The composition should READ as a magazine-cover portrait without ever showing or implying a logo."
)


def main():
    result = edit(
        REFERENCE,
        PROMPT,
        size="1024x1536",
        quality="high",
        out_path=OUT_PATH,
    )
    print(json.dumps(result))


if __name__ == "__main__":
    main()
