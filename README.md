# Tennis Tech Hub — landing page

Plain HTML / CSS / vanilla JS. No build step. Serve the folder
(`python -m http.server`) rather than opening the file directly — the language
picker needs `localStorage` and the lead form is refused by FormSubmit unless the
request comes from a real origin.

```
index.html    markup, one section per block of the reference layout
styles.css    all styling
i18n.js       es / en / pt copy + language detection
main.js       language picker, mobile nav, hero video, lead form
assets/       logo, artwork, flags, hero video + posters
src/          the untouched source comps
tools/        build_assets.py — regenerates assets/ from src/
```

## Deploying

Repo: `Tennis-Tech-Hub/tennistechhub`, branch `main`, served from the root. There
is no build step, so Pages serves the files as committed. `.nojekyll` stops Pages
running the files through Jekyll; `CNAME` holds the custom domain.

### The repo is public on purpose — put it back when Pages goes away

The org is on the GitHub free plan, which serves Pages **only from public repos**.
That is the sole reason `Tennis-Tech-Hub/tennistechhub` is public; nothing here
wants to be.

**When the site moves to Railway or Shopify, flip it back to private** — Settings
→ General → Danger Zone → Change visibility. Neither of those hosts needs public
source, so the moment Pages is no longer serving this, the reason is gone.

Two things to do at the same time, because going public is not perfectly
reversible:

- **Rotate the FormSubmit endpoint.** Its hash has been readable by anyone for
  as long as the repo was public, and a public hash can be POSTed to by anyone.
- Assume the commit history was cloned. History was squashed to one commit before
  the repo went public specifically so the destination inbox was never in it, but
  treat anything else that was committed while public as disclosed.

Until then: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.

### Cloudflare DNS for tennistechhub.com

In the Cloudflare dashboard for the zone, add:

| Type | Name | Value | Proxy |
|---|---|---|---|
| A | `@` | `185.199.108.153` | **DNS only** |
| A | `@` | `185.199.109.153` | **DNS only** |
| A | `@` | `185.199.110.153` | **DNS only** |
| A | `@` | `185.199.111.153` | **DNS only** |
| CNAME | `www` | `tennis-tech-hub.github.io` | **DNS only** |

**Live as of deploy, running proxied (orange cloud).** Cloudflare terminates TLS
at its edge with its own Google Trust Services certificate, so GitHub's own
certificate is never used and *Enforce HTTPS* in Settings → Pages stays greyed
out — that is expected here, not a fault. If you ever switch the records to
**DNS only**, GitHub will issue its own certificate within about 15 minutes and
that toggle becomes available.

Two Cloudflare settings worth confirming while proxied:

- **SSL/TLS → Overview → Full.** On *Flexible*, the Cloudflare-to-GitHub leg is
  plain HTTP even though visitors see HTTPS.
- **SSL/TLS → Edge Certificates → Always Use HTTPS.** Without it `http://` is
  served as-is instead of being upgraded.

Worth doing while you are in there: **org Settings → Pages → Verified domains**
gives you a `_github-pages-challenge-Tennis-Tech-Hub` TXT record. Adding it stops
anyone else from claiming the domain on their own Pages site later.

## Lead form → email

The form posts to [FormSubmit](https://formsubmit.co) at the hashed endpoint in
`LEAD_ENDPOINT` (`main.js`), which relays to the destination inbox without
naming it anywhere in the page source or in this repo. No account, no API key, no server — which is the
whole reason it works on GitHub Pages.

Changing the destination means generating a new hashed endpoint: post once to
`formsubmit.co/ajax/<new-address>`, click the *"Activate Form"* email that
arrives, and take the hash it gives you.

The hash is public by necessity — it ships in the JS. Anyone who reads it can
POST to it, so the form carries a `_honey` honeypot field. If spam does start
arriving, drop the `_captcha=false` hidden input in `index.html` and FormSubmit
will put its captcha back in front of submissions.

Leads do pass through a third party. Fine for a "for now"; if this becomes the
real pipeline, see the options below.

### Would this work on GitHub Pages?

Yes, as built — but not because Pages can send mail. Pages is a static file host
with no server-side execution at all, so *something* off-box has to do the
sending. FormSubmit is that something. The same page would work unchanged on
Netlify, Cloudflare Pages, S3, or any other static host.

When you outgrow it, roughly in order of effort:

| Option | Hosting needed | Notes |
|---|---|---|
| **FormSubmit** (current) | any static host | zero setup; free; third-party relay |
| **Web3Forms / Formspree** | any static host | needs a signup + access key, but keeps the inbox address out of the HTML and gives you a submissions dashboard |
| **Netlify Forms** | Netlify | built in, no JS endpoint at all; ties you to Netlify |
| **Serverless function + Resend/Postmark** | Cloudflare Pages, Netlify, Vercel | the proper answer — API key stays server-side, you own the data, you can write to a CRM in the same request |

Only the last one requires leaving GitHub Pages, and only `LEAD_ENDPOINT` in
`main.js` changes for any of them.

## Hero video

`assets/video/hero-desktop.mp4` (landscape) and `hero-mobile.mp4` (portrait).
`main.js` picks one from the viewport aspect ratio and assigns `src` at runtime,
so only the matching cut downloads. The poster is the video's own first frame, so
there is no jump when playback starts. `prefers-reduced-motion: reduce` skips the
video entirely and leaves the poster up.

Both are re-encoded from the client's originals to 4.6 MB / 3.4 MB (from 16 MB /
15 MB). That still means several MB per visit — GitHub Pages has a ~100 GB/month
soft bandwidth limit, so if traffic gets real, point the `data-src-*` attributes
on `#herovideo` in `index.html` at a CDN instead. The originals came from:

