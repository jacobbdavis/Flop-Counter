# Flop-Counter

A static web application for tracking flops.

## Features
- **Modern UI**: Dark mode, glassmorphism, and smooth animations.
- **Interactive**: Name entry and real-time counter.
- **Responsive**: Works on various screen sizes.

## How to Run

Because this application uses modern JavaScript, it is best run using a local web server to avoid browser security restrictions (CORS) related to local files.

### 1. Using Python (if installed)
Run one of the following commands in the project directory:

For Python 3:
```bash
python3 -m http.server
```

For Python 2:
```bash
python -m SimpleHTTPServer
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

### 2. Using VS Code "Live Server"
If you use VS Code, install the "Live Server" extension and click "Go Live" to open `index.html`.

### 3. Using Node.js / Vite
If you have Node.js installed, you can use any static file server like `serve` or `http-server`.

## Deployment

Since this is a static site (HTML, CSS, JS), you can deploy it for free on many platforms. All the options below provide **automatic HTTPS/SSL** for secure hosting.

### Option 1: Vercel (Recommended)
1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel` in this directory.
3.  Follow the prompts (default settings are fine).
4.  Your site will be live instantly!

### Option 2: Netlify Drop
1.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2.  Drag and drop the entire `Flop-Counter` folder onto the page.
3.  It will be deployed immediately.

### Option 3: GitHub Pages
1.  Create a new repository on GitHub.
2.  Push your code to the repository.
3.  Go to Settings > Pages.
4.  Select the `main` branch and `/` root folder, then click Save.
