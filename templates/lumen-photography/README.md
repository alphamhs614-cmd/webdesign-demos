# Lumen – Photographer Portfolio Website Template (EN + DE)

A bold, gallery-first website for photographers, videographers and creative studios. Full-screen hero photo, a **filterable portfolio** (Portrait, Landscape, Architecture, Street – rename freely) with a **full-screen lightbox** (arrow keys, swipe on mobile, captions and counter), an about section with counters, service tiles, **three price packages** that preselect the shoot type in the enquiry form, add-ons, process steps, client reviews, FAQ and a contact form that opens the visitor's e-mail app **or WhatsApp** – no third-party form service. Syne + Inter typography, **dark mode by default** with a light-mode toggle, **English (index.html)** and **German (index-de.html)**.

## Files
```
index.html            English version
index-de.html         German version (Impressum & Datenschutz)
assets/css/style.css  design – colours & fonts at the top
assets/js/main.js     filter, lightbox, form, animations, theme, legal pages
assets/img/           photos (CC0 placeholders)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **Your photos:** replace the images in `assets/img/`. In the portfolio every `<button class="g-item">` has `data-cat` (filter category), `data-title` and `data-place` (lightbox caption). Keep `width`/`height` on the `<img>` roughly matching your photo's proportions.
2. **Categories:** edit the filter buttons (`data-filter="port"` etc.) – the value must match the `data-cat` of the items. The small counters are plain numbers.
3. **Hero:** swap `assets/img/d1.jpg` and the headline. Text sits on a dark gradient, so any photo works.
4. **Packages:** edit names, prices and bullet points. The `data-pkg` value of each button must match a shoot-type option (`value="..."`) in the form.
5. **Contact:** set your e-mail in `data-to` and your WhatsApp number (international format, digits only) in `data-wa` on the form.
6. **Light mode by default:** change `data-theme="dark"` to `light` on the `<html>` tag.

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
