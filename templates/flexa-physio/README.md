# Flexa – Physiotherapy & Rehab Website Template (EN + DE)

A clean, trustworthy website for physiotherapy practices, sports rehab centres, osteopaths and manual therapists. Hero with "next free slot" and "direct access" cards, key facts, an interactive **"Where does it hurt?" body map** (tap a point or a chip to see causes and treatments, then book for exactly that complaint), treatment cards, a 4-step patient journey, insurance & cost section with tabbed price lists, team, booking form with complaint, insurance and prescription fields that sends via **WhatsApp or e-mail**, reviews, FAQ and contact. Comes in **English (index.html)** and **German (index-de.html)** with light & dark mode and placeholder Impressum/Datenschutz (incl. professional details for German therapy practices).

## Files
```
index.html            English version
index-de.html         German version (Impressum & Datenschutz)
assets/css/style.css  design – colours & fonts at the top
assets/js/main.js     animations, theme, body map, booking form
assets/img/           photos (CC0 placeholders)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **WhatsApp & phone:** replace `491700000000` (WhatsApp) and `+49000000000` (tel: links) everywhere. The booking form sends to `data-to` (WhatsApp) and `data-mail` (e-mail).
2. **Body map:** each zone has a `.spot` button (position via `left`/`top` in %) and a matching `.zone` panel with the same `data-zone` key. Change texts and tags in the panels; the button preselects the matching complaint in the booking form.
3. **Treatments & prices:** edit the cards in TREATMENTS and the three tabs in COSTS & INSURANCE.
4. **Booking options:** dropdown entries are in `<select name="complaint">`; insurance and time windows are radio buttons.
5. **Legal (Germany):** fill in the professional details in the Impressum (title, authority, health-insurance approval). Health data in forms is sensitive – keep the form short and consider an encrypted form provider.
6. **Health advertising:** check local rules (e.g. the German HWG) before publishing promises of healing or before/after claims.

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
