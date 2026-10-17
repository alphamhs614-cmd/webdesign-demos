/* ===== EDIT YOUR SETTINGS & MENU HERE =====
   RESERVATION_EMAIL: where reservation requests are sent (opens the guest's mail app).
   CURRENCY: shown before every price.
   MENU: each category has a name and a list of [dish, description, price].        */
const RESERVATION_EMAIL = 'hello@example.com';
const CURRENCY = '€';
const MENU = [
  { name: 'Starters', items: [
    ['Scallop crudo', 'citrus, fennel, brown butter', '18'],
    ['Garden soup', 'seasonal vegetables, herb oil', '12'],
    ['Beetroot tartare', 'horseradish, rye, cress', '14'],
  ]},
  { name: 'Mains', items: [
    ['Dry-aged sirloin', 'red wine jus, crispy potatoes', '42'],
    ['Turbot', 'champagne beurre blanc, leek', '38'],
    ['Wild mushroom risotto', 'aged parmesan, truffle', '29'],
  ]},
  { name: 'Desserts', items: [
    ['Tarte Tatin', 'crème fraîche, caramel', '12'],
    ['Dark chocolate soufflé', 'vanilla ice cream', '13'],
    ['Cheese selection', 'three cheeses, quince', '15'],
  ]},
];
