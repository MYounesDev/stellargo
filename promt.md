**Act as a Lead Frontend Architect and UI/UX Designer specialized in Web3.**

I need a complete overhaul of my existing Next.js (App Router) Stellar project ("StellarGo"). The current design is too basic/white. I need a high-end, futuristic, "Dark Mode" aesthetic with a **Green** primary color palette.

**1. GLOBAL DESIGN SYSTEM & THEME:**
* **Color Palette:** Deep blacks/grays for background, Neon Green (#00FF41 or similar) for primary actions, subtle gradients.
* **Background:** NEVER use a plain white or solid black background. Create a global wrapper with **animated, moving colored lights/blobs** (using CSS blurry gradients or Framer Motion) behind a glassmorphism layer. It should look alive.
* **Typography:** Modern sans-serif (Inter or Rajdhani). Large, bold headings.
* **Responsiveness:** * **Desktop:** Floating Glass Navbar at the TOP.
    * **Mobile:** Glass Tab Bar at the BOTTOM with smooth icons.
* **Animations:** Use `framer-motion` for page transitions, button hovers (glow effects), and scroll reveals.
* **Wallet Connection:** switch from raw `@stellar/freighter-api` to **`@creit.tech/stellar-wallets-kit`** (or similar kit) to provide a modern "Select Wallet" modal UI instead of just triggering the extension.

**2. USER FLOW & PAGES (Re-structure everything):**

* **A. Landing Page (Public Home):**
    * **Hero Section:** High-energy text ("Crypto on the Streets"), animated 3D-style elements.
    * **Value Prop:** Explain it's a "Platform" for Companies (marketing drops), Users (social), and Non-profits.
    * **Live Leaderboard:** "Most Active Droppers".
    * **Q&A Fab:** A floating, pulsing button for Q&A that opens a stylish overlay.
    * **Footer:** Links to GitHub/LinkedIn.
    * **Call to Action:** "Launch App" button (redirects to Dashboard).

* **B. Onboarding (First Login):**
    * After connecting wallet, ask: "Who are you?"
    * Options: Personal User, Company (Marketing), Non-Profit (Events).
    * Save this to MongoDB user profile.

* **C. Dashboard (Main App):**
    * Overview of balance, active drops, and recent activity.

* **D. Map View:**
    * Full-screen map (dark custom theme map style) showing nearby Drops.
    * Filter drops by type (Company promo, User gift, etc.).

* **E. New Transfer Page (The Core Feature):**
    * **Tab 1: Direct Transfer:** Input wallet address or select from recent contacts.
    * **Tab 2: Geo-Drop (The Star):** * Select location on map.
        * Input Amount & Message.
        * **Advanced Settings:** "Who can claim?" (Public, Friends Only), "Expiry Date", "Target Audience" (e.g., 'Only for students' - mock logic).

* **F. Transaction History:**
    * Two distinct lists: "Direct Transfers" and "Geo-Claims".

* **G. Profile:**
    * Edit username, bio, view badges (e.g., "Top Dropper").

**3. TECHNICAL TASKS:**
* **Clean Code:** Modularize components (Cards, Modals, Buttons).
* **Theme Config:** Create a `theme.config.ts` exporting color tokens and radius settings.
* **Documentation:** DELETE all old `.md` files. Create 4 new ones:
    1.  `INSTALL.md`: Setup instructions.
    2.  `RUN.md`: Dev server & build.
    3.  `DEPLOY.md`: Vercel + Stellar Network deployment steps.
    4.  `README.md`: The main professional project brief.

**Deliverables:**
* Analyze existing code.
* Propose the new folder structure.
* Provide the code for the new `Layout`, `Theme`, `WalletModal`, and the `Onboarding` flow first.
* Ensure the design is "Hackathon Winner" quality—visually stunning, not generic.