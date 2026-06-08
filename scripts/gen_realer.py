#!/usr/bin/env python3
"""Push R01 to documentary realism — kitchen-captured, not styled."""
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
    "A documentary-style food photograph captured on a full-frame mirrorless camera "
    "with a 50mm prime lens at f/2.2, ISO 400, single natural daylight source from a "
    "side window. The shot was taken in a real working kitchen, not arranged for a "
    "photoshoot — the composition is informal and slightly off-center, as if found.\n\n"
    "Subject: a small disorderly cluster of four genuine heirloom tomatoes — the kind "
    "from a backyard garden, with irregular ribbed shoulders and uneven shape. One "
    "tomato shows a subtle natural skin blemish; another has a faint sunscald patch; "
    "one is slightly under-ripe at the calyx end with green-to-orange transition. "
    "Two real sprigs of fresh basil with leaves of varying sizes — one leaf has a "
    "small insect bite, another is slightly wilted at the tip, a third is missing a "
    "corner. The bunch is loose, not posed.\n\n"
    "Setting: an old well-used raw oak countertop with visible knife marks, a faint "
    "water-ring left from a previous glass, one tiny smudge of olive oil at the edge "
    "of frame. A simple straight-sided drinking glass holds water poured a few "
    "minutes ago — a single small bubble clings to the inside wall and tiny "
    "condensation droplets are forming on the outer surface. A few flecks of dry "
    "oregano and one small breadcrumb sit on the counter. A worn linen tea towel "
    "lies crumpled in the background, creased from actual use, not folded for the "
    "shot.\n\n"
    "Light & color: soft diffuse daylight from the upper-left window, deep painterly "
    "but soft shadows beneath the fruit. Restrained editorial color science — not "
    "punchy, not desaturated, just honest. Visible faint sensor grain consistent "
    "with a real ISO 400 capture. Almost-imperceptible chromatic aberration on the "
    "brightest highlights. No HDR look. No CG perfection. No plastic skin on the "
    "fruit. No saturated stock-photo coloring. No retouching aesthetic. No staged "
    "feeling.\n\n"
    "Forbidden: any text, any labels, any logos, any watermarks, any signatures, "
    "any brand names. No painted or illustrated quality."
)

def main():
    key = load_key()
    body = {
        "model": "gpt-image-2",
        "prompt": PROMPT,
        "size": "1024x1536",
        "quality": "high",
        "output_format": "webp",
        "output_compression": 92,
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
        with urlopen(req, timeout=240) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        print(f"HTTP {e.code}: {e.read().decode('utf-8','replace')[:600]}")
        sys.exit(1)
    b64 = payload["data"][0]["b64_json"]
    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, "r1b_stilllife_documentary.webp")
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))
    print(json.dumps({
        "ok": True, "path": out_path,
        "bytes": os.path.getsize(out_path),
        "secs": round(time.time()-t0, 1),
        "usage": payload.get("usage"),
    }, indent=2))

if __name__ == "__main__":
    main()
