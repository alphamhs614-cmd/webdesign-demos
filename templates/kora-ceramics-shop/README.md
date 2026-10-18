# Kora – Handmade Shop / Product Website Template (EN + DE)

A calm, editorial online-shop template for makers and small brands – ceramics, candles, jewellery, homeware, coffee or any small product range. Announcement bar, hero with "new collection" card, USP strip, **product grid with category filter, sale/new/sold-out badges and colour swatches**, **quick-view modal**, and a **slide-out cart** (saved in the browser) with free-shipping progress bar. Checkout sends a complete **order request via WhatsApp or e-mail** – you confirm and send a payment link, so you can start selling without a shop system or monthly fees. Includes studio story, reviews, FAQ, visit section and placeholder Impressum, Datenschutz and Widerruf/AGB pages. Comes in **English (index.html)** and **German (index-de.html)** with light & dark mode.

## Files
```
index.html            English version
index-de.html         German version (Impressum, Datenschutz, Widerruf)
assets/css/style.css  design – colours & fonts at the top
assets/js/main.js     animations, theme, filter, quick view, cart drawer, order form
assets/img/           photos (CC0 placeholders)
assets/vendor/        GSAP + Lenis (self-hosted)
```

## Edit in 15 minutes
1. **WhatsApp & e-mail:** replace `491700000000` and `hello@example.com`. Orders are sent to `data-to` / `data-mail` on the cart form (`<form class="df">`).
2. **Products:** each `<article class="prod">` holds `data-id` (unique), `data-name`, `data-price` (number), `data-cat`, `data-img` and `data-desc`. Duplicate a card to add a product; add `data-out` and disable its button for sold-out items. Filter buttons use the same `data-cat` keys.
3. **Free shipping threshold:** `data-free="60"` on the cart drawer and the texts in the announcement bar / FAQ.
4. **Real payments:** to take payment directly, replace the order buttons with Stripe Payment Links, a PayPal button, Snipcart or a Shopify Buy Button – the layout stays the same.
5. **Legal (EU/Germany):** online shops need an Impressum, privacy policy, terms (AGB), cancellation policy with model form, and shipping/price information. The `#widerruf` / `#returns` page is a placeholder – use a legal-text generator. If you switch to a real checkout, the final button must say “zahlungspflichtig bestellen” (order with obligation to pay).
6. **Currency & language:** prices are formatted in the script (`money()` in main.js) – change € and the format there if needed.

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
