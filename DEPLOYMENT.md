# लेखनी — Deployment Guide

## 1. Local test
```bash
cd lekhni-website-deploy-ready
python3 -m http.server 8000
```
Open http://localhost:8000

## 2. Put author photos
Place:
- `images/authors/kanchan.jpg`
- `images/authors/garima.jpg`

You can replace the included SVG placeholders. Keep the filenames above, or update the `<img>` paths in the HTML.

## 3. Put the project on GitHub
```bash
git init
git add .
git commit -m "Initial Lekhani website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/lekhni.git
git push -u origin main
```

## 4. Deploy with Cloudflare Pages
- Create a Cloudflare account.
- Go to Workers & Pages and create a Pages project.
- Connect the GitHub repository.
- Framework preset: None / static HTML.
- Build command: leave empty.
- Output directory: `/` (the repository root).
- Deploy.

## 5. Connect your domain
In Cloudflare Pages:
Project → Custom domains → Set up a domain.

For an apex domain such as `lekhni.in`, Cloudflare may ask you to add the domain to Cloudflare and use Cloudflare nameservers.
For a subdomain, use the DNS/CNAME instructions Cloudflare shows for the project.

## 6. Make the contact form actually deliver messages
The form is prepared for Formspree.

1. Create a Formspree form.
2. Copy its endpoint, which looks like:
   `https://formspree.io/f/xxxxxxxx`
3. Open `contact.html`.
4. Replace:
   `https://formspree.io/f/YOUR_FORM_ID`
   with your real endpoint.
5. In Formspree, configure the notification email you want to receive submissions at.
6. Deploy again.

Important: do not put private API keys or email-service secrets into this static website's JavaScript.

## 7. Replace placeholder domain values
After choosing your real domain, update:
- `robots.txt`
- `sitemap.xml`

Replace `https://YOUR-DOMAIN.example` with your actual domain.

## 8. Custom email
If you want an address such as `contact@lekhni.in`, create it through your domain/email provider. It is separate from the static website hosting.

## Copyright/content note
The sample biographies and writing snippets in this project are original placeholder content. Replace them with text and photos you own or have permission to publish.
