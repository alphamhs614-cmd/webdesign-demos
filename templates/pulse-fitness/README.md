# Pulse – Gym & Fitness Studio Website Template (EN + DE)

A bold, high-energy website for gyms, CrossFit boxes, boxing clubs, personal trainers and fitness studios. Full-bleed hero with giant condensed type, volt marquee strip, program cards, "why us" bento, a weekly class schedule with day tabs and one-tap **"Book via WhatsApp"**, membership pricing with a monthly / 12-month toggle, results, coaches, a free-trial form that sends to WhatsApp, FAQ and visit info. Dark mode by default (light mode included), **English (index.html)** and **German (index-de.html)** with placeholder Impressum/Datenschutz.

## Files
```
index.html            English version
index-de.html         German version (Impressum & Datenschutz)
assets/css/style.css  design – colours & fonts at the top
assets/js/main.js     animations, theme, schedule booking, pricing toggle, forms
assets/img/           photos (CC0 placeholders)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **WhatsApp:** replace `491700000000` everywhere. Class "Book" buttons and the free-trial form open WhatsApp with a prefilled message.
2. **Schedule:** each class is one `<div class="srow">` in the SCHEDULE section (time, name, coach, level, spots, and the `data-class` text sent to WhatsApp). Copy or delete rows; each day is one `data-panel`.
3. **Prices:** every price has `data-m` (monthly) and `data-y` (12-month) values used by the toggle.
4. **Brand colour:** change `--accent` (volt) at the top of style.css. Default theme is dark – change `data-theme="dark"` on `<html>` to start in light mode.
5. **Results/testimonials:** shown as examples – only publish real member results with their consent.

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
