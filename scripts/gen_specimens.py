#!/usr/bin/env python3
"""Specimen photos for the Labs Produce Reports + Philosophy gallery."""
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

DOC = (
    "Documentary lab-still-life photograph captured on a full-frame mirrorless "
    "camera at 50mm prime, f/3.5, ISO 400. Single soft natural daylight from a "
    "high lab skylight. The specimen rests on a pale stone laboratory bench. "
    "Beside it: a small white ceramic dish, a stainless tweezer on a folded "
    "cotton cloth, the edge of a leather-bound notebook visible at one corner "
    "with neat handwritten (entirely illegible) annotations. Mood: precise, "
    "ordered, calm. Restrained editorial color science, real materials, real "
    "light, faint sensor grain. No HDR, no CG perfection, no plastic, no "
    "staged-shoot feel. Forbidden: any text, labels, logos, watermarks, "
    "signatures, or readable brand names."
)

CONCEPTS = [
    {
        "slug": "specimen_okra",
        "size": "1024x1024",
        "prompt": (
            "A small cluster of six fresh okra pods (Abelmoschus esculentus) "
            "with deep green ribbed skin and intact stem-ends, arranged on the "
            "white ceramic dish. One pod is sliced cleanly across, showing the "
            "characteristic interior cross-section with five compartments and "
            "small seeds. " + DOC
        ),
    },
    {
        "slug": "specimen_grapes",
        "size": "1024x1024",
        "prompt": (
            "A small bunch of fresh dark-purple wine grapes (Vitis vinifera) "
            "still on a single stem with a few intact green leaves, resting on "
            "the white ceramic dish. The grapes show a faint natural bloom "
            "(waxy white coating) that catches the light. A single grape is "
            "shown sliced in cross-section beside the bunch, exposing the "
            "pale-green flesh and one seed. " + DOC
        ),
    },
    {
        "slug": "specimen_bell_pepper",
        "size": "1024x1024",
        "prompt": (
            "A single fresh ripe red bell pepper (Capsicum annuum) with intact "
            "green stem, resting on the white ceramic dish. Beside it, a second "
            "bell pepper sliced cleanly down its vertical axis, exposing the "
            "interior cavity with the pale-yellow placental tissue and a small "
            "cluster of cream-colored seeds. Skin shows a real specular "
            "highlight, not plastic gloss. " + DOC
        ),
    },
    {
        "slug": "specimen_coriander",
        "size": "1024x1024",
        "prompt": (
            "A small loose bundle of fresh coriander (Coriandrum sativum) with "
            "leaves, slender stems, and intact root tips, resting on the white "
            "ceramic dish. A few leaves have a faint natural water droplet "
            "clinging. A second small sprig is laid flat beside the bundle for "
            "specimen reference. " + DOC
        ),
    },
]

def gen_one(api_key, c):
    body = {
        "model": "gpt-image-2",
        "prompt": c["prompt"],
        "size": c["size"],
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
        with urlopen(req, timeout=300) as resp:
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
    print(f"# generating {len(CONCEPTS)} specimens", flush=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        results = list(ex.map(lambda c: gen_one(key, c), CONCEPTS))
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
