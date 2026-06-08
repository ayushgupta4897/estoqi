#!/usr/bin/env python3
"""Produce-proof wash shots for the homepage 'Clean-looking ≠ safe' reel.
Each is a documentary photograph of one specific produce being rinsed
in a commercial Indian kitchen, with the runoff visibly amber-yellow
in a glass bowl below the colander — the residue, made plain."""
import base64, json, os, sys, time
from concurrent.futures import ThreadPoolExecutor
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")
OUT_DIR  = os.path.join(os.path.dirname(__file__), "..", "src", "frontend", "public", "concepts", "proof")

def load_key():
    with open(ENV_PATH) as f:
        for line in f:
            if line.strip().startswith("OPENAI_API_KEY"):
                return line.partition("=")[2].strip().strip('"').strip("'")
    raise RuntimeError("OPENAI_API_KEY missing")

# Shared setting + style — repeated EXACTLY so the four reels read
# as one cohesive series of moments in the same commercial kitchen.
SETTING_STYLE = (
    "A documentary editorial photograph captured in a real working "
    "commercial Indian kitchen. The setting: aged white subway-tile "
    "walls with stainless-steel trim, a stainless-steel prep counter "
    "with visible knife marks, a wall-mounted unbranded flow meter, the "
    "soft-blurred shapes of hanging copper-bottomed saucepans in the "
    "background, a folded cotton apron on a hook. Cool overhead daylight "
    "from a skylight, supplemented by warm tungsten work-light from the "
    "side.\n\n"
    "Composition: a wide stainless-steel sink in the foreground. Over "
    "the basin sits a clean stainless-steel colander filled with the "
    "subject produce. Directly below the colander, supported on a "
    "stainless wire rack inside the basin, is a wide clear-glass mixing "
    "bowl that catches the runoff water. The runoff is VISIBLY MURKY "
    "AMBER-YELLOW, slightly turbid, with a few darker particulates "
    "suspended — the pesticide residue made plain. The contrast between "
    "the clean clear stream above and the dirty amber runoff below is "
    "unmistakable but plausible, never theatrical.\n\n"
    "Camera: full-frame mirrorless at 50mm prime, f/4, ISO 400. Real "
    "water, real reflections, real refractions. Restrained editorial "
    "color science, faint sensor grain, real shadow. No HDR. No CG "
    "plastic. No staged-shoot feel. No saturated stock-photo coloring. "
    "Forbidden: any text, labels, logos, watermarks, signatures, or "
    "readable brand names."
)

CONCEPTS = [
    {
        "slug": "proof_tomato",
        "subject": (
            "Subject: a small cluster of four to five ripe vine-ripe heirloom "
            "tomatoes (Solanum lycopersicum) of varied colors — deep red, "
            "golden, oxblood — sit in the colander. A clean stream of water "
            "from a polished stainless commercial tap rinses across them, "
            "breaking into fine droplets that catch the light. The tomatoes "
            "are the subject; the runoff in the bowl below is amber-yellow."
        ),
    },
    {
        "slug": "proof_spinach",
        "subject": (
            "Subject: a generous handful of fresh dark-green spinach leaves "
            "(Spinacia oleracea), stems still attached, piled loosely in the "
            "colander. A clean stream of water from a polished stainless "
            "commercial tap rinses over the leaves, breaking into fine "
            "droplets. The spinach is the subject; the runoff in the bowl "
            "below is amber-yellow."
        ),
    },
    {
        "slug": "proof_grapes",
        "subject": (
            "Subject: a small cluster of plump dark-purple table grapes "
            "(Vitis vinifera) still on the vine, with a faint natural bloom "
            "on the skins, resting in the colander. A clean stream of water "
            "from a polished stainless commercial tap rinses over the cluster, "
            "breaking into droplets that catch the light. The grapes are the "
            "subject; the runoff in the bowl below is amber-yellow."
        ),
    },
    {
        "slug": "proof_coriander",
        "subject": (
            "Subject: a generous loose bundle of fresh green coriander "
            "(Coriandrum sativum) with leaves, stems, and intact root tips, "
            "resting in the colander. A clean stream of water from a polished "
            "stainless commercial tap rinses over the bundle, breaking into "
            "fine droplets. The coriander is the subject; the runoff in the "
            "bowl below is amber-yellow."
        ),
    },
]

def gen_one(api_key, c):
    body = {
        "model": "gpt-image-2",
        "prompt": SETTING_STYLE + "\n\n" + c["subject"],
        "size": "1024x1280",
        "quality": "high",
        "output_format": "webp",
        "output_compression": 90,
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
        with urlopen(req, timeout=420) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        return {"slug": c["slug"], "ok": False, "error": f"HTTP {e.code}: {e.read().decode('utf-8','replace')[:300]}", "secs": round(time.time()-t0,1)}
    except URLError as e:
        return {"slug": c["slug"], "ok": False, "error": f"URL: {e.reason}", "secs": round(time.time()-t0,1)}
    if not payload.get("data") or not payload["data"][0].get("b64_json"):
        return {"slug": c["slug"], "ok": False, "error": "empty"}
    b64 = payload["data"][0]["b64_json"]
    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, f"{c['slug']}.webp")
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))
    return {"slug": c["slug"], "ok": True, "bytes": os.path.getsize(out_path), "secs": round(time.time()-t0,1)}

def main():
    key = load_key()
    only = set(sys.argv[1:])
    targets = [c for c in CONCEPTS if not only or c["slug"] in only]
    print(f"# generating {len(targets)} proof reel(s)", flush=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        results = list(ex.map(lambda c: gen_one(key, c), targets))
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
