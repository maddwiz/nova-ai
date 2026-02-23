# Nova_Ai Website

Static multi-page website for Nova_Ai, built with plain HTML + CSS and deployed on GitHub Pages.

## Files

- `index.html` - Homepage (company positioning + product grid)
- `novabridge.html` - Live product page for NovaBridge
- `css/style.css` - Dark modern styling and responsive layout
- `assets/logo.svg` - Nova_Ai logo

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

## Final Step Before Sales

Update the Buy Now link in `novabridge.html`:

- `https://your-checkout-link-here`

Replace it with your real Lemon Squeezy checkout URL.
