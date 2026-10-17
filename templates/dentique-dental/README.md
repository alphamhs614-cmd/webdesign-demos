# Dentique – Dental Clinic Website Template (EN + DE)

A fresh, calming website for dentists, orthodontists, dental hygiene studios and other medical practices. Hero with "next free appointment" and emergency cards, trust strip, bento treatment grid with "from" prices, approach section with counters, before/after slider, team, tabbed price list, a booking form that sends the request via **WhatsApp or e-mail**, Google-style reviews, FAQ, opening hours and a map link. Comes in **English (index.html)** and **German (index-de.html)** with light & dark mode and placeholder Impressum/Datenschutz (incl. the extra professional details German medical practices need).

## Files
```
index.html            English version
index-de.html         German version (Impressum & Datenschutz)
assets/css/style.css  design – colours & fonts at the top
assets/js/main.js     animations, theme, booking form, before/after slider, legal pages
assets/img/           photos (CC0 placeholders)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **WhatsApp & phone:** replace `491700000000` (WhatsApp) and `+49000000000` (tel: links) everywhere. The booking form sends to the WhatsApp number in `data-to` and to the e-mail address in `data-mail`.
2. **Treatments & prices:** edit the cards in the TREATMENTS section and the rows in the PRICES section (three tabs). Delete any price you do not want to publish.
3. **Booking options:** the dropdown entries are in the `<select name="treatment">`; time windows are the radio buttons below. Clicking the arrow on a treatment card preselects it in the form.
4. **Before / after:** replace `assets/img/smile2.jpg` – for real cases use two images (after = first `<img>`, before = the image inside `.before`) and remove the CSS filter `.ba .before img{filter:…}` in style.css.
5. **Legal (Germany):** the German Impressum includes placeholders for the dental chamber, professional title and KZV that medical practices must show. Have your texts checked.
6. **Medical advertising:** check local rules (e.g. the German HWG) before publishing before/after pictures or price claims.

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
