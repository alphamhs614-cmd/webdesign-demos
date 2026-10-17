# Velora – Beauty, Lash & Skin Studio Website Template (EN + DE)

A calm, editorial one-page website for beauty salons, skin & lash studios, brow bars, hair salons and spas. Guests pick treatments from the price list, choose a date and time and send the booking request straight to your **WhatsApp** (or by e-mail) – no booking software, no monthly fees. Comes in **English (index.html)** and **German (index-de.html)**, with light & dark mode and placeholder legal pages (Impressum / Datenschutz).

## Files
```
index.html            English version
index-de.html         German version (Impressum & Datenschutz)
assets/css/style.css  design – colours & fonts at the top
assets/css/fonts.css  self-hosted fonts
assets/js/main.js     animations, booking logic, theme, legal pages
assets/img/           photos (CC0 placeholders)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **Name, texts, address:** open `index.html` / `index-de.html` in any text editor (VS Code, Notepad++) and replace "Velora", headlines, address, phone and e-mail. Every section is marked with a comment.
2. **WhatsApp number:** search for `491700000000` and replace it with your number in international format without + or spaces (e.g. `4917612345678`). It appears in the booking form (`data-to`), the gift section, contact block and the mobile button.
3. **E-mail for bookings:** change `data-mail="hello@example.com"` on the booking `<form>` (used by the "Send by e-mail" button).
4. **Treatments & prices:** in the PRICE LIST section each treatment is one `<div class="svc" data-name="…" data-price="89">` – change name, description, duration, the visible price and the `data-price` number (used for the total). Copy a block to add a treatment. Currency: `data-currency="EUR"` on the form.
5. **Tabs/categories:** each tab button has `data-tab="facials"` and its list has `data-panel="facials"` – keep the names matching.
6. **Opening hours & map:** edit the table in the CONTACT section and the Google Maps link (`https://maps.google.com/?q=…`). The map is a privacy-friendly illustration; no Google request is made until a visitor clicks.
7. **Using a booking tool instead?** (Treatwell, Fresha, Calendly, Acuity …) – change the `href="#book"` of the buttons to your booking URL and delete the BOOKING section.

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
