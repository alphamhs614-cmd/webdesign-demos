# Veritas – Law Firm & Consultant Website Template (EN + DE)

A serious, trustworthy website for law firms, solo attorneys, tax advisors, notaries and consultants. Editorial serif typography, practice-area cards that preselect the contact form, an approach section with counters, process steps, lawyer profiles, a **transparent fees** section, client quotes, a confidential consultation request form (opens the visitor's e-mail app – no third-party form service), FAQ and office details. **English (index.html)** and **German (index-de.html)** with light & dark mode and an Impressum placeholder that already contains the extra professional details German lawyers must publish (chamber, BRAO/BORA, liability insurance).

## Files
```
index.html            English version
index-de.html         German version (Impressum & Datenschutz)
assets/css/style.css  design – colours & fonts at the top
assets/js/main.js     animations, theme, forms, legal pages
assets/img/           photos (CC0 placeholders)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **Practice areas:** edit the six `<a class="area">` cards (icon, title, text). The `data-area` value must match an `<option>` in the contact form.
2. **Fees:** edit the three `.fee` blocks. Check your local fee rules (e.g. RVG in Germany) before publishing amounts.
3. **Contact form:** opens the e-mail app addressed to `data-to`. For sensitive matters consider an encrypted form service – mention it in your privacy policy.
4. **Team:** replace photos `p1.jpg`–`p3.jpg` and the names/roles.
5. **Legal (Germany):** fill in chamber, insurance and VAT ID in the Impressum placeholder and have it checked.
6. **Other professions:** works great for tax advisors (Steuerberater), notaries, consultants or financial advisors – just rename the areas.

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
