# QR Digital Menu – Arabic + German (RTL/LTR) · WhatsApp ordering

A fast, mobile-first digital menu for restaurants, cafés, bakeries and takeaways. Guests scan a QR code
on the table, switch between **Deutsch** and **العربية** with one tap (the whole layout flips
LTR ⇄ RTL), browse categories with a sticky navigation, filter by dietary tags and send their order
to your **WhatsApp** with quantities and total already filled in.
No app, no database, no WordPress, no monthly fee – just a few static files (no frameworks; the page loads in well under 300 KB).

> 🇩🇪 Kurzanleitung und 🇸🇦 دليل مختصر: see the bottom of this file.

## Files
```
index.html                 the menu page (no need to edit)
menu.json                  ← EVERYTHING you edit: name, logo, colours, currency, WhatsApp, dishes (DE + AR)
menu.js                    copy of menu.json for previewing by double-click (see "Preview locally")
qr.html                    QR code generator + printable table card (works offline)
assets/js/app.js           menu logic (vanilla JS, no libraries)
assets/css/style.css       design (colours come from menu.json)
assets/img/                logo + dish illustrations (replace with your photos)
assets/fonts/              Cairo font, self-hosted
assets/vendor/             qrcode-generator (MIT) – only used by qr.html
tools/sync-menu.py / .js   copies menu.json → menu.js
```

## Edit menu.json (10 minutes)
Open `menu.json` in any text editor (VS Code, Notepad++, TextEdit in plain-text mode).
Every text exists twice: `{ "de": "German text", "ar": "النص العربي" }`.

- **restaurant** – `name`, `tagline`, `address`, `hours`, `phone`, `logo` (path to an image),
  `mapsUrl`, `instagram`, `imprintUrl`, `privacyUrl` (optional links shown in the header/footer,
  leave `""` to hide).
- **restaurant.whatsapp** – your number in international format, **digits only**:
  `491701234567` (Germany, without the leading 0 of 0170), `971501234567` (UAE).
- **settings**
  - `defaultLanguage`: `"de"` or `"ar"` – what guests see first (their choice is remembered).
    Links can force a language: `…/index.html?lang=ar`.
  - `languages`: `["de","ar"]`. Want only one language? Use `["de"]` – the switch button disappears.
  - `currency`: ISO code – `"EUR"`, `"CHF"`, `"USD"`, `"AED"`, `"SAR"` … Prices are formatted
    automatically (`6,50 €` in German, `6.50 €` in Arabic).
  - `arabicDigits`: `true` shows ٦٫٥٠ instead of 6.50 in Arabic.
  - `ordering`: `false` turns the menu into a pure view-only menu (no + buttons, no WhatsApp).
  - `askName`, `askTable`: show/hide the optional fields in the order sheet.
- **theme** – `primary`, `accent`, `background`, `surface`, `text`, `muted` (any CSS colour).
- **tags** – dietary badges with label (DE/AR) and colour. Used tags automatically become filter
  buttons (except `popular`, `nuts`, `spicy`, which are shown as badges only). Add your own, e.g.
  `"halal": { "de": "Halal", "ar": "حلال", "color": "#00796b" }`.
- **text** – every label of the interface in both languages (button texts, WhatsApp message lines,
  footer / allergen note).
- **categories** – each has an `id` (letters, no spaces), `name`, `description` and `items`.
  An item:
  ```json
  { "id": "hummus", "name": { "de": "Hummus", "ar": "حمص" },
    "description": { "de": "…", "ar": "…" }, "price": 6.5,
    "image": "assets/img/hummus.svg", "tags": ["vegan", "gf"] }
  ```
  Add `"available": false` to mark a dish as sold out. Use a dot for decimals (`6.5`, not `6,5`).

**JSON tips:** keep the quotes, separate entries with commas, no comma after the last entry.
If the menu shows "Could not load menu.json", paste the file into https://jsonlint.com to find the typo.

**Photos:** put your images into `assets/img/` and change `"image"`. Square or 4:3, about 600 px wide,
compressed (e.g. with squoosh.app) keeps the menu fast on mobile data.

## Preview locally
- **Recommended:** start a tiny local server in the template folder and open http://localhost:8000
  - Python: `python3 -m http.server 8000`  ·  Node: `npx serve .`  ·  VS Code: "Live Server" extension
- **Double-click `index.html`:** browsers do not allow pages opened from disk to read `menu.json`,
  so the page then reads `menu.js` instead. After editing `menu.json`, update the copy with
  `python3 tools/sync-menu.py` (or `node tools/sync-menu.js`) – or simply paste the content of
  `menu.json` into `menu.js` after `window.MENU_DATA = ` (keep the `;` at the end).
