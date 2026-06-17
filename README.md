#  Store Locator App

A fast, interactive store locator web app built with React. Find the nearest store to your current location across Bengaluru — with live map, sorted results, and travel time estimates.

 **Live Demo:** https://store-locator-pi.vercel.app
 
<img width="1920" height="1080" alt="Screenshot 2026-06-17 112011" src="https://github.com/user-attachments/assets/0c653ef1-4ab2-46ed-b7b0-c736f243402b" />

<img width="1920" height="1080" alt="Screenshot 2026-06-17 111823" src="https://github.com/user-attachments/assets/c38d17ea-e717-46e3-bc51-13530589436a" />


---

##  Features

-  **Auto-detect location** — One click to find stores near you using GPS
-  **Interactive map** — Live OpenStreetMap with clickable store markers
-  **Distance calculation** — Haversine formula for accurate straight-line distance
-  **Travel time estimate** — Estimated drive time based on average city speed
-  **Nearest store highlight** — Green marker and badge for the closest store
-  **Sorted results panel** — All 10 stores ranked by distance with full details
-  **Manual coordinate input** — Enter lat/lng manually for testing or demo
-  **Error handling** — Graceful messages for denied permissions or invalid input
-  **PWA support** — Installable on Android and desktop like a native app
-  **No API keys required** — Fully free stack, works out of the box

---

##  Technology Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend UI framework |
| Leaflet.js + React-Leaflet | Interactive map rendering |
| OpenStreetMap | Free map tiles (no API key needed) |
| Browser Geolocation API | GPS-based user location detection |
| Haversine Formula | Distance calculation between coordinates |
| Vercel | Deployment and hosting |
| PWA (Service Worker) | Installable app experience |

---

##  Setup and Run Instructions

### Prerequisites
- Node.js (v16 or above)
- npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Vishnupriya280104/store-locator.git

# 2. Navigate into the project folder
cd store-locator/store-locator

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

The app will open at **http://localhost:3000**

### To build for production
```bash
npm run build
```

---

##  Assumptions Made

- Store data is mock data representing 10 realistic locations across Bengaluru with accurate GPS coordinates
- Distance is calculated as straight-line (as-the-crow-flies) using the Haversine formula, not road distance
- Travel time is estimated assuming an average city driving speed of 25 km/h
- The app is scoped to Bengaluru; the coordinate input allows testing from any location
- No backend or database is required — all data is stored client-side for simplicity and speed

---

##  AI-Assisted Development

### Tools Used
This project was built using **Claude (Anthropic)** as the primary AI development assistant, alongside **GitHub Copilot** suggestions within VS Code.

### How AI Helped
Claude assisted throughout the entire development process — from project architecture decisions to writing individual components. It suggested the overall folder structure (`components/`, `data/`, `utils/`), generated the Haversine distance utility, helped configure Leaflet's custom marker icons (a known tricky issue with React), and guided the Vercel deployment configuration including the Root Directory fix. The AI also helped me understand *why* each piece of code works, not just what to write — for example, explaining how the `useMap` hook from React-Leaflet enables smooth `flyTo` animation when a user's location is detected.

### Challenges Encountered
The main challenge was a Leaflet default marker icon issue that is well-known in the React ecosystem — the icons break when bundled with Webpack because of how asset paths are resolved. Claude identified this immediately and provided the standard fix using `L.Icon.Default.mergeOptions`. A second challenge was the Vercel 404 error caused by the project being in a subfolder inside the Git repository; this was resolved by setting the Root Directory to `store-locator` in Vercel's project settings. Both issues were diagnosed and fixed within minutes with AI assistance, which would have taken significantly longer through traditional debugging.

---
---





**Vishnupriya** — ECE Final Year Student, Bengaluru  
Built as part of a technical case study assignment.
