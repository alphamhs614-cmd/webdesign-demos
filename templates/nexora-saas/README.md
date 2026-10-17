# Nexora – SaaS & AI Startup Landing Page Template

A dark-first, high-conversion landing page for SaaS products, AI tools, apps and startups. Animated hero with a CSS-built product dashboard that tilts into view, logo marquee, bento feature grid with live mini-visuals (AI prompt typing, integrations orbit, sparkline), "how it works" steps, counters, testimonial wall, pricing with a monthly/yearly toggle, FAQ and a sign-up CTA. Light and dark mode, no images required, extremely fast.

## Files
```
index.html            the landing page (English)
assets/css/style.css  design – colours & fonts at the top
assets/js/main.js     animations, theme, pricing toggle, forms, legal pages
assets/img/og.jpg     social share image (replace with your own)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **Sign-up link:** search for `https://app.example.com/signup` and replace it with your app / waitlist URL. The demo button uses `mailto:sales@example.com` – replace it with Calendly or your sales e-mail.
2. **Prices:** in the PRICING section each price has `data-m` (monthly) and `data-y` (yearly) values – the toggle switches between them. Edit names, features and buttons in the same block.
3. **Product mock:** the dashboard in the hero is plain HTML – change labels and numbers directly, or replace the whole `<div class="mock">` with a screenshot of your product (`<img src="assets/img/app.png" alt="">`).
4. **Default theme:** the page starts in dark mode. To start in light mode, change `data-theme="dark"` to `data-theme="light"` on the `<html>` tag.
5. **Brand colour:** change `--accent` (violet) and `--accent-2` (cyan) at the top of style.css – gradients and glows follow automatically.
6. **Logos & testimonials:** all company names are fictional placeholders – replace them or delete the LOGOS block.

## Put it online for free

### Option A – Netlify Drop (easiest, 2 minutes)
1. Unzip the template.
2. Open https://app.netlify.com/drop and create a free account.
3. Drag the whole template folder onto the page. Done – you get a live URL.
4. Optional: connect your own domain under *Domain settings*.

### Option B – GitHub Pages
1. Create a free account on https://github.com and a new **public** repository.
2. Click *Add file → Upload files* and upload everything inside the template folder (index.html must be at the top level).
3. Go to *Settings → Pages*, choose *Deploy from a branch*, branch `main`, folder `/ (root)`, save.
4. After about a minute your site is live at `https://YOUR-NAME.github.io/REPO-NAME/`.

Any normal web host (Strato, IONOS, Hostinger, cPanel …) also works: upload the folder via FTP.

## Privacy-friendly by default
- Fonts and libraries are self-hosted – no Google Fonts, no CDN, no tracking, no cookies.
- So the template itself needs no cookie banner (check again if you add analytics, maps or embeds).
- WhatsApp / e-mail buttons only open the visitor's own app when clicked.
- Imprint and privacy pages are **placeholders, not legal advice** – fill in your real data or use a legal-text generator.

## Common edits
- **Colours & fonts:** the `:root` block at the very top of `assets/css/style.css` (dark mode: the `[data-theme=dark]` block right below it).
- **Default theme:** `data-theme="light"` on the `<html>` tag (set `dark` to start in dark mode). Remove the moon/sun button if you want one theme only.
- **Photos:** replace the files in `assets/img/` (keep the file names, or change the `src` in the HTML). Use JPG/WebP, ~1600 px wide, under 300 KB.
- **Animations:** add `data-reveal` to any element to fade it in on scroll (`up`, `fade`, `left`, `right`, `scale`). Visitors with "reduce motion" enabled see no animations.
- **Sections:** every section is marked with an HTML comment (`<!-- ===== SERVICES ===== -->`) – delete or duplicate whole blocks safely.

## Support
Questions? Message the seller through the platform where you bought the template.

See LICENSE.txt (one website per license) and CREDITS.md.
