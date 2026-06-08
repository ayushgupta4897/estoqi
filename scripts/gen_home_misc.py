#!/usr/bin/env python3
"""Two remaining Home images: hydration moment + business scale."""
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

CONCEPTS = [
    {
        "slug": "hydration_moment",
        "prompt": (
            "A documentary-style still-life photograph captured on a full-frame "
            "mirrorless camera with a 50mm prime lens at f/2.2, ISO 400, soft "
            "natural daylight from a side window. Found, not arranged.\n\n"
            "Subject: a single tall straight-sided clear drinking glass filled "
            "two-thirds with crystal-clear water, sitting on an aged limewashed "
            "stone counter beside a small ceramic pitcher with a chipped rim. The "
            "water in the glass shows real refraction — the stone behind appears "
            "subtly distorted through it. A few small bubbles cling to the inside "
            "wall, and very fine condensation has begun forming on the outer "
            "surface. A thin sprig of mint and one quarter-slice of lime rest on a "
            "small saucer beside the glass.\n\n"
            "Setting: an unhurried morning interior — a faded indigo cotton "
            "table-runner partially folded at the frame edge, soft-blur a pale "
            "wall behind, a hint of an open window with greenery beyond. A wooden "
            "spoon rests beside the pitcher.\n\n"
            "Light & color: warm directional morning daylight from the upper-left, "
            "deep but soft painterly shadows. Restrained editorial color science — "
            "the water reads cool against the warm room tones, but is honest, never "
            "punchy. Faint sensor grain consistent with ISO 400.\n\n"
            "Forbidden: any text, any labels, any logos, any watermarks, any "
            "signatures, any brand names. No painted or illustrated quality. No "
            "staged-shoot feeling. No HDR. No saturated stock-photo coloring."
        ),
        "size": "1024x1536",
    },
    {
        "slug": "business_scale",
        "prompt": (
            "A documentary-style commercial-kitchen photograph captured on a "
            "full-frame mirrorless camera with a 35mm prime lens at f/2.8, ISO 800, "
            "ambient interior light supplemented by overhead daylight panels. "
            "Found, not arranged — a real moment during a working prep shift.\n\n"
            "Subject: a clean professional Indian restaurant or cloud-kitchen prep "
            "area. A wide stainless-steel double sink dominates the foreground; in "
            "one basin, a large quantity of fresh coriander, mint, and curry leaves "
            "is being rinsed by a continuous flow of clear ionized water from a "
            "polished commercial faucet. Stainless-steel perforated trays of clean "
            "rinsed produce — green chilies, ginger, garlic, tomatoes — sit on a "
            "stainless rack to the right, water still beading on the surfaces.\n\n"
            "Setting: white subway-tile walls with stainless trim, a stainless prep "
            "table behind, a wall-mounted IoT flow-meter visible but unbranded, "
            "the corner of a wall-mounted whiteboard with a faint daily-log grid "
            "(no readable text). A cotton apron hangs on a hook in the soft-blur "
            "background.\n\n"
            "Light & color: cool overhead daylight from the upper-right, warm "
            "tungsten fill from the prep area, deep but soft shadows in the lower "
            "corners. Slightly higher sensor grain consistent with ISO 800 in a "
            "working interior. Restrained editorial color science — clean and "
            "industrial but human. No HDR.\n\n"
            "Forbidden: any text, any labels, any logos, any watermarks, any "
            "signatures, any readable brand names, any human faces visible (hands "
            "and arms OK at frame edge). No painted or illustrated quality. No "
            "staged-shoot feeling."
        ),
        "size": "1024x1536",
    },
]

def gen_one(api_key, c):
    body = {
        "model": "gpt-image-2",
        "prompt": c["prompt"],
        "size": c["size"],
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
        with urlopen(req, timeout=300) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        return {"slug": c["slug"], "ok": False, "error": f"HTTP {e.code}: {e.read().decode('utf-8','replace')[:400]}"}
    except URLError as e:
        return {"slug": c["slug"], "ok": False, "error": f"URL: {e.reason}"}
    if not payload.get("data"):
        return {"slug": c["slug"], "ok": False, "error": f"no data: {json.dumps(payload)[:300]}"}
    b64 = payload["data"][0]["b64_json"]
    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, f"{c['slug']}.webp")
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))
    return {"slug": c["slug"], "ok": True, "bytes": os.path.getsize(out_path), "secs": round(time.time()-t0,1)}

def main():
    key = load_key()
    with ThreadPoolExecutor(max_workers=2) as ex:
        results = list(ex.map(lambda c: gen_one(key, c), CONCEPTS))
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
