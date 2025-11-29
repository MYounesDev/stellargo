**Act as a Creative Developer and Storyteller.**

I want to build my Hackathon Presentation **directly inside my Next.js app** as a web page, instead of using PowerPoint.
Create a new route: `/src/app/presentation/page.tsx`.

**1. PRESENTATION ENGINE:**
* It should behave like a slide deck.
* **Navigation:** Arrow keys (Left/Right) and on-screen "Next/Prev" buttons.
* **Layout:** Full screen, immersive, distinct from the main app layout (hide the standard navbar).
* **Animations:** Use `framer-motion`. Slides should slide in/out or fade smoothly. Text should stagger in.

**2. CONTENT & SLIDES (English Language):**
Based on the project notes, create the following slides with rich visuals (mock graphs, icons, big typography):

* **Slide 1: Title & Hook:** "StellarGo: Not just a tool. A Platform." (Animated background).
* **Slide 2: The Problem:** "Crypto is lonely. It's stuck on screens." (Visual: A sad/boring wallet interface).
* **Slide 3: The Solution (Geo-Drop):** "We bring Crypto to the Streets." (Visual: Map icon with a glowing drop).
* **Slide 4: Why Stellar? (Crucial):** * Graph showing Cost comparison: Ethereum ($5.00) vs Stellar ($0.00001).
    * Text: "Gamification requires Speed (3s) and Low Cost. Only Stellar makes this business model viable."
* **Slide 5: Business Model & Validation:**
    * Market Position: "Location-Based SocialFi".
    * Use Case: "Starbucks drops tokens in-store to drive foot traffic."
* **Slide 6: Smart Contracts:** Briefly explain the Soroban logic (Lat/Long verification).
* **Slide 7: Tech Stack:** Next.js + Tailwind + Soroban + Freighter + MongoDB.
* **Slide 8: Demo & QR:** Large QR Code to open the app on mobile.

**3. DESIGN STYLE:**
* Use the same "Dark/Neon Green" aesthetic as the main app but even bolder.
* Include a "Presenter Mode" feature: A small toggle to show speaker notes (optional).

**Task:**
Write the code for this Presentation component. Use an array of objects for the slide data so I can easily edit the text later. Ensure the `AnimatePresence` is used for smooth slide transitions.