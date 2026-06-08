#!/usr/bin/env python3
"""
ESTOQI homepage journey — 8 watercolor + ink panels narrating
the produce journey from seed to plate, Indian context, with a
fork at the wash that leads to either silent compromise or to
Estoqi-washed clarity.
"""
import base64, json, os, sys, time
from concurrent.futures import ThreadPoolExecutor
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

ENV_PATH = os.path.join(os.path.dirname(__file__), "..", ".env")
OUT_DIR  = os.path.join(os.path.dirname(__file__), "..", "src", "frontend", "public", "concepts", "journey")

def load_key():
    with open(ENV_PATH) as f:
        for line in f:
            if line.strip().startswith("OPENAI_API_KEY"):
                return line.partition("=")[2].strip().strip('"').strip("'")
    raise RuntimeError("OPENAI_API_KEY missing")

# Shared style — repeated EXACTLY across all 8 panels so the
# painter feels like the same hand.
STYLE = (
    "A delicate hand-drawn watercolor and ink illustration in the warm, "
    "nostalgic tradition of vernacular Indian storybook art. Soft washes "
    "of watercolor over fine, slightly trembling ink linework. Visible "
    "paper grain texture, faint deckle edge at the corners, subtle paint "
    "blooms. Warm earthy palette: terracotta red, deep saffron yellow, "
    "monsoon green, indigo blue, cream, with a faint wash of amber. "
    "Loose painterly composition with the imperfect charm of a painted "
    "storybook page. Strictly no photorealism. No CG. No HDR. Visible "
    "brush strokes. Hand-mixed colour, slight unevenness in saturation. "
    "Strictly no text, no labels, no logos, no watermarks, no signatures, "
    "no captions anywhere in the frame."
)

