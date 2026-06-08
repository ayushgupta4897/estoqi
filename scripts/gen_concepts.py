#!/usr/bin/env python3
"""
Concept image generator for ESTOQI revamp.
Generates 3 art-direction samples via gpt-image-2 in parallel.
"""
import base64, json, os, sys, time
from concurrent.futures import ThreadPoolExecutor
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "frontend", "public", "concepts")

def load_key():
    with open(ENV_PATH) as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENAI_API_KEY"):
                _, _, v = line.partition("=")
                return v.strip().strip('"').strip("'")
    raise RuntimeError("OPENAI_API_KEY not found in .env")

CONCEPTS = [
    {
        "slug": "a_editorial_botanical",
        "title": "Editorial Botanical Illustration",
        "prompt": (
            "A hand-painted gouache and watercolor editorial illustration of a ripe vine "
            "tomato cluster resting beside a sprig of fresh basil on a warm wooden kitchen "
            "counter, with a single bright droplet of clear water suspended mid-air about "
            "to fall onto the fruit. Warm cream paper background with visible paper grain "
            "and subtle painterly texture. Soft, generous brushstrokes, small painted "
            "imperfections, an authored hand-made feel — a contemporary magazine-cover "
            "illustration sensibility. Muted but alive palette: ripe vermillion red, deep "
            "leaf-green, golden cream, soft slate, warm ochre. Soft natural light from "
            "upper-left. Composition reads as a single chapter opening from a beautifully "
            "illustrated book about food and time. Strictly no photo-realism — this is "
            "an illustration, not a photograph. No text, no labels, no logos, no watermarks, "
            "no signatures."
        ),
    },
    {
        "slug": "b_naturalist_plate",
        "title": "Naturalist Specimen Plate",
        "prompt": (
            "A 19th-century scientific botanical illustration plate of a tomato plant. "
            "The plate shows the fruit cluster on the vine at center, individual specimen "
            "leaves on the left, a precise cross-section of the fruit revealing seed cavities "
            "in the lower-right, and a small detailed study of the flower bud at upper-right. "
            "Watercolor washes and fine pen-and-ink linework on aged cream parchment paper "
            "with visible deckle edge and faint age spotting. Detailed naturalist linework, "
            "warm painterly palette, quiet life. Faded sepia hand-lettered annotations at the "
            "margins (illegible decorative script only, no readable words). Composed like a "
            "single page from an antique botanical encyclopedia. Museum specimen quality. "
            "No modern typography, no logos, no watermarks, no readable text."
        ),
    },
    {
        "slug": "c_modernist_stilllife",
        "title": "Painterly Modernist Still-Life",
        "prompt": (
            "A modern painterly still-life composition. Three vine-ripe tomatoes, a small "
            "bundle of fresh herbs, and a slim drinking glass half-filled with clear water, "
            "arranged on a warm cream linen tablecloth on a wooden table. Painted in a flat "
            "mid-twentieth-century American still-life tradition: strong shape language, "
            "considered color blocks, visible brush texture, ceremonial composition. Warm "
            "muted palette: cream, terracotta, vermillion, deep leaf-green, soft slate-blue, "
            "ochre. Subtle dramatic shadow play with diffused warm light from one side, "
            "creating a calm, slightly cinematic mood. The geometric calm of a designed "
            "interior film set. Visible painterly texture; no photo-realism. No text, no "
            "labels, no logos, no watermarks, no signatures."
        ),
    },
]

def gen_one(api_key, concept):
    body = {
        "model": "gpt-image-2",
        "prompt": concept["prompt"],
        "size": "1024x1536",
        "quality": "medium",
        "output_format": "webp",
        "output_compression": 90,
        "n": 1,
    }
    req = Request(
        "https://api.openai.com/v1/images/generations",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    t0 = time.time()
    try:
        with urlopen(req, timeout=180) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        body_txt = e.read().decode("utf-8", "replace")
        return {"slug": concept["slug"], "ok": False, "error": f"HTTP {e.code}: {body_txt}", "secs": round(time.time()-t0,1)}
    except URLError as e:
        return {"slug": concept["slug"], "ok": False, "error": f"URL error: {e.reason}", "secs": round(time.time()-t0,1)}

    if "data" not in payload or not payload["data"]:
        return {"slug": concept["slug"], "ok": False, "error": f"no data in response: {json.dumps(payload)[:400]}", "secs": round(time.time()-t0,1)}
    img = payload["data"][0]
    b64 = img.get("b64_json")
    if not b64:
        return {"slug": concept["slug"], "ok": False, "error": "no b64_json", "secs": round(time.time()-t0,1)}
    out_path = os.path.join(OUT_DIR, f"{concept['slug']}.webp")
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))
    return {
        "slug": concept["slug"],
        "ok": True,
        "path": out_path,
        "bytes": os.path.getsize(out_path),
        "secs": round(time.time()-t0,1),
        "usage": payload.get("usage"),
    }

def main():
    key = load_key()
    # Allow regenerating a subset: python gen_concepts.py a c
    only = set(sys.argv[1:])
    concepts = [c for c in CONCEPTS if not only or c["slug"][0] in only or c["slug"] in only]
    with ThreadPoolExecutor(max_workers=3) as ex:
        results = list(ex.map(lambda c: gen_one(key, c), concepts))
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