- Online (on any host) only `menu.json` is used – you don't need to touch `menu.js` there.

## Put it online
### Option A – Netlify Drop (easiest, free, 2 minutes)
1. Unzip the template. 2. Open https://app.netlify.com/drop (free account).
3. Drag the whole `qr-menu` folder onto the page → you get a live https:// URL.
4. To update later: *Deploys* → drag the folder again. Own domain: *Domain settings*.

### Option B – GitHub Pages (free)
1. New **public** repository on https://github.com → *Add file → Upload files* → upload everything
   inside the folder (`index.html` must be at the top level).
2. *Settings → Pages* → *Deploy from a branch* → `main` / `/ (root)` → Save.
3. Live after ~1 minute at `https://YOUR-NAME.github.io/REPO-NAME/`.

### Option C – any web host
Strato, IONOS, All-Inkl, Hostinger, cPanel …: upload the folder content via FTP / file manager.
`.json` files are served correctly by all common hosts.

## Create the QR code
1. Put the menu online first, so you have the final URL (ideally your own domain – then the printed
   code never has to change).
2. Open `qr.html` (online: `https://your-site/qr.html`, or just double-click it – it works offline).
3. Paste your URL, pick colours, then **Download PNG / SVG** or **Print table card**.
4. Test the code with 2–3 phones before printing many. Dark code on a light background scans best.
   Recommended print size: at least 3 × 3 cm.
Nothing is sent anywhere – the QR code is generated inside your browser.
(Any other QR generator works too – the code only contains your URL.)

## Privacy / legal
- No cookies, no tracking, no external requests: fonts and scripts are self-hosted. The cart and the
  chosen language are stored only in the guest's own browser (localStorage).
- When a guest taps "Order via WhatsApp", WhatsApp opens with the prepared text; the guest sends it.
  Mention WhatsApp in your privacy policy. In Germany a website needs an Impressum and a
  Datenschutzerklärung – set `imprintUrl` and `privacyUrl` in menu.json (e.g. pages on your main
  website) and they appear in the footer. Allergen information must be available (see the `footer` text).
- This is not legal advice.

---

## 🇩🇪 Kurzanleitung (Deutsch)
1. **Alles in `menu.json` bearbeiten:** Name, Logo, Farben (`theme`), Währung, WhatsApp-Nummer
   (international, nur Ziffern, z. B. `491701234567`), Kategorien und Gerichte – jeweils `"de"` und `"ar"`.
   Preise mit Punkt (`6.5`). `"available": false` = ausverkauft.
2. **Lokal testen:** im Ordner `python3 -m http.server 8000` → http://localhost:8000.
   Per Doppelklick wird `menu.js` gelesen – nach Änderungen `python3 tools/sync-menu.py` ausführen.
3. **Online stellen:** Ordner auf https://app.netlify.com/drop ziehen, GitHub Pages oder per FTP
   zu jedem Hoster (Strato, IONOS, All-Inkl …).
4. **QR-Code:** `qr.html` öffnen, Ihre URL einfügen, PNG/SVG herunterladen oder Tischaufsteller drucken.
5. Keine Cookies, kein Tracking. `imprintUrl`/`privacyUrl` für Impressum & Datenschutz eintragen, Allergenhinweise nicht vergessen.

## 🇸🇦 دليل مختصر (العربية)
<div dir="rtl">

1. **كل التعديلات في ملف `menu.json`:** اسم المطعم، الشعار، الألوان (`theme`)، العملة، رقم واتساب
   (بالصيغة الدولية وأرقام فقط مثل `491701234567`)، الأقسام والأطباق – لكل نص نسخة `"ar"` ونسخة `"de"`.
   اكتب السعر بنقطة (`6.5`)، و`"available": false` تعني أن الطبق نفد.
2. **التجربة على جهازك:** داخل المجلد شغّل `python3 -m http.server 8000` ثم افتح http://localhost:8000.
   عند فتح `index.html` بالنقر المزدوج تُقرأ البيانات من `menu.js` – بعد أي تعديل شغّل `python3 tools/sync-menu.py`.
3. **النشر:** اسحب المجلد إلى https://app.netlify.com/drop أو استخدم GitHub Pages أو أي استضافة عبر FTP.
4. **رمز QR:** افتح `qr.html` وألصق رابط موقعك، ثم نزّل الصورة PNG/SVG أو اطبع بطاقة الطاولة.
5. لا كوكيز ولا تتبّع. لا تنسَ صفحة Impressum وسياسة الخصوصية ومعلومات مسببات الحساسية في ألمانيا.

</div>

## Support
Questions? Message the seller through the platform where you bought the template.
See LICENSE.txt (one website per license) and CREDITS.md.
