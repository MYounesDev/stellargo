**ACT AS:** Creative Director & Frontend Developer.

**TASK:** Integrate a "Presentation Mode" directly into the Next.js application created in the previous step.
**ROUTE:** `/presentation`

**REQUIREMENTS:**

1.  **The Engine:**
    * Build a slide-deck engine using React state and `framer-motion`.
    * **Navigation:** Arrow keys (Left/Right) support, Click to advance, and on-screen "Next/Prev" buttons.
    * **Transitions:** Slides should "slide in" or "fade scale" with high-quality easing.

2.  **Design Style:**
    * Fullscreen experience.
    * **Visuals:** Big typography, heavy use of the "Green/Cyber" theme, animated charts (use simple CSS or SVG animations for charts).
    * **Layout:** Split screens (Text Left / Image Right), Big Centered Statements.

3.  **Slide Content (Strictly Follow This Flow):**
    * **Slide 1 (Intro):** "StellarGo". Big bold text: "It's not a tool. It's a Platform." (Animated entrance).
    * **Slide 2 (The Problem):** "Crypto is Lonely." Show icons of isolated people on phones.
    * **Slide 3 (The Solution):** "We bring Crypto to the Streets." Icon: GPS Pin + Dollar Sign.
    * **Slide 4 (Why Stellar? - CRITICAL):**
        * Animate a comparison graph: "Ethereum Cost: $5.00" vs "Stellar Cost: $0.00001".
        * Text: "Speed: 3 Seconds Finality."
        * "Why we win: Micro-transactions are only possible here."
    * **Slide 5 (Business Model):**
        * "B2B: Companies drop tokens to drive foot traffic."
        * "Non-Profits: Event-based fundraising."
    * **Slide 6 (Tech Stack):** Next.js, Stellar, Soroban, MongoDB.
    * **Slide 7 (Demo & QR):** "Scan to Play". Button: "Launch Live Demo" (Links to `/`).

4.  **Implementation:**
    * Create a `PresentationLayout` component.
    * Use an array of objects for slide data to make it easy to edit text later.
    * Ensure animations trigger *every time* a slide changes (use `AnimatePresence`).

Please generate the code for the `/presentation/page.tsx` and the necessary components.