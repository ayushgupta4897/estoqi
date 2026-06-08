#!/usr/bin/env python3
"""Round 2 specimens. The first round covered okra, grapes, bell pepper,
coriander. This adds the 8 produce types still missing on /estoqi-labs."""
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
    "Documentary lab-still-life photograph captured on a full-frame "
    "mirrorless camera at 50mm prime, f/3.5, ISO 400. Single soft natural "
    "daylight from a high lab skylight. The specimen rests on a pale stone "
    "laboratory bench. Beside it: a small white ceramic dish, a stainless "
    "tweezer on a folded cotton cloth, the edge of a leather-bound notebook "
    "visible at one corner with neat handwritten (entirely illegible) "
    "annotations. Mood: precise, ordered, calm. Restrained editorial color "
    "science, real materials, real light, faint sensor grain. No HDR, no CG "
    "perfection, no plastic, no staged-shoot feel. Forbidden: any text, "
    "labels, logos, watermarks, signatures, or readable brand names."
)

CONCEPTS = [
    {
        "slug": "specimen_white_rice",
        "prompt": (
            "A small clean heap of uncooked white basmati rice grains "
            "(Oryza sativa) mounded in the white ceramic dish. A second "
            "small pile of grains spread on the stone bench beside the "
            "dish for size reference. A few stray grains scattered between "
            "them. " + DOC
        ),
    },
    {
        "slug": "specimen_broccoli",
        "prompt": (
            "A single fresh deep-green broccoli head (Brassica oleracea) "
            "with tight florets and a clean cut stem, resting on the white "
            "ceramic dish. Beside it, a small loose floret laid flat on the "
            "stone bench for specimen reference. Subtle morning light catches "
            "the texture of the florets. " + DOC
        ),
    },
    {
        "slug": "specimen_apple",
        "prompt": (
            "A single ripe red apple (Malus domestica) with a deep golden "
            "blush and the stem still attached, resting on the white ceramic "
            "dish. Beside it, an apple half sliced cleanly through, exposing "
            "the pale flesh, seed cavity, and a few dark seeds. " + DOC
        ),
    },
    {
        "slug": "specimen_cucumber",
        "prompt": (
            "A single fresh green cucumber (Cucumis sativus) with the natural "
            "ridges visible, resting lengthways across the white ceramic dish. "
            "Beside it, a clean cross-section cut showing the inner flesh and "
            "small seeds. A faint dew clings to the cucumber's skin. " + DOC
        ),
    },
    {
        "slug": "specimen_brinjal",
        "prompt": (
            "A single fresh glossy purple-black brinjal (Solanum melongena, "
            "Indian eggplant), with the green calyx still attached, resting "
            "on the white ceramic dish. Beside it, a half brinjal sliced "
            "lengthwise showing the pale flesh and tiny seeds. Skin shows a "
            "real specular highlight, not plastic gloss. " + DOC
        ),
    },
    {
        "slug": "specimen_mango",
        "prompt": (
            "A single ripe Alphonso-style Indian mango (Mangifera indica) "
            "with warm golden-orange skin and a small green shoulder, "
            "resting on the white ceramic dish. Beside it, a single mango "
            "cheek sliced cleanly off, exposing the bright orange flesh and "
            "a small slice of fibrous tissue near the stone. " + DOC
        ),
    },
    {
        "slug": "specimen_fenugreek",
        "prompt": (
            "A small loose bundle of fresh fenugreek (methi) leaves "
            "(Trigonella foenum-graecum) with slender green stems, resting "
            "in a casual loose cluster on the white ceramic dish. A few "
            "individual leaves spread on the stone bench beside the bundle "
            "for specimen reference. " + DOC
        ),
    },
    {
        "slug": "specimen_banana",
        "prompt": (
            "A small bunch of three ripe yellow bananas (Musa acuminata) "
            "with the natural curve and faint brown speckling, still "
            "attached at the stem, resting on the white ceramic dish. "
            "Beside the bunch, a single banana peeled half-down, showing "
            "the pale inner fruit. " + DOC
        ),
    },
]

def gen_one(api_key, c):
    body = {
        "model": "gpt-image-2",
        "prompt": c["prompt"],
        "size": "1024x1024",
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
    only = set(sys.argv[1:])
    targets = [c for c in CONCEPTS if not only or c["slug"] in only]
    print(f"# generating {len(targets)} specimen(s)", flush=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        results = list(ex.map(lambda c: gen_one(key, c), targets))
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
