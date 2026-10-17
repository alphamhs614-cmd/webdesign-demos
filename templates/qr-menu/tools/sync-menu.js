// Copies menu.json into menu.js (only needed for previewing by double-clicking index.html).
// Usage (in the template folder):  node tools/sync-menu.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'menu.json'), 'utf8')); // also validates the JSON
fs.writeFileSync(path.join(root, 'menu.js'),
  '/* AUTO-COPY of menu.json for offline preview (file://). Edit menu.json, then run: python3 tools/sync-menu.py */\n' +
  'window.MENU_DATA = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('menu.js updated from menu.json \u2714');
