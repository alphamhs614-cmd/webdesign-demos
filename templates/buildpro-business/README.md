# BuildPro – Business Website Template (EN + DE)

A bold one-page company website for construction, trades, renovation or any local service business:
hero with parallax, animated key figures, services grid, project gallery, "why us" section, contact form
and ready-made legal pages. Comes in **English (index.html)** and **German (index-de.html)** with a
language switch in the menu.

## Files
```
index.html           English version
index-de.html        German version (Impressum & Datenschutz included)
assets/css/style.css design (brand colour --y at the top)
assets/img/          photos
assets/js/main.js    animations, counters, form, legal pages
assets/vendor/       GSAP + Lenis (self-hosted)
```
Only need one language? Delete the other file and remove the `class="lang"` link in the menu.

## Edit in 15 minutes
1. **Company name & texts:** open `index.html` (and/or `index-de.html`) in a text editor and replace
   "BuildPro", headlines, services, numbers, address and phone. Sections are marked with comments.
2. **Key figures:** each number is `<b data-count="850" data-suf="+">850+</b>` – change both the
   attribute and the text.
3. **Contact form:** set your e-mail in `data-mail="info@example.com"` on the `<form id="cf">`. The form
   opens the visitor's e-mail app with all fields filled in. Want submissions delivered without the mail app?
   Use a free form service: on **Netlify** add `data-netlify="true"` and `name="contact"` to the form and
   delete the form block in `main.js`; or use **Formspree** (`action="https://formspree.io/f/XXXX" method="POST"`).
4. **Colours:** change `--y` (accent yellow) and `--ink` in `assets/css/style.css`.
5. **Photos:** replace the files in `assets/img/` (hero, house, office, crane, bath) – keep the names or update the HTML.
6. **Legal pages:** the imprint and privacy texts at the bottom of the HTML are **placeholders, not legal
   advice**. Fill in your real company data or generate texts with a legal-text generator.

## Put it online for free

### Option A – Netlify Drop (easiest, 2 minutes)
1. Unzip the template.
2. Open https://app.netlify.com/drop and create a free account.
3. Drag the whole template folder onto the page. Done – you get a live URL.
4. Optional: connect your own domain under *Domain settings*.

### Option B – GitHub Pages
1. Create a free account on https://github.com and a new **public** repository.
2. Click *Add file → Upload files* and upload everything inside the template folder
   (index.html must be in the top level of the repository).
3. Go to *Settings → Pages*, choose *Deploy from a branch*, branch `main`, folder `/ (root)`, save.
4. After ~1 minute your site is live at `https://YOUR-NAME.github.io/REPO-NAME/`.

Any normal web host (Strato, IONOS, Hostinger, cPanel …) also works: upload the folder via FTP.

## Privacy-friendly by default
- Fonts and libraries are self-hosted – no Google Fonts, no CDN, no tracking, no cookies.
- That means no cookie banner is needed for the template itself (check again if you add analytics, maps or embeds).

## Support
Questions? Message the seller through the platform where you bought the template.

See LICENSE.txt (one website per license) and CREDITS.md.
