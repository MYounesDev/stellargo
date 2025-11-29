**ACT AS:** Lead Senior Frontend Engineer & UX/UI Designer specialized in Web3/Stellar applications.

**TASK:** Perform a complete rewrite and redesign of the existing Next.js Stellar Hackathon project.
**GOAL:** Create a production-ready, highly animated, visually stunning "Location-Based SocialFi Platform" named "StellarGo".

**CRITICAL INSTRUCTION:**
1.  **DELETE** all existing styles and layout components. We are starting fresh.
2.  **THEME:** Use a "Modern Eco-Cyber" aesthetic.
    * **Colors:** Deep Emerald Greens, Neon Light Greens, Dark Greys/Blacks (for contrast).
    * **Backgrounds:** NO plain white backgrounds. Use subtle gradients, mesh gradients, or abstract geometric patterns with lighting effects.
    * **Mode:** Dark mode by default (looks more premium for crypto), with high-contrast text.
3.  **RESPONSIVENESS (Strict):**
    * **Desktop:** Professional Glassmorphism Top Navbar.
    * **Mobile:** App-like Bottom Navigation Bar (Fixed position, with icons).
    * **Transitions:** Smooth page transitions using `framer-motion`.

**NEW FEATURE REQUIREMENTS & PAGES:**

1.  **Landing Page (Home - `/`):**
    * Must be separate from the main app dashboard.
    * **Hero Section:** High-impact text, 3D-style illustration or abstract green glowing orb, "Launch App" button.
    * **Content:** Explain "Why Stellar?" (Speed, Cost), "Who is it for?" (Companies, Friends, Non-profits).
    * **Footer:** Links to GitHub, LinkedIn, Terms.

2.  **Onboarding Flow (First Time Login):**
    * If a wallet connects for the first time, show a Modal/Page: "Who are you?"
    * **Options:** Individual (Personal Use), Company (Customer Loyalty), Non-Profit (Charity Drops).
    * Save this to the database (MongoDB).

3.  **Dashboard (The Map - `/app`):**
    * Full-screen map integration (Leaflet or Mapbox).
    * Show "Drops" as glowing green pins.
    * Sidebar (Desktop) / Drawer (Mobile) to manage filters.

4.  **New Transfer Hub (`/transfer`):**
    * **Tab 1: Direct Transfer:** Input Wallet Address -> Send XLM.
    * **Tab 2: Geo-Drop (The Killer Feature):**
        * Select Location (Current GPS or Pick on Map).
        * **Settings:** Amount, Message, *Target Audience* (e.g., "Only for my friends" or "Public"), *Expiration Time*.
    * **UX:** Use a stepper for the Drop creation (Step 1: Location -> Step 2: Details -> Step 3: Sign).

5.  **Transactions History (`/history`):**
    * Visual difference between "Direct Sent" and "Drop Claimed".
    * List who claimed your drops.

6.  **Leaderboard (`/leaderboard`):**
    * "Top Droppers" and "Top Hunters". Gamification elements.

7.  **Wallet Connection:**
    * Do NOT just use a raw browser alert.
    * Create a custom UI Component `WalletConnectModal`.
    * It should explain "Connect to Stellar" and gracefully handle the `@stellar/freighter-api` connection. If the extension is missing, show a beautiful "Install Wallet" guide instead of breaking.

**TECH STACK:**
* **Framework:** Next.js 14+ (App Router).
* **Styling:** Tailwind CSS + `framer-motion` (for all micro-interactions, hover states, page loads).
* **Icons:** `lucide-react`.

**DELIVERABLES:**
1.  **Refactored Folder Structure:** `src/app`, `src/components` (Atoms, Molecules), `src/hooks`.
2.  **Global `layout.tsx`:** Handling the responsive Navbars and Theme Provider.
3.  **Components:** Reusable Cards, Buttons, Inputs with consistent spacing/radius.
4.  **Docs:** DELETE old MD files. Create:
    * `INSTALL.md`: How to install dependencies.
    * `RUN.md`: How to run dev server.
    * `DEPLOY.md`: How to deploy to Vercel + Stellar Testnet info.
    * `README.md`: The main project overview.

**DESIGN SYSTEM TOKENS:**
* Primary: `#10B981` (Emerald-500)
* Secondary: `#064E3B` (Emerald-900)
* Accent: `#34D399` (Emerald-400)
* Background: `#020617` (Slate-950) with radial gradients.

Start by defining the file structure and the main `layout.tsx` with the responsive navigation logic.