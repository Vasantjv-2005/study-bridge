# Spotify Clone (HTML/CSS)

A lightweight Spotify UI clone built with plain HTML and CSS (Font Awesome for icons). The layout mimics Spotify's sidebar + main content + footer with playlists, cards, and hover effects.

## Features
- **Sidebar navigation** with logo, Home, Search, Library
- **Create playlist** callouts with scrollable area
- **Top navigation** with back/forward and auth buttons
- **Cards grid** for albums/episodes with hover play button
- **Spotify‑style footer** with multi-column links and social icons
- **Responsive tweaks** to stack footer on small screens

## Tech Stack
- **HTML5** for structure
- **CSS3** for styling and layout (Flexbox)
- **Font Awesome 7 CDN** for icons

## Project Structure
```
Spotify-clone/
├─ images/                 # Project images (cards, logo)
├─ index.html              # App markup
├─ style.css               # Styles (sidebar, main, cards, footer)
└─ README.md               # This file
```

## Getting Started
1. Clone the repo
   ```bash
   git clone https://github.com/Vasantjv-2005/Spotify-clone-3skill-project.git
   cd Spotify-clone-3skill-project
   ```
2. Open `index.html` in your browser
   - Option A: Double‑click `index.html`
   - Option B: Use VS Code Live Server (recommended for auto‑reload)

## Development Notes
- Icons are loaded via Font Awesome CDN in `<head>`
- Images are referenced from the local `images/` folder
- The main scrolling area is the `.main-section`
- Footer layout and hover interactions are styled in the bottom section of `style.css`

## Customize
- **Colors/Theme:** Edit variables directly in `style.css` (no preprocessor used)
- **Cards:** Add/remove card items in the `.spotify-playlist .card` section of `index.html`
- **Footer links:** Update the link labels/URLs in the footer columns in `index.html`

## Recommended Extensions (optional)
- VS Code: Live Server
- A formatter (Prettier) to keep HTML/CSS tidy

## Deployment
I have deployed my project in the Vercel site which is user friendly 

## Screenshots
You can add screenshots/gifs of the UI here (e.g., `images/screenshot-1.png`).

## License
MIT — feel free to use and modify.

## Author
- Vasant Jevengekar
- GitHub: @Vasantjv-2005
