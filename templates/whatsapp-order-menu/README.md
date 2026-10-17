# WhatsApp Order Menu – Digital Menu Template (EN + AR)

A mobile-first digital menu for burger shops, cafés, food trucks and takeaways. Guests choose dishes,
sizes and extras, see a live cart and send the complete order to your WhatsApp in one tap – no app,
no ordering platform, no commission. Includes an **English (index.html)** and a fully right-to-left
**Arabic (index-ar.html)** version.

## Files
```
index.html             English page
index-ar.html          Arabic page (RTL)
assets/js/config.js    ← EVERYTHING for the English menu: WhatsApp number, name, currency, dishes, texts
assets/js/config-ar.js ← the same for the Arabic page
assets/css/style.css   design (colours at the top)
assets/js/main.js      cart & WhatsApp logic (no need to edit)
assets/vendor/         GSAP + Lenis (self-hosted)
```
Only need one language? Delete the other HTML file and the `class="lang"` link inside it.

## Edit in 10 minutes – only one file
1. Open `assets/js/config.js` in a text editor.
2. **WHATSAPP:** your number in international format, digits only – e.g. `491701234567` (Germany),
   `971501234567` (UAE), `14155550123` (USA).
3. **NAME / CURRENCY:** your restaurant name and currency symbol. `CURRENCY_BEFORE: true` shows `$9`,
   `false` shows `9 €`.
4. **CATEGORIES:** each dish is `{ n: 'Name', d: 'Description', p: 9.5, hot: true }` (`hot` adds a
   "Popular" badge). Add `sizes` and `extras` to any category to offer options with surcharges.
   `icon` can be `'burger'`, `'fries'` or `'drink'`.
5. **TEXT:** all labels, the headline, opening info and footer line.
6. **Colours:** change `--acc` (accent) and `--bg` in `assets/css/style.css`.

Tip: print a QR code pointing to your live URL and put it on the tables or the shop window.

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
