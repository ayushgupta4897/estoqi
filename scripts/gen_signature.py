#!/usr/bin/env python3
"""The signature hero: produce being washed, runoff visibly contaminated."""
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
    "A documentary-style editorial food photograph captured on a full-frame mirrorless "
    "camera with a 50mm prime lens at f/2.8, ISO 400, soft natural daylight from a "
    "large side window. The composition is magazine-cover quality but feels found, "
    "not arranged — an honest moment of a kitchen task in progress.\n\n"
    "SUBJECT: a generous abundant bowl of fresh-from-the-garden produce in the moment "
    "of being rinsed with crystal-clear water. The bowl is a large hand-thrown white "
    "ceramic colander sitting elevated above a clear glass-walled basin, both placed "
    "on a worn marble countertop. The produce in the colander is a botanical-garden "
    "harvest in full abundance: three heirloom tomatoes in varied colors (deep red, "
    "golden yellow with green streaks, a darker oxblood-purple), a small bunch of "
    "deep-green curly kale, a handful of rainbow chard with crimson stems, a bunch of "
    "fresh coriander roots-and-all, two green chilies, a few okra pods, a sprig of "
    "curry leaves, several leaves of fresh basil. Visible irregularity, natural "
    "imperfections, no two pieces identical. A few darker leaves and a couple of "
    "small spots of dust suggest the produce was just picked.\n\n"
    "THE WASH: a single clean stream of crystal-clear ionized water arcs from above "
    "into the colander, breaking on contact with the produce into a fine spray of "
    "small individual droplets that catch the light. Some droplets are mid-fall.\n\n"
    "THE PROOF — most important: the runoff water that has collected in the clear "
    "glass basin below the colander is visibly yellow-amber, slightly turbid, with a "
    "few darker particulates suspended. The contrast between the clear stream above "
    "and the contaminated runoff below is unmistakable. The yellow-amber is a "
    "plausible 'dirty wash-water' tone — never toxic-green, never theatrical black, "
    "never exaggerated. It looks like the kind of water you'd be horrified to realize "
    "had been on your food.\n\n"
    "SETTING: aged white subway-tile splash-back behind the sink, a wooden cutting "
    "board leaning at the edge of frame, a folded indigo-and-cream tea towel, a few "
    "loose herbs lying beside the colander as if pulled from a tote bag. Out of "
    "focus in the background: a copper-bottomed pan hanging on a hook, a hint of a "
    "potted plant. The mood is post-market or post-garden — abundance.\n\n"
    "LIGHT & COLOR: soft warm directional daylight from the upper-left, with deep "
    "but soft painterly shadows. The water droplets in the air catch the light "
    "brightly; the produce skins show real specular highlights, not waxy plastic. "
    "Restrained editorial color science — slightly desaturated warmth, no HDR, no "
    "punchy stock-photo color. Visible faint sensor grain consistent with an ISO 400 "
    "capture. Almost-imperceptible chromatic aberration on the brightest highlights.\n\n"
    "FORBIDDEN: any text, any labels, any logos, any watermarks, any signatures, "
    "any readable brand names on packaging or appliances. No painted or illustrated "
    "quality. No staged-shoot feeling. No CG plastic skin. No HDR. No horror-movie "
    "exaggeration of the runoff color — it should look like normal dirty wash-water, "
    "the kind that surprises you."
)

def main():
    key = load_key()
    body = {
        "model": "gpt-image-2",
        "prompt": PROMPT,
        "size": "2048x1152",
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
        with urlopen(req, timeout=420) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        print(f"HTTP {e.code}: {e.read().decode('utf-8','replace')[:600]}")
        sys.exit(1)
    except URLError as e:
        print(f"URL error: {e.reason}")
        sys.exit(1)
    b64 = payload["data"][0]["b64_json"]
    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, "signature_hero.webp")
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
