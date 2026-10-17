# Everafter – Wedding Website Template (EN + DE)

An elegant, editorial wedding website for couples – and for wedding planners and photographers who build sites for their clients. Full-screen hero with names, date and a live countdown, welcome note, "our story" timeline, wedding-day schedule, venue & travel info with **one-click "Add to calendar"** (.ics generated in the browser), dress code & gifts, gallery with lightbox, an **RSVP form** (menu choice, allergies, song request) that arrives by e-mail or WhatsApp, Q&A and a romantic footer. **English (index.html)** and **German (index-de.html)**, light & dark mode.

## Files
```
index.html            English version
index-de.html         German version
assets/css/style.css  design – colours & fonts at the top
assets/js/main.js     countdown, calendar file, RSVP, lightbox, animations
assets/img/           photos (CC0 placeholders)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **Names, date & place:** search for "Emma", "Luca", "12 June 2027" / "12. Juni 2027" and "Villa Rosengarten" and replace them. The countdown reads `data-countdown="2027-06-12T14:00:00"` on the hero.
2. **Calendar button:** set `data-start` / `data-end` (UTC, format `YYYYMMDDTHHMMSSZ`) and `data-loc` on the "Add to calendar" button.
3. **RSVP:** replies go to the e-mail in `data-to` and the WhatsApp number in `data-wa` on `<form class="rform">`. For automatic collection you can swap the form for a Google Form or Tally embed (external – add to your privacy note).
4. **Photos:** replace the images in `assets/img/` with your own (same file names) – hero.jpg is the big cover photo.
5. **Legal pages:** private wedding sites usually do not need an Impressum, but the placeholders are included for planners/photographers using the template commercially. Delete them if not needed.

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
