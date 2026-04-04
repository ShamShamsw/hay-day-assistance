# Hay Day Supply Chain Assistant

> **Disclaimer:** This is an independent, fan-made planning tool. It is not affiliated with, endorsed by, or part of Hay Day, Supercell, or any other game or company. All game-related names are the property of their respective owners.

A browser-based tool to help you plan your Hay Day farm more efficiently. Select products, set quantities, and instantly see the raw materials, production steps, and time estimates you need to craft them.

---

## How to Run

This is a static web app — no installation or build step required.

### Option 1: Open directly in your browser

1. Clone or download this repository.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).

That's it. No server needed.

### Option 2: Serve locally (optional)

If you prefer to run it through a local server (e.g. to avoid browser file-origin restrictions):

**Using Python:**
```bash
# Python 3
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

**Using Node.js (`npx`):**
```bash
npx serve .
```
Then open the URL shown in the terminal.

---

## Features

- Search and select any Hay Day product
- Set quantities and see all required raw materials
- View production steps and time estimates
- Configure your farm's available buildings

---

## License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
