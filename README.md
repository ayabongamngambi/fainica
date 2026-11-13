# Fainica Consultancy

Website for Fainica Consultancy: interior styling, content creation and event co-ordination. Middelburg, Mpumalanga, working countrywide.

## Pages (all at the top level)

- `index.html` Home
- `about.html` About, process, team, why choose us
- `services.html` Overview of the three services
- `interior-styling.html`, `content-creation.html`, `event-coordination.html` One page per service
- `portfolio.html` Gallery with lightbox, grouped by service
- `articles.html` and `article-*.html` Articles
- `contact.html` Quote form (opens WhatsApp)
- `404.html`, `sitemap.xml`, `robots.txt`, `llms.txt`
- `site.js` Slideshow, lightbox and quote form. No other scripts.
- `_headers` Security headers for Cloudflare Pages (CSP, no framing, no sniffing)
- `assets/` Photography, logos, favicon

## Placeholder photos

Content creation and event images are free Pexels photos (loaded from images.pexels.com) until real photos are supplied. To replace one, drop the new file in `assets/` and change its path in the page. If all Pexels links are removed, also remove `https://images.pexels.com` from `_headers`.

## Local preview

The pages use clean URLs (`/about`), so preview with a server that supports them:

```
npx serve .
```

## Deploy

Cloudflare Pages: connect the repo, leave the build command empty, set the output directory to `/`.
