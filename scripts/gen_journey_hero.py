#!/usr/bin/env python3
"""Grand watercolour hero for /our-journey. One panoramic painting that
folds the whole seed-to-plate arc into a single Where's-Waldo-dense frame
in the same hand as the eight panels (vernacular Indian storybook ink +
wash). Used as the hero image at the top of the dedicated journey page."""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _lib_openai_image import generate

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT_PATH = os.path.join(ROOT, "src/frontend/public/concepts/journey/journey_hero.webp")

STYLE = (
    "A delicate hand-drawn watercolour and ink illustration in the warm, "
    "nostalgic tradition of vernacular Indian storybook art. Soft washes "
    "of watercolour over fine, slightly trembling ink linework. Visible "
    "paper grain texture, faint deckle edge at the corners, subtle paint "
    "blooms. Warm earthy palette: terracotta red, deep saffron yellow, "
    "monsoon green, indigo blue, cream, with a faint wash of amber. "
    "Loose painterly composition with the imperfect charm of a painted "
    "storybook page. Strictly no photorealism. No CG. No HDR. Visible "
    "brush strokes. Hand-mixed colour, slight unevenness in saturation. "
    "Strictly no text, no labels, no logos, no watermarks, no signatures, "
    "no captions anywhere in the frame."
)

SCENE = (
    "A grand panoramic single-frame painting that compresses the entire "
    "produce-journey arc into one richly detailed scene, read left to "
    "right like an open storybook spread.\n\n"
    "Far left foreground — a small village seed-shop interior viewed "
    "through an open wooden doorway: jute pouches of mustard, coriander, "
    "tomato, brinjal, and chilli seeds spilling open on a worn wooden "
    "counter, a brass two-pan scale, a barefoot child peering in from "
    "outside. Just above and behind it, the same scene's day a few weeks "
    "later — two darker hands pressing seeds into rich red Indian soil at "
    "sunrise, a wooden hand-tool and clay water pot beside them, the same "
    "child watching from the field edge in a faded yellow kurta.\n\n"
    "Centre-left middle ground — neat rows of knee-high vegetable plants "
    "(tomato, brinjal, okra) running back into the deep middle distance, "
    "white tomato blossoms catching the light, a scarecrow in a folded "
    "turban, a tin-roofed farmhouse, two long-horned cattle resting under "
    "a banyan tree, monsoon clouds gathering at the horizon. Between the "
    "rows, a farmer in a sun-faded checked shirt and folded white dhoti "
    "walks carefully with a brass knapsack hand-sprayer on his back, a "
    "fine mist of pesticide visible — a quiet wooden box of measured "
    "paper packets and a notebook beside him at the field's edge. The "
    "expression is thoughtful, not malicious.\n\n"
    "Centre middle ground — harvest day. Cane baskets and woven bushels "
    "overflowing with vine-ripe tomatoes, glossy purple brinjals, slender "
    "green okra, bright red and green chillies, bundles of coriander with "
    "roots still attached, golden capsicums — being lifted by a farmer's "
    "family onto the open wooden flatbed of a small mid-twentieth-century "
    "Indian pickup truck. A young man in a turban; a small daughter "
    "handing up a sprig of coriander. Dust motes hang gently in the air.\n\n"
    "Centre-right middle ground — a vibrant Indian sabzi mandi at "
    "dawn. A young Indian mother in a soft cotton saree with a deep teal "
    "border holds her toddler on her hip; the smiling child reaches "
    "toward a pile of glossy red tomatoes at a small wooden vendor stall. "
    "The vendor, an older man with a kind weathered face and a white "
    "kurta, weighs tomatoes on a brass two-pan scale. Stacks of cane "
    "baskets, hanging bunches of coriander, curry leaves, and dried red "
    "chillies overhead.\n\n"
    "Right foreground — the painting forks into two adjacent kitchens, "
    "side by side, separated by a faint hand-painted dotted line that "
    "curves between them.\n"
    "  • The 'without' kitchen — the same mother in a yellow cotton "
    "    saree washes a small bunch of vine tomatoes under flowing plain "
    "    tap water. The kitchen is modest and tidy; the water looks "
    "    clear. A faint melancholy lives at the edges.\n"
    "  • The 'with Estoqi' kitchen — the same mother in a deep red saree "
    "    stands at her counter where a clean stream of ionised water from "
    "    a small countertop appliance rinses a colander of vegetables. A "
    "    wide clear-glass basin below the colander catches the runoff, "
    "    which is visibly amber-yellow. Her toddler giggles at her feet, "
    "    tugging gently at the hem of her saree.\n\n"
    "Far right foreground — a multi-generational Indian family seated on "
    "a beautifully painted cotton chatai sharing a small homemade meal: "
    "the grandmother in a green saree, the young mother, the toddler, the "
    "young father, an elderly grandfather. Bowls of dal, a sabzi, fresh "
    "chapatis, a small unglazed clay jug of water. Warm golden evening "
    "light from a side window. Smiles, soft conversation, the quiet "
    "payoff of an ordinary day made well.\n\n"
    "Across the upper third of the painting — a continuous painted sky "
    "moving from cool dawn at the left, through golden hour at the "
    "centre, to warm evening at the right. A line of birds flies through "
    "it. A few wispy clouds. The whole composition reads as one breathing "
    "day."
)


def main():
    result = generate(
        STYLE + "\n\n" + SCENE,
        size="1536x1024",
        quality="high",
        out_path=OUT_PATH,
    )
    print(json.dumps(result))


if __name__ == "__main__":
    main()
