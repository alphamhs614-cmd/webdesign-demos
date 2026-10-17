/* HIER IHRE IMMOBILIEN BEARBEITEN (deutsche Seite). Ein Objekt pro Immobilie.
   status: "sale" (Kauf) oder "rent" (Miete) · type: "house" | "apartment" | "villa" · area: muss einem <option value> der Auswahl „Lage“ in index-de.html entsprechen
   price: Zahl (Miete = pro Monat) · img/gallery: Dateinamen in assets/img (ohne .jpg) */
window.CURRENCY = 'EUR';
window.LISTINGS = [
 {
  "id": "h5",
  "status": "sale",
  "type": "villa",
  "area": "hillside",
  "title": "Villa am Hang mit Infinity-Pool",
  "price": 2450000,
  "beds": 5,
  "baths": 4,
  "size": 380,
  "img": "h5",
  "gallery": [
   "h5",
   "i1",
   "k1",
   "i2"
  ],
  "badge": "Neu",
  "desc": "Architektenvilla mit Panoramablick, offenen Wohnbereichen und beheiztem Infinity-Pool. Ruhige Sackgasse, 10 Minuten ins Zentrum.",
  "features": [
   "Infinity-Pool",
   "Panoramablick",
   "Smart Home",
   "Doppelgarage",
   "Photovoltaik"
  ]
 },
 {
  "id": "hero",
  "status": "sale",
  "type": "villa",
  "area": "riverside",
  "title": "Natursteinanwesen mit Pool & Garten",
  "price": 1890000,
  "beds": 6,
  "baths": 4,
  "size": 420,
  "img": "hero",
  "gallery": [
   "hero",
   "i2",
   "k2",
   "i1"
  ],
  "badge": "",
  "desc": "Restauriertes Natursteinhaus auf 4.000 m² Grund mit altem Baumbestand, Pool und Gästeflügel.",
  "features": [
   "4.000 m² Grundstück",
   "Gästeflügel",
   "Pool",
   "Kamin"
  ]
 },
 {
  "id": "h1",
  "status": "sale",
  "type": "house",
  "area": "suburbs",
  "title": "Charmantes Familienhaus mit Veranda",
  "price": 685000,
  "beds": 4,
  "baths": 2,
  "size": 165,
  "img": "h1",
  "gallery": [
   "h1",
   "i1",
   "k1"
  ],
  "badge": "",
  "desc": "Klassisches Familienhaus mit einladender Veranda, renovierter Küche und sonnigem Garten – nah an Schulen und Parks.",
  "features": [
   "Renoviert 2023",
   "Garten",
   "Schulen in der Nähe",
   "Keller"
  ]
 },
 {
  "id": "h7",
  "status": "rent",
  "type": "house",
  "area": "hillside",
  "title": "Modernes Haus mit Terrassen-Pool",
  "price": 4200,
  "beds": 4,
  "baths": 3,
  "size": 210,
  "img": "h7",
  "gallery": [
   "h7",
   "i2",
   "k2"
  ],
  "badge": "Neu",
  "desc": "Lichtdurchflutetes modernes Haus mit bodentiefen Fenstern, Dachterrasse und Tauchbecken. Ab nächstem Monat frei.",
  "features": [
   "Möbliert möglich",
   "Terrassen-Pool",
   "Fußbodenheizung",
   "Wallbox"
  ]
 },
 {
  "id": "h6",
  "status": "rent",
  "type": "apartment",
  "area": "centre",
  "title": "Penthouse-Wohnung in der Innenstadt",
  "price": 2350,
  "beds": 3,
  "baths": 2,
  "size": 128,
  "img": "h6",
  "gallery": [
   "h6",
   "i1",
   "k1"
  ],
  "badge": "",
  "desc": "Wohnung im obersten Stock mit zwei Balkonen, Aufzug und Tiefgarage, wenige Schritte zu Geschäften und Cafés.",
  "features": [
   "2 Balkone",
   "Aufzug",
   "Stellplatz",
   "Concierge"
  ]
 },
 {
  "id": "h3",
  "status": "sale",
  "type": "house",
  "area": "suburbs",
  "title": "Weißes Landhaus mit umlaufender Veranda",
  "price": 749000,
  "beds": 4,
  "baths": 3,
  "size": 190,
  "img": "h3",
  "gallery": [
   "h3",
   "k2",
   "i2"
  ],
  "badge": "",
  "desc": "Helles Haus im Landhausstil mit offener Küche, Homeoffice und großer Rasenfläche. Bezugsfertig.",
  "features": [
   "Homeoffice",
   "Große Rasenfläche",
   "Offene Küche",
   "Garage"
  ]
 },
 {
  "id": "h4",
  "status": "sale",
  "type": "house",
  "area": "riverside",
  "title": "Backsteinhaus nahe dem Fluss",
  "price": 598000,
  "beds": 3,
  "baths": 2,
  "size": 148,
  "img": "h4",
  "gallery": [
   "h4",
   "i1",
   "k1"
  ],
  "badge": "Preis gesenkt",
  "desc": "Solides Backsteinhaus mit Garage, gemütlichem Wohnzimmer und ruhigem Garten, fünf Minuten zur Flusspromenade.",
  "features": [
   "Garage am Haus",
   "Garten",
   "Ruhige Straße"
  ]
 },
 {
  "id": "h2",
  "status": "rent",
  "type": "house",
  "area": "suburbs",
  "title": "Großzügiges Haus am Stadtrand",
  "price": 2900,
  "beds": 4,
  "baths": 3,
  "size": 175,
  "img": "h2",
  "gallery": [
   "h2",
   "k2",
   "i2"
  ],
  "badge": "",
  "desc": "Großzügiges Familienhaus mit Doppelgarage, großer Küche und Garten mit Blick ins Grüne.",
  "features": [
   "Doppelgarage",
   "Haustiere erlaubt",
   "Garten"
  ]
 }
];
