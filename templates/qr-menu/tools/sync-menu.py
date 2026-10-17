#!/usr/bin/env python3
"""Copies menu.json into menu.js (only needed for previewing by double-clicking index.html).
Usage (in the template folder):  python3 tools/sync-menu.py"""
import json, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data = json.load(open(os.path.join(root, 'menu.json'), encoding='utf-8'))  # also validates the JSON
with open(os.path.join(root, 'menu.js'), 'w', encoding='utf-8') as f:
    f.write('/* AUTO-COPY of menu.json for offline preview (file://). Edit menu.json, then run: python3 tools/sync-menu.py */\n')
    f.write('window.MENU_DATA = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
print('menu.js updated from menu.json ✔')