PANELS = [
    {
        "slug": "journey_01_seeds",
        "title": "Seeds",
        "scene": (
            "A weathered farmer's open hand cradles a small jute cloth "
            "pouch on a worn wooden seed-shop counter. From the pouch "
            "spill tiny seeds in varied tones: golden marigold orange, "
            "deep mustard yellow, pale coriander green. A brass two-pan "
            "weighing scale sits to one side. Soft morning daylight "
            "filters through wooden window slats overhead. Faded gunny "
            "sacks of grain blur softly into the background atmosphere. "
            "The scene whispers of beginnings, the quiet patience of an "
            "old shop. The composition is intimate, hands and pouch in "
            "the front plane, depth blurred into warm earth tones."
        ),
    },
    {
        "slug": "journey_02_planting",
        "title": "Planting",
        "scene": (
            "Two dark calloused gentle hands press a row of seeds into "
            "rich red Indian soil at sunrise. A wooden hand-tool rests "
            "beside them. A small unglazed clay pot of water sits nearby "
            "with a copper ladle dipped in it. Tender shoots of grass "
            "appear at the field's edge. The horizon glows in soft "
            "saffron-amber light. A barefoot child in a faded yellow "
            "kurta stands a few steps behind, watching. The scene feels "
            "reverent, almost ritual, a quiet promise being made to the "
            "soil."
        ),
    },
    {
        "slug": "journey_03_growing",
        "title": "Growing",
        "scene": (
            "Young rows of vegetable plants, tomato, brinjal, okra, "
            "stand knee-high in neat parallel rows on a small Indian "
            "family farm. Distant monsoon clouds gather softly at the "
            "horizon. A scarecrow with a folded turban and a tattered "
            "shirt stands in the middle distance. A tin-roofed farmhouse "
            "is barely visible behind. Tender green plants reach "
            "upward, small white blossoms appear on the tomato plants. "
            "A bullock cart and two long-horned cattle rest in the soft "
            "blur at the far edge. The mood is hopeful, alive, the "
            "world breathing."
        ),
    },
    {
        "slug": "journey_04_intervention",
        "title": "The intervention",
        "scene": (
            "A farmer in a sun-faded checked shirt and folded white "
            "dhoti walks carefully between the rows of mature vegetable "
            "plants. On his back is an old brass knapsack hand-sprayer; "
            "a faint mist of pesticide just visible drifting from its "
            "nozzle in the morning haze. His expression is thoughtful, "
            "neither malicious nor proud, simply careful. A small wooden "
            "box at the field's edge holds measured paper packets and a "
            "well-thumbed notebook with a pencil. The morning light is "
            "honest, mid-soft, neither dramatic nor sinister. The "
            "composition shows necessary care, the quiet weight of "
            "compromise, the trade made to feed many mouths."
        ),
    },
    {
        "slug": "journey_05_harvest",
        "title": "Harvest",
        "scene": (
            "Bushels and woven cane baskets overflowing with freshly-"
            "harvested produce: vine-ripe tomatoes, glossy purple "
            "brinjals, slender green okra pods, bright red and green "
            "chillies, bundles of coriander with roots still attached, "
            "golden capsicums. The baskets are being lifted onto the "
            "open wooden flatbed of a small mid-twentieth-century Indian "
            "pickup truck. A farmer's family helps lift, a young man "
            "with a turban, a small daughter handing up a sprig of "
            "coriander. Late afternoon, warm honey-golden hour light. "
            "Dust motes hang gently in the air. The mood celebrates "
            "abundance and the quiet labour behind it."
        ),
    },
    {
        "slug": "journey_06_market",
        "title": "Market day",
        "scene": (
            "A vibrant Indian sabzi mandi in soft early-morning light. "
            "At the front of the frame, a young Indian mother in a soft "
            "cotton saree with a deep teal border holds her toddler "
            "child on her hip; the smiling child reaches out and points "
            "at a pile of glossy red tomatoes at a small wooden vendor "
            "stall. The vendor, an older man with a kind weathered face "
            "and a white kurta, smiles back warmly and weighs tomatoes "
            "on a brass two-pan scale. Stacks of cane baskets full of "
            "vegetables surround them. Bunches of coriander, curry "
            "leaves, and dried red chillies hang from the wooden frame "
            "overhead. The mood is warm, alive, joyful, the simple "
            "happiness of an ordinary Tuesday morning."
        ),
    },
    {
        "slug": "journey_07a_without",
        "title": "Without",
        "scene": (
            "An indoor close scene in the same young Indian mother's "
            "modest kitchen. She stands at a stone counter washing a "
            "small bunch of vine tomatoes under flowing plain tap "
            "water. The water looks clear, the kitchen is tidy and "
            "ordinary, soft afternoon daylight from a window with a "
            "small marigold garland visible. A brass tumbler and a "
            "wooden chopping board rest beside her. Her expression is "
            "calm, focused, slightly absent — she trusts the water as "
            "she always has. The painting is restrained, painted with "
            "quiet care. A faint melancholy lives at its edges; the "
            "viewer notices what she cannot."
        ),
    },
    {
        "slug": "journey_07b_with_estoqi",
        "title": "With Estoqi",
        "scene": (
            "An indoor close scene in the same young Indian mother's "
            "kitchen. She stands at a stone counter where a clean "
            "stream of water from a small countertop appliance rinses "
            "a colander of vegetables: tomatoes, coriander, a few green "
            "chillies. Below the colander, a clear glass basin catches "
            "the runoff, which is visibly amber-yellow, the dissolved "
            "residue made plain. Her toddler giggles nearby on the "
            "floor, tugging gently at the hem of her saree. Her "
            "expression is warm, lit with surprise and quiet relief. "
            "Bright afternoon sunlight catches the fine mist of water "
            "droplets in the air. The mood is luminous, hopeful, the "
            "small revelation of an ordinary Tuesday."
        ),
    },
]

def gen_one(api_key, p):
    body = {
        "model": "gpt-image-2",
        "prompt": STYLE + "\n\nSCENE: " + p["scene"],
        "size": "1536x1024",
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
        return {"slug": p["slug"], "ok": False, "error": f"HTTP {e.code}: {e.read().decode('utf-8','replace')[:300]}", "secs": round(time.time()-t0,1)}
    except URLError as e:
        return {"slug": p["slug"], "ok": False, "error": f"URL: {e.reason}", "secs": round(time.time()-t0,1)}
    if not payload.get("data") or not payload["data"][0].get("b64_json"):
        return {"slug": p["slug"], "ok": False, "error": "empty"}
    b64 = payload["data"][0]["b64_json"]
    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, f"{p['slug']}.webp")
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))
    return {"slug": p["slug"], "ok": True, "bytes": os.path.getsize(out_path), "secs": round(time.time()-t0,1)}

def main():
    key = load_key()
    only = set(sys.argv[1:])
    targets = [p for p in PANELS if not only or p["slug"] in only]
    print(f"# generating {len(targets)} watercolor panel(s)", flush=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        results = list(ex.map(lambda p: gen_one(key, p), targets))
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
