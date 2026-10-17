# Ascend – Coach & Consultant Website Template (EN + DE)

A bold, conversion-focused one-page website for life coaches, business & career coaches, consultants, therapists and course creators. Big typography, a bento "results" grid, stacking method cards, pricing, testimonials, a lead-magnet form and a strong "book a free call" path everywhere. Comes in **English (index.html)** and **German (index-de.html)** with light & dark mode and placeholder legal pages.

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
1. **Booking link:** search for `https://calendly.com/your-name/intro` and replace it with your Calendly, Cal.com, TidyCal or any booking page URL (all "Book a free call" buttons use it).
2. **WhatsApp:** replace `491700000000` with your number (international format, no + or spaces).
3. **Texts:** headline, pains, method steps, programs and FAQ are plain HTML – edit them directly. The small image inside the headline is `assets/img/work.jpg`.
4. **Prices:** edit the three `<div class="plan">` blocks in the PROGRAMS section (name, price, features, button). The `pop` class marks the highlighted plan.
5. **Lead magnet form:** opens the visitor's e-mail app addressed to `data-to`. To collect subscribers automatically, replace the `<form>` with the embed code of your newsletter tool (MailerLite, Brevo, ConvertKit …) – note: external embeds may need a cookie notice.
6. **Logo strip:** the "As featured in" names are fictional – replace with real ones or delete the LOGOS block.

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