- desktop `https://cdn.shopify.com/videos/c/o/v/ef99930c0dbb41eea07dfcc9d6d66b34.mp4`
- mobile `https://cdn.shopify.com/videos/c/o/v/c8f12302f48d4c508a15993590bca07b.mp4`

## Language

Spanish is what everyone sees today: `FORCE_LANG = 'es'` at the top of `i18n.js`
pins the first-visit language. Set it to `null` to switch on the geo detection
that is already written and tested — IANA timezone first (the reliable signal for
*where* someone is), then `navigator.language`, then `es`.

Either way the picker in the nav and `?lang=es|en|pt` always win, and a deliberate
choice is remembered in `localStorage` under `tth.lang`.

Copy lives in the `STRINGS` table in `i18n.js`, keyed to the markup by:

| attribute        | replaces                                    |
|------------------|---------------------------------------------|
| `data-i18n`      | `textContent`                               |
| `data-i18n-html` | `innerHTML` (copy carrying `<br>` / `<em>`) |
| `data-i18n-ph`   | the `placeholder` attribute                 |

Note that `i18n.js` and `main.js` are classic scripts sharing one global scope, so
`main.js` must not redeclare any top-level name from `i18n.js` — it reaches
through `window.TTH_I18N` instead.

## Artwork

The client comps arrived with their captions burned into the pixels in English.
`tools/build_assets.py` paints them out so the page can lay real, translatable
text over the artwork; the captions you see are DOM text sized in `cqw` so they
hold the proportions of the original at any card width.

```
python tools/build_assets.py     # src/ -> assets/, re-runnable
```

Each caption box in that script has a retouch strategy chosen for its background —
`edgefill` for smooth studio gradients, `clone` for textured clay, `gradientfill`
for the flat green. If a comp is ever replaced, the box coordinates move with it.

Still cut from the older low-res comp and worth replacing with originals:
`latam-map.jpg`, `contact-robot.jpg`, and `hero-court.jpg` (only used as the
behind-the-video fallback now). `logo.png` / `logo-dark.png` are the pasted logo
keyed to transparent at 363×126 — fine at the 150px it renders at, but a vector
original would be better.

## Analytics

Google Tag Manager `GTM-KNBVBHBR` — the standard snippet in `<head>` and the
`<noscript>` iframe after `<body>`.

The form pushes these to `dataLayer`. Build each as a **Custom Event** trigger in
GTM matching the event name:

| Event | When | Payload |
|---|---|---|
| `generate_lead` | submission accepted by FormSubmit | `language`, `country`, `city`, `role`, `interest` |
| `form_error` | FormSubmit rejected it, or the network failed | `error` |
| `form_invalid` | client-side validation stopped it before sending | — |

`generate_lead` is the GA4 recommended name for this, so it maps straight onto a
GA4 Event tag and can be marked as a conversion without renaming.

**No name, e-mail or phone number is pushed** — only the segmentation fields
above. Keep it that way: PII in the dataLayer ends up in GA4, which forbids it.

Two things that are deliberately not built, in case they are wanted: there is no
consent banner (LGPD/GDPR territory once this runs ads into Brazil or the EU),
and the hero CTA clicks are not tracked separately from form submissions.

## Not wired up

- Social links in the footer point at `#`.
