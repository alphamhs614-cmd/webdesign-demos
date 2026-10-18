/*!
 * Haven – property data (EDIT YOUR LISTINGS HERE)
 * File: assets/js/listings.js
 *
 * One object per property:
 *   id        unique short id, used in links: property.html?id=h5
 *   status    "sale" or "rent"
 *   type      "house" | "apartment" | "villa"  (must match an <option value> of the "Property type" select)
 *   area      key from AREAS below          (must match an <option value> of the "Location" select)
 *   price     number – for rentals the price per month
 *   img       cover photo file name in assets/img (without .jpg)
 *   gallery   list of photo file names for the gallery
 *   badge     optional small label, e.g. "New" or "Reduced" ("" = none)
 */

/* currency used for all prices (any ISO 4217 code, e.g. "USD", "GBP", "EUR") */
window.CURRENCY = "EUR";

/* areas shown on cards – keys are used in the listings below */
window.AREAS = { centre: "City centre", riverside: "Riverside", hillside: "Hillside", suburbs: "Suburbs" };

/* interface texts used by the listings script (translate here) */
window.LABELS = {
  sale: "For sale",
  rent: "For rent",
  month: "/ month",
  beds: "beds",
  baths: "baths",
  fav: "Save property",
  none: "No properties match your search – try another area or price.",
  types: { house: "House", apartment: "Apartment", villa: "Villa" },
};

window.LISTINGS = [
  {
    id: "h5",
    status: "sale",
    type: "villa",
    area: "hillside",
    title: "Hillside villa with infinity pool",
    price: 2450000,
    beds: 5,
    baths: 4,
    size: 380,
    img: "h5",
    gallery: ["h5", "i1", "k1", "i2"],
    badge: "New",
    desc: "Architect-designed villa with panoramic views, open living spaces and a heated infinity pool. Quiet cul-de-sac, 10 minutes to the centre.",
    features: ["Infinity pool", "Panoramic view", "Smart home", "Double garage", "Solar panels"],
  },
  {
    id: "hero",
    status: "sale",
    type: "villa",
    area: "riverside",
    title: "Stone estate with pool & gardens",
    price: 1890000,
    beds: 6,
    baths: 4,
    size: 420,
    img: "hero",
    gallery: ["hero", "i2", "k2", "i1"],
    badge: "",
    desc: "Restored natural-stone country house on a 4,000 m² plot with mature gardens, pool and guest wing.",
    features: ["4,000 m² plot", "Guest wing", "Pool", "Fireplace"],
  },
  {
    id: "h1",
    status: "sale",
    type: "house",
    area: "suburbs",
    title: "Charming family home with porch",
    price: 685000,
    beds: 4,
    baths: 2,
    size: 165,
    img: "h1",
    gallery: ["h1", "i1", "k1"],
    badge: "",
    desc: "Classic family house with a welcoming porch, renovated kitchen and a sunny garden – close to schools and parks.",
    features: ["Renovated 2023", "Garden", "Near schools", "Basement"],
  },
  {
    id: "h7",
    status: "rent",
    type: "house",
    area: "hillside",
    title: "Modern house with terrace pool",
    price: 4200,
    beds: 4,
    baths: 3,
    size: 210,
    img: "h7",
    gallery: ["h7", "i2", "k2"],
    badge: "New",
    desc: "Light-filled modern house with floor-to-ceiling windows, rooftop terrace and plunge pool. Available from next month.",
    features: ["Furnished option", "Terrace pool", "Floor heating", "EV charger"],
  },
  {
    id: "h6",
    status: "rent",
    type: "apartment",
    area: "centre",
    title: "Penthouse apartment in the city centre",
    price: 2350,
    beds: 3,
    baths: 2,
    size: 128,
    img: "h6",
    gallery: ["h6", "i1", "k1"],
    badge: "",
    desc: "Top-floor apartment with two balconies, elevator and underground parking, steps from shops and cafés.",
    features: ["2 balconies", "Elevator", "Parking space", "Concierge"],
  },
  {
    id: "h3",
    status: "sale",
    type: "house",
    area: "suburbs",
    title: "White farmhouse with wrap-around porch",
    price: 749000,
    beds: 4,
    baths: 3,
    size: 190,
    img: "h3",
    gallery: ["h3", "k2", "i2"],
    badge: "",
    desc: "Bright farmhouse-style home with open kitchen, home office and a large lawn. Move-in ready.",
    features: ["Home office", "Large lawn", "Open kitchen", "Garage"],
  },
  {
    id: "h4",
    status: "sale",
    type: "house",
    area: "riverside",
    title: "Brick home near the river",
    price: 598000,
    beds: 3,
    baths: 2,
    size: 148,
    img: "h4",
    gallery: ["h4", "i1", "k1"],
    badge: "Price reduced",
    desc: "Solid brick house with attached garage, cosy living room and a quiet backyard, five minutes from the river walk.",
    features: ["Attached garage", "Backyard", "Quiet street"],
  },
  {
    id: "h2",
    status: "rent",
    type: "house",
    area: "suburbs",
    title: "Spacious suburban house",
    price: 2900,
    beds: 4,
    baths: 3,
    size: 175,
    img: "h2",
    gallery: ["h2", "k2", "i2"],
    badge: "",
    desc: "Generous family house with double garage, large kitchen and a garden backing onto green fields.",
    features: ["Double garage", "Pets allowed", "Garden"],
  },
];
