# Fainica Consultancy

Website for Fainica Consultancy — interior styling, wardrobe styling and creative direction. Middelburg, Mpumalanga, working countrywide.

## Contents

- `index.html` — the full site (single page with in-page routing for portfolio, journal and enquiry views)
- `support.js` — runtime required by `index.html`
- `assets/` — photography, logos, favicon
- `robots.txt`, `sitemap.xml` — search engine files
- `.nojekyll` — tells GitHub Pages to serve files as-is

## Local preview

Serve the folder over HTTP (opening the file directly will block the script):

```
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deploy

**GitHub Pages** — push this folder to a repo, then Settings → Pages → deploy from branch, root. Add `fainicaconsultancy.co.za` as the custom domain.

**Cloudflare Pages** — connect the repo, leave the build command empty, set the output directory to `/`.

## Contact

WhatsApp 081 762 0160 · Calls 082 837 7562 · Fainicaconsultancy2@gmail.com
