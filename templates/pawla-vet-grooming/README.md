# Pawla – Vet Clinic & Pet Grooming Website Template (EN + DE)

A friendly, colourful website for veterinary clinics, pet grooming salons, dog daycare and pet-care businesses. 24/7 emergency bar, morphing blob hero with stickers, a **pet switcher (dogs / cats / small pets)** that swaps the service cards, **grooming packages with a size toggle (S/M/L) that updates prices**, a puppy & kitten health-plan banner, team cards, "patients of the month" gallery, and a booking form with pet type, pet name and service that sends via **WhatsApp or e-mail**. Comes in **English (index.html)** and **German (index-de.html)** with light & dark mode and placeholder Impressum/Datenschutz (incl. professional details for German vets).

## Files
```
index.html            English version
index-de.html         German version (Impressum & Datenschutz)
assets/css/style.css  design – colours & fonts at the top
assets/js/main.js     animations, theme, pet switcher, size toggle, booking form
assets/img/           photos (CC0 placeholders)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **WhatsApp & phone:** replace `491700000000` (WhatsApp) and `+49000000000` (tel: links) everywhere, including the emergency bar at the top.
2. **Services per pet:** the CARE section has three panels (`data-pet-panel="dog|cat|rabbit"`). Edit the cards, or delete a panel and its button if you only treat dogs and cats.
3. **Grooming prices:** each package price has `data-s`, `data-m` and `data-l` – the size buttons switch between them. Change the visible default too.
4. **Grooming-only business?** Delete the CARE and HEALTH PLAN sections and the medical entries in the service dropdown – the template works as a pure grooming salon.
5. **Team:** avatars show initials – replace the `<span class="av">` with `<img>` photos of your real team.
6. **Legal (Germany):** vets must show professional details (chamber, title, GOT, authority) in the Impressum – placeholders are included.

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
