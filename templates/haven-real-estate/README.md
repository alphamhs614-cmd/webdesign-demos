# Haven – Real Estate Agent Website Template (EN + DE)

An elegant, fast website for real-estate agents, brokers and small agencies. Visitors search and filter your listings, open a property with photo gallery and details, and request a viewing via **WhatsApp or e-mail** in one tap. A 3-step **free valuation** form generates seller leads. No database, no WordPress – listings live in one simple JavaScript file. Comes in **English (index.html)** and **German (index-de.html)** with light & dark mode and placeholder legal pages (incl. § 34c GewO note).

## Files
```
index.html                English version
index-de.html             German version (Impressum & Datenschutz)
assets/js/listings-en.js  YOUR LISTINGS (English)
assets/js/listings-de.js  YOUR LISTINGS (German)
assets/css/style.css      design – colours & fonts at the top
assets/js/main.js         search, filters, gallery modal, forms, animations
assets/img/               photos (CC0 placeholders)
assets/vendor/            GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **Listings:** open `assets/js/listings-en.js` (and `-de.js`). Each property is one `{ … }` block: title, price, beds, baths, size, area, status (`sale`/`rent`), type, description, features and photos. Copy a block to add a property, delete one to remove it. Put the photos in `assets/img/`.
2. **Areas:** the `area` value of a listing must match an option of the "Location" select in the HTML (`<option value="hillside">Hillside</option>`). Rename or add areas in both places.
3. **WhatsApp & e-mail:** replace `491700000000` (international format, no +) and `hello@example.com`. Viewing requests include the property title, ID and price automatically.
4. **Valuation form:** sends a structured e-mail to `data-to` on `<form id="vform">`. To receive leads without the mail app, use Formspree/Netlify Forms (see below) and remove `data-send` from the form.
5. **Currency:** change `window.CURRENCY = 'EUR'` in the listings file (e.g. `USD`, `GBP`, `AED`). Formatting follows the page language automatically.
6. **Agent & texts:** edit the AGENT, SERVICES and CONTACT sections directly in the HTML.

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
