# Nashers Đồng Chill 2026

This website introduces and stores content for the company trip / team trip named "Nashers Đồng Chill" with the theme "Season 2: La Cà Lô Cồ".

This project is an interactive static landing page focused on conveying the travel experience, itinerary, destination map, hotels, and group activities during the trip in Da Nang.

## Project overview

- Project name: nashers-dong-chill-v2.github.io
- Scope: static website, no complex framework or build dependencies required
- Goal: create a visually appealing and shareable portal for an event / company journey
- Main design: optimized for desktop and mobile, with motion effects, glassmorphism styling, and vibrant colors that reflect travel and summer vibes

## Main features

- Home page introducing the trip theme and atmosphere
- Journey page presenting a storytelling experience by milestone
- Agenda page displaying the schedule by day / time period
- Map page summarizing locations and experiences, helping users visualize routes and activity areas
- Hotel map page allowing users to view hotel listings, locations on the map, images, detailed information, and Google Street View
- Background music integration with rhythmic ambient sound to enhance the experience
- On-screen interactivity, hover effects, scroll-based animations, modals, and panels

## Main file structure

```text
.
├── index.html                 # Main landing page
├── journey.html               # Interactive journey page
├── agenda.html                # Event schedule page
├── experience-map.html        # Experience / location map page
├── hotel-map.html             # Hotel map page with Street View and accommodation details
├── music/
│   └── summer-music.js        # Background music / sound logic
├── image/                     # Supporting images for design and content
├── README.md                  # Project documentation
└── .gitignore                 # (if present) or auxiliary project files
```

## Technologies used

- HTML5
- CSS3
- Vanilla JavaScript
- Tailwind CSS CDN
- GSAP + ScrollTrigger for scroll-based animations
- Leaflet for interactive maps
- Google Fonts and Material Symbols
- Google Street View embed / geographic links

## Notable UI features

- Glassmorphism: transparent cards, pills, and panels with blur effects
- Modern layout with blue, warm yellow, orange, and green gradients
- Animations on scroll and hover interactions
- Interactive map with markers and pop-up information
- Background music toggle button with visual and sound effects
- Responsive design optimized for mobile and tablet devices

## Page descriptions

### 1) index.html
This is the main landing page of the project and serves as the “front door” of the experience. It focuses on the travel concept, emotions, overall summary, and the highlights of Season 2.

### 2) journey.html
This page continues the trip narrative and tells the story across different journey stages using scroll-based storytelling. It contains the most animation-heavy experience in the project.

### 3) agenda.html
This page shows the itinerary by time, helping viewers understand the events and activities for each day or milestone of the trip.

### 4) experience-map.html
This page provides a geographic view so users can understand the locations and destinations the group experienced.

### 5) hotel-map.html
This is the hotel/travel accommodation page with the following features:

- Hotel list
- Location map
- Region selection or point selection mode
- Supporting images
- Ratings / highlights / amenities
- Direct Google Street View access

### 6) music/summer-music.js
This JavaScript file controls the background music and generates rhythmic ambient sound to support the user experience.

## How to run the project

Since this is a static website, you do not need npm install or a build tool.

### Option 1: open directly
- Open index.html in the browser
- Or open any HTML file directly depending on your purpose

### Option 2: run a local server
From the project root directory:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
```

## Development notes

- This is a static page project, so most UI changes are done by editing HTML, CSS, and JavaScript files directly.
- If you need to add images, save them in the image/ folder for easy management.
- If you need to update the background music, work in the music/summer-music.js file.
- If you need to add new maps, markers, or hotels, update the hotel-map.html file and the related data structures.

## Design goals

This website is not just a simple introduction page; it is a storytelling product that combines trip planning, locations, schedule, images, emotions, and travel atmosphere into one coherent experience. It uses a modern, vibrant style that is easy to share with the community or invited guests.

## Notes

The project is being developed as a static web experience and is well suited for:

- Team trip / company trip
- Event landing page
- Travel memory website
- Personal portfolio / travel story

## Author

- Thai Phung
- 2026
