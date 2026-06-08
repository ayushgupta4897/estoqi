#!/usr/bin/env python3
"""Extra imagery for ForFoodBusinesses + Labs."""
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
    "Documentary-style editorial photograph captured on a full-frame mirrorless "
    "camera. Restrained editorial color science, faint sensor grain, real materials, "
    "real light. No HDR. No CG plastic. No staged-shoot feel. Forbidden: any text, "
    "labels, logos, watermarks, signatures, or readable brand names anywhere in the frame."
)

CONCEPTS = [
    {
        "slug": "biz_cold_chain",
        "size": "1536x1024",
        "prompt": (
            "A documentary photograph of a working cold-chain storage facility. A long "
            "stainless-steel shelving rack holds neatly arranged crates of fresh produce: "
            "tomatoes in one crate, bunches of leafy greens in another, lemons in a third, "
            "ginger in a fourth. The room is calmly lit by cool overhead daylight, with a "
            "faint mist of cold air visible near the floor. Pale concrete floor with "
            "subtle scuffs. A worn cotton tarp folded at the frame edge. No human faces; "
            "a single gloved hand reaches in from the edge to adjust a crate. The mood is "
            "industrial, ordered, real. 35mm at f/3.5, ISO 800. " + DOC
        ),
    },
    {
        "slug": "biz_audit_clipboard",
        "size": "1024x1536",
        "prompt": (
            "A documentary close-up photograph of a food-safety auditor's clipboard "
            "resting on a stainless-steel kitchen prep table. The clipboard holds a "
            "white printed checklist sheet with a precisely ruled grid (entirely "
            "illegible text, no readable words). A precision pen rests across the "
            "clipboard. A pair of thin nitrile-gloved hands at the frame edge make a "
            "tick mark on the sheet. A small unbranded handheld instrument with a "
            "calm glass face sits beside the clipboard. Soft cool overhead daylight "
            "from above. Mood: calm authority, real procedure. 50mm at f/3.2, ISO 400. "
            + DOC
        ),
    },
    {
        "slug": "labs_split_panel",
        "size": "2048x1024",
        "prompt": (
            "A wide documentary still-life photograph divided into two halves by a "
            "vertical thin painted dark line. LEFT HALF: a pristine pre-wash specimen, "
            "a ripe heirloom tomato resting on a small white ceramic plate on a pale "
            "stone laboratory bench, beside it a clear glass vial with a sample of "
            "amber-tinted water (the wash-runoff post-test). RIGHT HALF: the post-wash "
            "specimen, the same tomato now resting on a clean white plate beside a "
            "clear glass vial holding crystal-clear water. Both halves photographed "
            "identically with cool overhead daylight from above, a leather-bound "
            "notebook with neat handwritten (illegible) annotations at the bottom edge "
            "of each half. The composition reads as a scientific before/after panel. "
            "50mm at f/4, ISO 400. " + DOC
        ),
    },
    {
        "slug": "labs_petri_microbial",
        "size": "1024x1536",
        "prompt": (
            "A documentary close-up macro photograph of two glass petri dishes resting "
            "side by side on a pale stone laboratory bench. Both dishes contain a calm "
            "growth medium agar surface. The LEFT dish shows numerous tiny round dark "
            "colony spots distributed across its surface, indicating microbial growth. "
            "The RIGHT dish is nearly clean, only one or two faint spots visible, "
            "indicating microbial reduction. The dishes are unmarked beyond a small "
            "handwritten (illegible) annotation on the side of each. A stainless "
            "tweezer rests on a folded cotton cloth between them. Cool overhead "
            "daylight, soft shadow, calm precision. 90mm macro at f/5.6, ISO 400. " + DOC
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
    print(f"# generating {len(CONCEPTS)} images", flush=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        results = list(ex.map(lambda c: gen_one(key, c), CONCEPTS))
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
