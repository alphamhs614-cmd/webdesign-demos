# Ironside – Barbershop Website Template (EN + DE)

A bold, dark website for barbershops, men's hair salons and grooming studios. Huge outlined headline, live **"open now / walk-ins welcome"** badge, rotating "Est." stamp, outline-text marquee, a classic **service menu with dotted price lines and durations**, membership ("Cut Club") banner, barber cards with "book with …" buttons that preselect the barber, a **lookbook grid with lightbox**, and a booking form (service, barber, date, time slot) that sends via **WhatsApp or e-mail**. Starts in dark mode with a light mode switch. Comes in **English (index.html)** and **German (index-de.html)** with placeholder Impressum/Datenschutz.

## Files
```
index.html            English version
index-de.html         German version (Impressum & Datenschutz)
assets/css/style.css  design – colours & fonts at the top (dark values in [data-theme=dark])
assets/js/main.js     animations, theme, status badge, barber picker, lightbox, booking form
assets/img/           photos (CC0 placeholders)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **WhatsApp & phone:** replace `491700000000` (WhatsApp) and `+49000000000` (tel: links) everywhere.
2. **Opening hours:** edit the CONTACT section *and* the `data-open` attribute of the status badge in the hero (`{"2":[10,20], …}` = weekday 0–6 with opening and closing hour; missing days = closed).
3. **Services & prices:** edit the `.mi` blocks in the SERVICES section. Add ` hot` to the class to show the "Popular" label. The booking dropdown is in `<select name="service">`.
4. **Barbers:** change names, photos and the `data-barber` value of the "Book with" link – it must match a value in the barber radio buttons of the form.
5. **Time slots:** the radio buttons under "Time" – add or remove slots as needed.
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
