# लेखनी — Hindi Literary Website (Deployment Ready)

A static Hindi literary website built with HTML, CSS and JavaScript.

## Included
- Responsive multi-page layout
- Author profile pages
- Local author-photo folders with SVG placeholders
- Formspree-ready contact form
- `robots.txt` and `sitemap.xml` templates
- Cloudflare Pages / GitHub deployment guide

## Run locally
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000

See `DEPLOYMENT.md` for domain, hosting, author photos and contact-form setup.

### Author photos
Add:
```text
images/authors/kanchan.jpg
images/authors/garima.jpg
```

### Contact form
Replace `YOUR_FORM_ID` in `contact.html` with your real Formspree form endpoint.

No server is required for the static site.
# rang-akshar
