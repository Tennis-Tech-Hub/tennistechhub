"""Rebuild assets/ from the source comps in src/.

The comps ship with their captions burned into the pixels, in English only. This
script paints those captions out so the page can lay real, translatable text over
the artwork instead. Re-runnable: it only ever reads src/ and writes assets/.

    python tools/build_assets.py
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'src'
OUT = ROOT / 'assets'


# ---------------------------------------------------------------- retouching

def _feathered(size, box, margin, feather):
    """Mask solid over `box` + `margin`, fading out over `feather` px."""
    x0, y0, x1, y1 = box
    m = Image.new('L', size, 0)
    ImageDraw.Draw(m).rectangle([x0 - margin, y0 - margin, x1 + margin, y1 + margin], fill=255)
    return m.filter(ImageFilter.GaussianBlur(feather))


def clone(im, box, dx, dy, margin=10, feather=7):
    """Cover `box` with pixels lifted from (dx, dy) away. For textured backgrounds.

    Patches are applied in list order, so a donor may read from a region an
    earlier patch already cleaned — order the list so that holds.
    """
    donor = im.copy().transform(
        im.size, Image.AFFINE, (1, 0, dx, 0, 1, dy), resample=Image.BICUBIC)
    im.paste(donor, (0, 0), _feathered(im.size, box, margin, feather))


def edgefill(im, box, side='left', strip=16, margin=10, feather=7):
    """Cover `box` by extending the colour of the pixels just beside it, row by row.

    The right tool for the studio-lit product cards: their backgrounds are smooth
    vertical gradients, so carrying the tone across is invisible where cloning
    would drag recognisable structure into frame.
    """
    x0, y0, x1, y1 = box
    a = np.asarray(im).astype(np.float32)
    if side == 'left':
        sx = max(0, x0 - margin - strip)
        sample = np.median(a[:, sx:sx + strip], axis=1)
    else:
        sx = min(im.width - strip, x1 + margin)
        sample = np.median(a[:, sx:sx + strip], axis=1)
    donor = np.repeat(sample[:, None, :], im.width, axis=1)
    im.paste(Image.fromarray(donor.astype('uint8')), (0, 0),
             _feathered(im.size, box, margin, feather))


def _boxblur(a, radius, passes=3):
    """Separable box blur, repeated to approximate a Gaussian.

    Hand-rolled because Pillow's GaussianBlur refuses float ('F') images, and
    normalised convolution needs to blur a float mask, not 8-bit pixels.
    """
    k = max(1, int(radius) // passes)
    for _ in range(passes):
        for axis in (0, 1):
            pad = [(0, 0), (0, 0)]
            pad[axis] = (k, k)
            c = np.cumsum(np.pad(a, pad, mode='edge'), axis=axis)
            lo = np.take(c, range(0, a.shape[axis]), axis=axis)
            hi = np.take(c, range(2 * k, 2 * k + a.shape[axis]), axis=axis)
            a = (hi - lo) / (2 * k)
    return a


def smoothfill(im, box, region, radius=70, margin=8, feather=6):
    """Cover `box` by interpolating the field around it (normalised convolution).

    Blur the known pixels and the known-mask by the same large kernel, then
    divide: the hole fills with a smooth continuation of whatever surrounds it.
    Handles gradients that neither a flat colour nor a row-constant fill can
    match — the flat-looking green card, the soft clay dust.
    """
    rx0, ry0, rx1, ry1 = region
    bx0, by0, bx1, by1 = box
    sub = im.crop(region)
    a = np.asarray(sub).astype(np.float32)

    known = np.ones(a.shape[:2], np.float32)
    known[max(0, by0 - margin - ry0):by1 + margin - ry0,
          max(0, bx0 - margin - rx0):bx1 + margin - rx0] = 0

    den = _boxblur(known, radius) + 1e-6
    filled = np.dstack([_boxblur(a[..., c] * known, radius) / den for c in range(3)])

    patch = im.copy()
    patch.paste(Image.fromarray(np.clip(filled, 0, 255).astype('uint8')), (rx0, ry0))
    im.paste(patch, (0, 0), _feathered(im.size, box, margin, feather))


def gradientfill(im, box, key, tol=70, margin=8, feather=6):
    """Cover `box` by fitting a quadratic to every pixel of one flat-ish colour.

    smoothfill can only interpolate from the immediate surround, which is a thin
    frame on the flat-colour card — not enough to recover its soft diagonal
    gradient. Keying on the colour instead lets the fit read the whole field,
    including the large area on the far side of the product shots.
    """
    a = np.asarray(im).astype(np.float64)
    h, w, _ = a.shape
    ys, xs = np.mgrid[0:h, 0:w]
    bx0, by0, bx1, by1 = box

    known = (np.abs(a - np.array(key, float)).sum(axis=2) < tol)
    known &= ~((xs >= bx0 - margin) & (xs < bx1 + margin) &
               (ys >= by0 - margin) & (ys < by1 + margin))

    basis = lambda x, y: np.stack([np.ones_like(x), x, y, x * x, x * y, y * y], axis=-1)
    A = basis(xs[known].astype(float), ys[known].astype(float))
    Afull = basis(xs.ravel().astype(float), ys.ravel().astype(float))

    patch = np.empty_like(a)
    for c in range(3):
        coef, *_ = np.linalg.lstsq(A, a[..., c][known], rcond=None)
        patch[..., c] = (Afull @ coef).reshape(h, w)

    im.paste(Image.fromarray(np.clip(patch, 0, 255).astype('uint8')), (0, 0),
             _feathered(im.size, box, margin, feather))


OPS = {'clone': clone, 'edgefill': edgefill, 'smoothfill': smoothfill,
       'gradientfill': gradientfill}


# ------------------------------------------------------------ feature cards

# Card slices out of the 6-up comp, then the caption boxes to paint out.
CARDS = {
    'mecanum': ((26, 33, 681, 377), [
        ('edgefill', (16, 52, 226, 292), {}),
    ]),
    'ntrp': ((697, 33, 1152, 377), [
        ('edgefill', (18, 84, 196, 258), {}),
    ]),
    'speed': ((1169, 33, 1625, 377), [
        ('edgefill', (20, 114, 178, 212), {}),
    ]),
    # Bottom-up: each donor reads from ground the patch below it already cleared,
    # and each is nudged sideways so the repeated clay does not stripe.
    'movement': ((26, 396, 478, 736), [
        ('clone', (20, 226, 190, 254), dict(dx=40, dy=72)),    # "Movement Speed"
        ('clone', (20, 197, 152, 226), dict(dx=-20, dy=94)),   # "Side-to-Side"
        ('clone', (20, 114, 218, 192), dict(dx=30, dy=116)),   # "5m/s"
        ('clone', (20,  86,  88, 116), dict(dx=0, dy=-44)),    # "Up to" — off the wall, not the clay
    ]),
    # Pills sit on plain court; carry the tone in from the clear right-hand edge.
    'spin': ((495, 396, 951, 736), [
        ('edgefill', (330,  91, 418, 132), dict(side='right', strip=22)),
        ('edgefill', (330, 155, 428, 196), dict(side='right', strip=22)),
        ('edgefill', (330, 217, 394, 258), dict(side='right', strip=22)),
    ]),
    'rally': ((968, 396, 1625, 736), [
        ('gradientfill', (18, 58, 328, 278), dict(key=(152, 205, 42), tol=80)),
    ]),
}


def build_cards():
    comp = Image.open(SRC / 'cards.png').convert('RGB')
    for name, (box, edits) in CARDS.items():
        card = comp.crop(box)
        for op, target, kw in edits:
            OPS[op](card, target, **kw)
        card.save(OUT / f'card-{name}.jpg', quality=94)
        print(f'card-{name}.jpg {card.size}')


# ------------------------------------------------------------------- hero

# The hero comp carries the 3D-tracking panel and the stat readout; the page
# renders both as live DOM so they can translate, so they come out here.
HERO_PATCHES = [
    ((1600,  20, 1930, 450), dict(dx=-560, dy=0)),   # tracking court panel
    ((1600, 450, 1930, 600), dict(dx=-560, dy=0)),   # Forehand / Net Height readout
]


def build_hero():
    im = Image.open(SRC / 'hero.png').convert('RGB')
    for box, kw in HERO_PATCHES:
        clone(im, box, margin=16, feather=11, **kw)
    im.save(OUT / 'hero-court.jpg', quality=92)
    print(f'hero-court.jpg {im.size}')


if __name__ == '__main__':
    OUT.mkdir(exist_ok=True)
    build_cards()
    build_hero()
