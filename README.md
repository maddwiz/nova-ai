# Nova_Ai Website

Static multi-page website for Nova_Ai, built with plain HTML + CSS and deployed on GitHub Pages.

## Files

- `index.html` - Homepage (company positioning + product grid)
- `novabridge.html` - Live product page for NovaBridge
- `novaspine-openclaw.html` - Live product page for NovaSpine / OpenClaw Pro
- `js/storefront-config.js` - storefront checkout config
- `js/storefront.js` - static Lemon Squeezy / commerce button wiring
- `css/style.css` - Dark modern styling and responsive layout
- `assets/company-logo.jpg` - Nova_Ai company logo
- `assets/novaspine-product.png` - NovaSpine product art
- `assets/nemosidecar-product.png` - NemoSidecar product art

## Deploy to GitHub Pages

1. Create a GitHub repository named `nova-ai`.
2. Push these files to the `main` branch.
3. Open repository `Settings` -> `Pages`.
4. Under Build and deployment, set:
- Source: Deploy from a branch
- Branch: `main`
- Folder: `/ (root)`
5. Save.
6. Site will be live at:
- `https://username.github.io/nova-ai`

## Local Preview

Open `index.html` directly in a browser, or run a quick local server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Lemon Squeezy Setup

Edit `js/storefront-config.js`:

- `commerceBaseUrl`
- `proCheckoutUrl`

Recommended:

1. Set `commerceBaseUrl` to your deployed Pro commerce service if you want the backend to own redirects and attribution.
2. Or set `proCheckoutUrl` directly to your Lemon Squeezy checkout/share URL if you want a pure static Pages flow.
3. In Lemon Squeezy, set success and cancel URLs to:
   - `/success.html`
   - `/cancel.html`

The storefront script appends static attribution/custom checkout fields for:

- product
- plan
- source
- page/referrer
