#!/usr/bin/env python3
"""Generate all remaining page imagery in one batched run."""
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

# Shared documentary discipline tail
DOC_TAIL = (
    "Documentary-style editorial photograph captured on a full-frame "
    "mirrorless camera. Restrained editorial color science, faint sensor "
    "grain, real materials, real light. No HDR. No CG plastic. No "
    "staged-shoot feel. Forbidden: any text, labels, logos, watermarks, "
    "signatures, or readable brand names anywhere in the frame."
)

CONCEPTS = [
    # ───── The System ────────────────────────────────────────────────
    {
        "slug": "sys_chamber_action",
        "size": "1536x1024",
        "prompt": (
            "Extreme close-up of a transparent acrylic electrolysis cell in active operation. "
            "Inside, surgical-grade titanium electrode plates are submerged in water. "
            "Fine streams of small bubbles rise rapidly along both plates, catching cool "
            "daylight from above. The water around the plates is faintly hazy with "
            "micro-bubbles. A precise scientific instrument. 50mm prime at f/4, ISO 400, "
            "soft natural daylight. " + DOC_TAIL
        ),
    },
    {
        "slug": "sys_outputs_pair",
        "size": "1536x1024",
        "prompt": (
            "Two plain straight-sided drinking glasses sit side by side on an "
            "aged limewashed stone counter under soft side-window light. The "
            "left glass is filled with clear water that appears faintly "
            "alkaline-cool. The right glass is filled with clear water that "
            "carries the very subtle suggestion of dissolved gas — micro-bubbles "
            "clinging to its inner wall. The glasses are identical in form, "
            "differentiated only by content. A folded linen towel and a small "
            "ceramic dish with a sprig of mint rest beside them. Calm, "
            "ceremonial, intimate. 50mm at f/2.5, ISO 400. " + DOC_TAIL
        ),
    },
    # ───── Science ───────────────────────────────────────────────────
    {
        "slug": "sci_lab_bench",
        "size": "1536x1024",
        "prompt": (
            "A working modern science laboratory bench, photographed in calm "
            "natural daylight. A small array of glass beakers and a single "
            "Erlenmeyer flask of clear water sit on a pale ceramic-tile bench. "
            "A leather-bound notebook is open beside them with neat handwritten "
            "annotations (illegible script, no readable text). A precision "
            "pipette rests on its stand. An aged brass microscope to one side. "
            "Subdued color science, real glass refraction, deep but soft shadows. "
            "Mood: scholarly, ordered, alive. 35mm at f/2.8, ISO 400. " + DOC_TAIL
        ),
    },
    {
        "slug": "sci_ph_beakers",
        "size": "1536x1024",
        "prompt": (
            "A row of seven glass beakers arranged in a precise line on a pale "
            "stone bench, photographed straight-on at eye level. Each beaker "
            "holds water at a different pH and the indicator dye renders each "
            "in a different soft hue — deep amber, warm gold, lime, sage, mint, "
            "ice, cool blue. The colors form a quiet calm gradient across the "
            "frame, not punchy or theatrical. A small white card with a "
            "handwritten number (illegible) sits in front of each beaker. Soft "
            "back-light through the water gives each beaker a glow at its base. "
            "50mm at f/4, ISO 400. " + DOC_TAIL
        ),
    },
    {
        "slug": "sci_hydrogen_glass",
        "size": "1024x1536",
        "prompt": (
            "A single tall straight-sided drinking glass of water photographed "
            "from close, side-lit so that thousands of tiny silver micro-bubbles "
            "clinging to the inside walls of the glass catch the light against a "
            "darkened painterly background. The bubbles are real, fine, "
            "uniformly distributed — the suggestion of dissolved hydrogen, made "
            "visible without theatricality. A wooden coaster underneath. Deep "
            "shadow on one side of the glass; soft warm highlight on the other. "
            "100mm at f/4, ISO 400. " + DOC_TAIL
        ),
    },
    # ───── Estoqi Labs ───────────────────────────────────────────────
    {
        "slug": "labs_specimen_test",
        "size": "1536x1024",
        "prompt": (
            "A documentary lab still-life: a small white ceramic dish holds two "
            "halves of a fresh tomato resting cut-side up, beside it sits a "
            "small clear glass vial with a few drops of liquid (a test sample). "
            "A simple clipboard with a printed test-protocol sheet (illegible "
            "text, generic grid, no readable words) lies nearby. A pair of "
            "stainless tweezers on a folded cotton cloth. A small UV lamp head "
            "in soft-blur background. The bench is pale stone with subtle "
            "scuffs. Cool overhead daylight from a lab skylight. Mood: precise, "
            "ordered, calm. 50mm at f/3.5, ISO 400. " + DOC_TAIL
        ),
    },
    {
        "slug": "labs_lab_interior",
        "size": "1536x1024",
        "prompt": (
            "A wider documentary photograph of a real working chemistry "
            "laboratory interior. Pale tile walls, a long stainless-steel bench "
            "running through the room, glass-front cabinetry with neatly "
            "arranged glassware, an analytical balance on a marble slab, an "
            "instrument cluster with calm indicator lights, a wall-mounted "
            "extraction hood at the far end. A single technician's lab coat is "
            "visible on a hook in the soft-blur background, no person in frame. "
            "Cool daylight from a high window. Mood: institutional, credible, "
            "real. 24mm at f/4, ISO 400. " + DOC_TAIL
        ),
    },
    # ───── For Homes ─────────────────────────────────────────────────
    {
        "slug": "home_morning_kitchen",
        "size": "1536x1024",
        "prompt": (
            "An ordinary Indian household kitchen photographed in soft morning "
            "daylight from a side window. A wooden counter holds a clear glass "
            "of water, a small white ceramic plate with two cut figs and a few "
            "almonds, a folded blue-and-cream cotton tea towel, a stainless "
            "tumbler. A small earthen pot of fresh basil sits beside the wall. "
            "The wall behind shows pale aged plaster with a faint mural-like "
            "discoloration. A wooden rolling pin rests at the frame edge. Mood: "
            "calm, lived-in, beautiful in the quiet way of an early morning. "
            "Warm color temperature. 35mm at f/2.2, ISO 400. " + DOC_TAIL
        ),
    },
    {
        "slug": "home_box_contents",
        "size": "1536x1024",
        "prompt": (
            "A neatly arranged overhead flat-lay photograph of unboxed product "
            "components on a textured linen cloth: a small sleek matte stainless "
            "appliance unit roughly the size of two thick books, a coil of "
            "clear food-grade PTFE tubing, two stainless connectors, a small "
            "folded printed booklet with a soft cream cover (no readable text), "
            "a leather-tagged set of allen keys, a sealed packet of replacement "
            "seals, a soft cotton drawstring pouch. The items are placed with "
            "considered space between them, evenly lit by overhead daylight. "
            "Mood: premium, precise, ceremonial unboxing. 50mm at f/5.6, ISO 400. "
            + DOC_TAIL
        ),
    },
    # ───── For Businesses ────────────────────────────────────────────
    {
        "slug": "biz_cloud_kitchen",
        "size": "1536x1024",
        "prompt": (
            "A wider documentary photograph of a working Indian cloud-kitchen "
            "prep area mid-shift, in calm overhead daylight. Stainless-steel "
            "prep tables with perforated trays of clean rinsed greens, a "
            "stainless double sink in the foreground with water running, a "
            "wall of white subway tiles, neatly hanging copper-bottomed "
            "saucepans, a chef's cotton apron on a hook. A small wall-mounted "
            "unbranded flow meter is visible beside the sink. No human faces "
            "in frame; one chef's hand at the very edge holding a stainless "
            "tong. Mood: professional, clean, real. Cool color temperature. "
            "24mm at f/3.5, ISO 800. " + DOC_TAIL
        ),
    },
    {
        "slug": "biz_iot_meter",
        "size": "1024x1536",
        "prompt": (
            "Extreme close-up of a small wall-mounted IoT water flow-meter "
            "mounted on a white subway-tile commercial kitchen wall, just "
            "above a stainless-steel water inlet pipe. The meter is a "
            "matte-grey rectangular device about the size of a paperback, "
            "with a small glass face revealing a precise numeric display "
            "(numerals only, no readable text or branding visible). A clean "
            "stainless connector below carries water in. Cool side daylight, "
            "real materials, hairline reflections, no plastic shine. Mood: "
            "industrial-jewelry — quietly precise. 100mm at f/4, ISO 400. "
            + DOC_TAIL
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
        return {"slug": c["slug"], "ok": False, "error": f"empty: {json.dumps(payload)[:300]}", "secs": round(time.time()-t0,1)}
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
    print(f"# generating {len(targets)} image(s)", flush=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        results = list(ex.map(lambda c: gen_one(key, c), targets))
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
