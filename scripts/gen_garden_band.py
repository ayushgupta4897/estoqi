#!/usr/bin/env python3
"""Panoramic botanical garden band for the footer."""
import base64, json, os, sys, time
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")
OUT_DIR  = os.path.join(os.path.dirname(__file__), "..", "src", "frontend", "public", "concepts")

def load_key():
    with open(ENV_PATH) as f:
        for line in f:
            if line.strip().startswith("OPENAI_API_KEY"):
                return line.partition("=")[2].strip().strip('"').strip("'")
    raise RuntimeError("OPENAI_API_KEY missing")

PROMPT = (
    "A wide panoramic painterly modernist illustration of an abundant botanical "
    "kitchen garden harvest. Across the panoramic width, an enormous abundance of "
    "fresh produce laid out in a generous loose tableau: heirloom tomatoes in red, "
    "golden, and oxblood; green and red bell peppers; bunches of dark leafy spinach "
    "and curly kale; rainbow chard with crimson stems; okra pods; aubergines; "
    "orange carrots with greens still attached; whole lemons and limes; a halved "
    "mango showing its flesh; pomegranates split open with ruby seeds visible; "
    "pale-green guavas; orange papayas; deep purple figs; clusters of green and dark "
    "grapes; sprigs of fresh basil, coriander, curry leaves, and mint. Each item is "
    "rendered with deliberate shape and color, not photographic detail.\n\n"
    "On the LEFT side of the composition, a vertical arc of crystal-clear water "
    "descends from above the frame onto the produce, painted as a translucent "
    "ribbon of light blue with small white droplets fanning out where it hits the "
    "vegetables. The water is bright, alive, clean.\n\n"
    "On the RIGHT side of the composition, the water has flowed across the produce "
    "and exits the frame as a visibly amber-brown stream of pesticide-laden runoff. "
    "It is painted slightly turbid, slightly darker than the clean stream, flowing "
    "out and downward in a thin painted ribbon. A few darker particles suspended.\n\n"
    "Style: painterly modernist with strong shape language and considered color "
    "blocks, visible brushstroke texture, warm muted palette anchored by deep "
    "botanical greens with warm earthy reds, golden yellows, and rich purples. "
    "The calm of a mid-twentieth-century American still-life painting transposed to "
    "a kitchen garden. The background behind the produce is a deep botanical "
    "forest-green tone, fading to a slightly darker green at the edges so the band "
    "can sit on a dark green footer surface without harsh transitions.\n\n"
    "Lighting: soft directional warm daylight from the upper-left, deep painterly "
    "shadows under the produce, no photo-realism, no HDR.\n\n"
    "Strictly no text, no labels, no logos, no watermarks, no signatures. No staged "
    "photoshoot feel. No CG plastic skin."
)

def main():
    key = load_key()
    body = {
        "model": "gpt-image-2",
        "prompt": PROMPT,
        "size": "2048x768",
        "quality": "high",
        "output_format": "webp",
        "output_compression": 90,
        "n": 1,
    }
    req = Request(
        "https://api.openai.com/v1/images/generations",
        data=json.dumps(body).encode("utf-8"),
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        method="POST",
    )
    t0 = time.time()
    try:
        with urlopen(req, timeout=300) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        print(f"HTTP {e.code}: {e.read().decode('utf-8','replace')[:600]}")
        sys.exit(1)
    b64 = payload["data"][0]["b64_json"]
    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, "garden_band.webp")
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))
    print(json.dumps({
        "ok": True, "path": out_path,
        "bytes": os.path.getsize(out_path),
        "secs": round(time.time()-t0, 1),
    }, indent=2))

if __name__ == "__main__":
    main()
