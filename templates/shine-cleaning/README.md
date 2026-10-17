# Shine – Cleaning Service Website Template (EN + DE)

A bright, trust-building website for cleaning companies, maid services, office cleaners and housekeeping businesses – built around a **live price calculator** in the hero: visitors choose the service, rooms, frequency and extras, see their price instantly and book with one tap via **WhatsApp** (or request the quote by e-mail). Also includes trust badges, service cards, "how it works", a room-by-room checklist with tabs, a guarantee banner, a scrolling review wall, FAQ, service areas and contact. **English (index.html)** and **German (index-de.html)**, light & dark mode, placeholder Impressum/Datenschutz.

## Files
```
index.html            English version
index-de.html         German version (Impressum & Datenschutz)
assets/css/style.css  design – colours & fonts at the top
assets/js/main.js     animations, theme, price calculator, legal pages
assets/img/           photos (CC0 placeholders)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **WhatsApp & e-mail:** replace `491700000000` everywhere and the e-mail in `data-mail` on the `<form class="quote">`.
2. **Calculator prices:** the price model is in the `data-config` attribute of `<form class="quote">`: each service type is `["key", "Name", base price, price per extra bedroom, price per extra bathroom]`. Extras use `data-price` on their checkbox, frequency discounts use `data-off` (percent). Change the numbers – the calculator updates automatically.
3. **Currency:** in `data-config` set `"cur"` (e.g. "$", "£", "CHF") and `"pre": true` to show it before the number.
4. **Service cards, checklist, areas:** plain HTML in their sections – edit or duplicate items.
5. **Reviews:** the review wall scrolls automatically; replace with your real Google reviews.

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
