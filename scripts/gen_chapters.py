#!/usr/bin/env python3
"""Generate the four remaining chapter heroes (II, III, IV, VI)."""
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

CHAPTERS = [
    {
        "slug": "ch02_the_turn",
        "title": "II · The Turn (1945–1970)",
        "prompt": (
            "A documentary-style food photograph captured on a full-frame mirrorless "
            "camera with a 50mm prime lens at f/2.2, ISO 400, single natural daylight "
            "source from the right. The shot is found, not arranged — a 1960s-era "
            "working kitchen at the moment of rinsing produce.\n\n"
            "Subject: vine tomatoes and a small head of cauliflower being rinsed in an "
            "old copper colander resting on a worn enamel sink. The water in the basin "
            "below carries a barely-there clinical blue-green tint, suggesting chemical "
            "residue without dramatizing it. A period-true ribbed clear-glass milk "
            "bottle and a folded blue-striped cotton tea towel rest beside the sink.\n\n"
            "Setting: aged white-painted tongue-and-groove wall panels behind, with "
            "subtle wear and small chips in the paint. The enamel sink has a faint rust "
            "halo at one corner. The countertop is grey-veined stone, slightly worn.\n\n"
            "Light & color: soft afternoon window light from the right, deep but soft "
            "shadows. Restrained editorial color science — slightly washed-out warmth, "
            "period-faithful, no HDR. Visible faint sensor grain at ISO 400.\n\n"
            "Forbidden: any text, any labels, any logos, any watermarks, any "
            "signatures, any readable brand names. No painted or illustrated quality. "
            "No staged-shoot feeling. No drama."
        ),
    },
    {
        "slug": "ch03_the_stack",
        "title": "III · The Stack (1980–today)",
        "prompt": (
            "A documentary-style macro food photograph captured on a full-frame "
            "mirrorless camera with a 105mm macro prime lens at f/4, ISO 400, single "
            "soft natural daylight from the side. Extreme close-up.\n\n"
            "Subject: the curved skin of a single ripe supermarket tomato dominates the "
            "entire frame. Visible at this magnification: real skin pores, the faint "
            "natural waxy bloom, hairline striations from the fruit's growth, a "
            "near-imperceptible thin surface film catching the light at one highlight "
            "edge. A single small drop of clear water rests on the lower-right portion "
            "of the skin, with a tiny lensed reflection on its surface.\n\n"
            "Background: gently blurred — a hint of a cool gray laboratory countertop "
            "is just visible at the corners.\n\n"
            "Light & color: soft directional daylight from the left, deep but soft "
            "shadow on the right side of the curve. Restrained editorial color science, "
            "faint sensor grain consistent with an ISO 400 capture, almost-imperceptible "
            "chromatic aberration on the brightest highlight. The photograph is "
            "clinical in its precision but not horrified — the truth, plainly seen.\n\n"
            "Forbidden: any text, any labels, any logos, any watermarks, any "
            "signatures, any brand names. No painted or illustrated quality. No staged-"
            "shoot feeling. No dramatic lighting."
        ),
    },
    {
        "slug": "ch04_the_water",
        "title": "IV · The Water (Invention)",
        "prompt": (
            "A documentary-style industrial product photograph captured on a full-frame "
            "mirrorless camera with a 50mm prime lens at f/4, ISO 400, soft natural "
            "daylight from a side window. Architectural and considered, like a museum "
            "object photographed for an academic catalog.\n\n"
            "Subject: a single piece of laboratory-grade machinery — a transparent "
            "acrylic-fronted electrolysis cell roughly the size of two thick books "
            "stacked, mounted on a polished stainless-steel base. Inside the chamber, "
            "vertical surgical-grade titanium plate electrodes are visible. Water is "
            "mid-flow through the cell, with a delicate vertical ladder of fine bubbles "
            "rising along the plate edges. Two clear PTFE tubes enter the cell from the "
            "top and exit at the bottom corners.\n\n"
            "Setting: the cell rests on a calm pale-stone laboratory bench. A small "
            "leather-bound notebook and a wooden pencil rest at the frame edge. Behind, "
            "soft-blurred pale wall.\n\n"
            "Light & color: soft daylight from the left side, deep but soft shadows, "
            "the water and bubbles catch the light with real refraction. Restrained "
            "editorial color science, cool-leaning neutral, faint sensor grain.\n\n"
            "Forbidden: any text, any labels, any logos, any watermarks, any "
            "signatures, any brand names, any digital readouts, any control panels "
            "with letters or numbers. No painted or illustrated quality. No staged-"
            "shoot feeling. No advertisement aesthetic."
        ),
    },
    {
        "slug": "ch06_the_return",
        "title": "VI · The Return (Every Meal)",
        "prompt": (
            "A documentary-style food photograph captured on a full-frame mirrorless "
            "camera with a 50mm prime lens at f/2.2, ISO 400, warm evening interior "
            "light. The shot is found, not arranged — an ordinary Indian household "
            "kitchen at the unhurried moment just before dinner.\n\n"
            "Subject: a ripe vine tomato sliced open mid-cut on a well-worn dark wooden "
            "cutting board, the cross-section showing real seed cavities and natural "
            "juice on the blade of a simple kitchen knife. A small handful of fresh "
            "coriander leaves and a single sprig of curry leaves rest beside the board. "
            "Two simple steel tumblers and one small brass tumbler hold clear water on "
            "the wooden table.\n\n"
            "Setting: visible knife marks on the cutting board, a faint crumb or two, "
            "a small pinch of black pepper spilled near the board. A faded cotton tea "
            "towel with a small embroidered border is folded at the frame edge. The "
            "kitchen wall in the soft-blur background shows pale aged plaster with a "
            "faint mural-like discoloration.\n\n"
            "Light & color: warm tungsten-tinted evening daylight from the left side, "
            "deep but soft shadows, the steel tumblers catch a quiet reflection. "
            "Restrained editorial color science with warm honey tones, faint sensor "
            "grain, restrained warmth — never HDR, never saturated.\n\n"
            "Forbidden: any text, any labels, any logos, any watermarks, any "
            "signatures, any brand names. No painted or illustrated quality. No "
            "staged-shoot feeling. No bright saturated colors. No drama."
        ),
    },
]

def gen_one(api_key, ch):
    body = {
        "model": "gpt-image-2",
        "prompt": ch["prompt"],
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
        with urlopen(req, timeout=300) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        return {"slug": ch["slug"], "ok": False, "error": f"HTTP {e.code}: {e.read().decode('utf-8','replace')[:400]}", "secs": round(time.time()-t0,1)}
    except URLError as e:
        return {"slug": ch["slug"], "ok": False, "error": f"URL error: {e.reason}", "secs": round(time.time()-t0,1)}
    if not payload.get("data"):
        return {"slug": ch["slug"], "ok": False, "error": f"no data: {json.dumps(payload)[:300]}", "secs": round(time.time()-t0,1)}
    b64 = payload["data"][0].get("b64_json")
    if not b64:
        return {"slug": ch["slug"], "ok": False, "error": "no b64_json", "secs": round(time.time()-t0,1)}
    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, f"{ch['slug']}.webp")
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))
    return {"slug": ch["slug"], "ok": True, "bytes": os.path.getsize(out_path), "secs": round(time.time()-t0,1), "usage": payload.get("usage")}

def main():
    key = load_key()
    only = set(sys.argv[1:])
    targets = [c for c in CHAPTERS if not only or c["slug"] in only or c["slug"].split("_")[0] in only]
    print(f"# generating {len(targets)} chapter(s)", flush=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        results = list(ex.map(lambda c: gen_one(key, c), targets))
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
