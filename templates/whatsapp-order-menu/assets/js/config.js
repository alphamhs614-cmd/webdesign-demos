/* ================= EDIT EVERYTHING HERE =================
   WHATSAPP: your number in international format, digits only (no +, no spaces). Example: 491701234567
   CURRENCY: text shown after prices. CATEGORIES: your menu.
   icon: 'burger' | 'fries' | 'drink' (built-in SVG drawings – no photos needed)            */
const CONFIG = {
  WHATSAPP: '10000000000',
  NAME: 'SMASH CO.',
  CURRENCY: '$',
  CURRENCY_BEFORE: true,
  CATEGORIES: [
    { name: 'Burgers', sub: 'Fresh daily', icon: 'burger', items: [
      { n: 'Classic Smash', d: 'Two beef patties, cheddar, house sauce, pickles', p: 9, hot: true },
      { n: 'Double Cheese', d: 'Double beef, double cheese, caramelised onions', p: 11 },
      { n: 'Smoky BBQ', d: 'Smoked BBQ sauce, crispy onion rings', p: 12 },
      { n: 'Crispy Chicken', d: 'Crispy chicken breast, lettuce, spicy mayo', p: 8 },
    ], sizes: [['Regular', 0], ['Double (+1 patty)', 2.5]],
       extras: [['Extra cheese', 1], ['Beef bacon', 1.5], ['Jalapeños', 0.8], ['No onions', 0]] },
    { name: 'Combos', sub: 'Best value', icon: 'burger', items: [
      { n: 'Classic Combo', d: 'Classic Smash + fries + drink', p: 13, hot: true },
      { n: 'Family Box', d: '4 burgers + 2 large fries + 4 drinks', p: 39 },
    ]},
    { name: 'Sides', sub: 'Crispy', icon: 'fries', items: [
      { n: 'Cheese Fries', d: 'Crispy fries with cheddar sauce', p: 4.5 },
      { n: 'Onion Rings', d: '8 pieces with ranch dip', p: 4 },
    ]},
    { name: 'Drinks', sub: 'Cold', icon: 'drink', items: [
      { n: 'Vanilla Shake', d: 'Real vanilla ice cream', p: 5 },
      { n: 'Soft Drink', d: '330 ml can', p: 2 },
    ]},
  ],
  TEXT: { open: '● Open now · until 2 am', title: 'SMASH <b>BURGERS</b><br>made fresh daily',
    sub: 'Pick your meal, add what you love and send the order straight to our WhatsApp. No app, no sign-up.',
    info: ['📍 Your street, Your city', '🛵 Delivery 25–35 min', '💳 Cash / card on delivery'],
    popular: 'Popular', cart: 'View cart', items: 'items', size: 'Size', extras: 'Extras', note: 'Note', notePh: 'e.g. sauce on the side',
    add: 'Add to cart', yourCart: 'Your cart', delivery: 'Delivery', pickup: 'Pickup', name: 'Your name', address: 'Address: street, house no., floor',
    preview: 'WhatsApp message preview', send: 'Send order via WhatsApp', newOrder: 'New order', total: 'Total', method: 'Method', nameL: 'Name', addrL: 'Address',
    footer: 'Prices incl. VAT · Allergen information on request' }
};
