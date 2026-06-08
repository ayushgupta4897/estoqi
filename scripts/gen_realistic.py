#!/usr/bin/env python3
"""
Ultra-realistic ultra-premium photography samples via gpt-image-2.
Sets the visual bar for ESTOQI hero imagery.
"""
import base64, json, os, sys, time
from concurrent.futures import ThreadPoolExecutor
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

PHOTOGRAPHY_FOUNDATION = (
    "Ultra-realistic, ultra-premium editorial food photography of the absolute highest "
    "caliber — the level you would see on the cover of a major culinary publication or "
    "a flagship product launch. Medium-format camera quality, shallow but considered "
    "depth of field at roughly f/2.8, almost no sensor noise, extremely high "
    "micro-detail. Natural directional window light, warm and slightly soft, falling "
    "from the upper-left, with deep painterly shadows. Visible material texture: real "
    "skin on the fruit with tiny natural imperfections, a faint dust on the bloom, "
    "real moisture catching the highlight. Real water — true refraction, true "
    "surface tension, true reflection. No CG perfection. No plastic look. No stock "
    "photography blandness. Color palette: warm cream linen, terracotta-red, deep "
    "leaf-green, oak-honey, with a touch of cool slate in the deepest shadows."
)

CONCEPTS = [
    {
        "slug": "r1_stilllife_canon",
        "title": "Hero still-life (canonical look)",
        "prompt": (
            "A still-life composition: a small cluster of vine-ripe heirloom tomatoes "
            "with their green calyx still attached, two sprigs of garden-fresh basil "
            "with visible leaf veins, and a slim straight-sided drinking glass filled "
            "two-thirds with clear water — all arranged on a sun-warmed raw oak "
            "countertop in front of a soft cream linen background. A single droplet "
            "of water hangs suspended in mid-air just above the topmost tomato, "
            "caught mid-fall, with a tiny highlight on its leading edge. The "
            "composition is calm and ceremonial — every object placed deliberately. "
            "A hint of an out-of-focus window frame in the far background. "
            f"{PHOTOGRAPHY_FOUNDATION} "
            "No text, no labels, no logos, no watermarks, no captions."
        ),
    },
    {
        "slug": "r2_process_water",
        "title": "Process moment — water meeting produce",
        "prompt": (
            "A close-up process photograph: a clean stream of crystal-clear ionized "
            "water arcing gently from a polished stainless-steel kitchen tap onto a "
            "bunch of fresh spinach leaves resting in a wide white ceramic bowl. The "
            "water makes contact with the leaves and breaks into a fine spray of "
            "small individual droplets, each one catching the warm window light. A "
            "few tomatoes and a sprig of coriander rest beside the bowl on a raw "
            "oak counter. The mood is calm and intentional, the gesture is daily "
            "and ritual. Very slight motion blur on the water stream — the rest of "
            "the frame is razor sharp. "
            f"{PHOTOGRAPHY_FOUNDATION} "
            "No text, no labels, no logos, no watermarks, no brand names on the tap."
        ),
    },
]

def gen_one(api_key, concept):
    body = {
        "model": "gpt-image-2",
        "prompt": concept["prompt"],
        "size": "1024x1536",
        "quality": "high",
        "output_format": "webp",
        "output_compression": 92,
        "n": 1,
    }
    req = Request(
        "https://api.openai.com/v1/images/generations",
        data=json.dumps(body).encode("utf-8"),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    t0 = time.time()
    try:
        with urlopen(req, timeout=240) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        return {"slug": concept["slug"], "ok": False, "error": f"HTTP {e.code}: {e.read().decode('utf-8','replace')[:400]}", "secs": round(time.time()-t0,1)}
    except URLError as e:
        return {"slug": concept["slug"], "ok": False, "error": f"URL error: {e.reason}", "secs": round(time.time()-t0,1)}
    if not payload.get("data"):
        return {"slug": concept["slug"], "ok": False, "error": f"no data: {json.dumps(payload)[:300]}", "secs": round(time.time()-t0,1)}
    b64 = payload["data"][0].get("b64_json")
    if not b64:
        return {"slug": concept["slug"], "ok": False, "error": "no b64_json", "secs": round(time.time()-t0,1)}
    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, f"{concept['slug']}.webp")
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))
    return {"slug": concept["slug"], "ok": True, "bytes": os.path.getsize(out_path),
            "secs": round(time.time()-t0,1), "usage": payload.get("usage")}

def main():
    key = load_key()
    with ThreadPoolExecutor(max_workers=2) as ex:
        results = list(ex.map(lambda c: gen_one(key, c), CONCEPTS))
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
