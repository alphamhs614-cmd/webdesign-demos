# Bistro Elegance – Restaurant Website Template

A refined, animated restaurant website: Home, Menu and About pages, a reservation form,
parallax hero, image gallery and testimonial slider. Pure HTML/CSS/JS – no build step, no WordPress.

## Files
```
index.html              all page content (Home, Menu, About, Reservation, Footer)
assets/js/menu-data.js  ← your dishes, prices, currency and reservation e-mail
assets/css/style.css    design (colours at the top in :root)
assets/css/fonts.css    self-hosted fonts
assets/img/             photos (replace with your own, keep the file names or update index.html)
assets/js/main.js       animations & logic (no need to edit)
assets/vendor/          GSAP + Lenis (self-hosted)
```

## Edit in 10 minutes
1. **Name & texts:** open `index.html` in any text editor (VS Code, Notepad++, TextEdit) and replace
   "Maison", the headlines, opening hours, address and e-mail. Sections are marked with `<!-- ===== -->` comments.
2. **Menu:** open `assets/js/menu-data.js`. Each dish is one line: `['Dish', 'description', 'price']`.
   Add/remove categories freely – the tabs are created automatically.
3. **Reservations:** set `RESERVATION_EMAIL` in `menu-data.js`. The form opens the guest's e-mail app with
   name, date, time and number of guests pre-filled. Prefer an online booking tool (OpenTable, Resy,
   SevenRooms, Quandoo …)? Replace the `<form class="rf">…</form>` block with their embed code or a link.
4. **Colours:** in `assets/css/style.css` change `--cream`, `--ink` and `--gold` in the first line.
5. **Photos:** put your photos into `assets/img/` with the same names (hero.jpg, chef.jpg, interior.jpg,
   interior2.jpg, wine.jpg, dessert.jpg, plate2.jpg). Landscape, ~1600 px wide, JPG under 300 KB works best.
6. **Team:** replace each `<div class="mono">C</div>` with `<img src="assets/img/chef-photo.jpg" alt="">`.
7. **Legal pages:** if you run the site in the EU/Germany, add an imprint and privacy policy page
   (e.g. copy `index.html`, rename it `imprint.html`, and link it in the footer).

Tip: open `index.html` directly in your browser to preview your changes.

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
