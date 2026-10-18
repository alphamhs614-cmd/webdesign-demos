# Crumb & Kettle – Bakery & Café Website Template (EN + DE)

A warm, editorial website for bakeries, cafés, coffee shops and patisseries. Live "open now" badge, rotating "baked fresh daily" stamp, a **bread of the week** calendar that highlights today automatically, a tabbed menu with prices, story section with counters, photo strip, and a **click & collect pre-order form** with quantity steppers and live total that sends the order via **WhatsApp or e-mail** – no backend, no fees. Comes in **English (index.html)** and **German (index-de.html)** with light & dark mode and placeholder Impressum/Datenschutz.

## Files
```
index.html            English version
index-de.html         German version (Impressum & Datenschutz)
assets/css/style.css  design – colours & fonts at the top
assets/js/main.js     animations, theme, open-now badge, bread of the week, pre-order form
assets/img/           photos (CC0 placeholders)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **WhatsApp & phone:** replace `491700000000` (WhatsApp) and `+49000000000` (tel: links) everywhere. Orders go to the number in `data-to` and the e-mail in `data-mail` on the pre-order form.
2. **Opening hours:** edit the CONTACT section *and* the `data-open` attribute on the "open now" badge in the hero (`{"1":[7,18], …}` = weekday 0–6 with opening and closing hour).
3. **Bread of the week:** edit the seven day cards in the BREAD OF THE WEEK section (Monday first). Today's card is highlighted automatically.
4. **Menu:** edit the rows in the MENU section (four tabs). Small labels like `<span class="tag-v">V</span>` mark vegetarian/vegan items.
5. **Pre-order items:** every `.item` has `data-name` and `data-price` – change them, change the photo, or duplicate a line to add products.
6. **Allergens (EU):** you must be able to inform guests about the 14 main allergens – keep a list in the shop or link one.

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
