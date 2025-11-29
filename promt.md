We need to completely **redesign and expand** our current Next.js + Tailwind CSS hackathon project ("StellarGo"). The current state is too basic. We need to transform it into a high-end, modern "Location-Based Platform".

### 1. Design System & UX Overhaul
* **Theme:** "Neo-Fintech". Use a clean, trustworthy palette (Stellar purples/blues mixed with slate grays and ample whitespace). High-end glassmorphism effects for cards.
* **Responsiveness:** Mobile-First approach is critical.
    * **Desktop:** Professional Sidebar navigation.
    * **Mobile:** App-like Bottom Navigation Bar.
* **Animations:** Use `framer-motion` for smooth page transitions and interactive elements (buttons, modals).

### 2. Wallet & Auth Strategy (CRITICAL CHANGE)
* **Hybrid Connection:** Instead of relying on the Freighter extension (which breaks demos if not installed), implement a **"Wallet Adapter"** component.
    * **Option A (Real):** Connect via Freighter.
    * **Option B (Demo/Mock):** A "Demo Login" button that simulates a connected wallet with a fake address and balance. This is crucial for the judges to test the UI without installing extensions.
	* **Option B (Real):** Use stellar Soroban Next.js Auth components to signin with Wallet**.
* **Onboarding Flow:** When a user connects for the first time, show a "Persona Selection" screen:
    * *Individual:* (Friends & Family)
    * *Business:* (Targeting Customers)
    * *Non-Profit:* (Education/Charity)
	* *Other*
    * This selection should be stored in the user context/state.

### 3. Required Pages & Features (Redesign All)

**A. Landing Page (Home - Public)**
* **Hero Section:** High-energy, explaining the "Geo-Drop" concept. "Don't just hold crypto, find it."
* **Value Prop:** Explain use cases for the 3 personas (Business, Person, NGO).
* **Why Stellar?:** A section dedicated to why this is built on Stellar (Speed, Low Fees).
* **Leaderboard Preview:** Show top droppers.
* **Footer:** Links to GitHub, LinkedIn, and Socials.
* **Q&A Floating Action Button:** A distinct, pulsing/animated button (bottom right) that opens a Q&A modal/page.

**B. Dashboard (Private)**
* Overview of balance, active drops, and recent activity charts (Chart.js).

**C. New Transfer Hub (The Core)**
Split this page into two distinct tabs/modes:
1.  **Direct Transfer:** Input Wallet Address + Amount + Memo.
2.  **Geo-Drop (Map Based):**
    * Open full-screen map to select location (or use current GPS).
    * **Detailed Preferences:**
        * Amount to drop.
        * Target Audience (e.g., "Anyone", "Verified Humans", "Customers").
        * Expiration Time (e.g., "24 Hours").
        * Message/Hint.
		* Hide it on the map ?, Who can view it on the Map.

**D. Map Explorer**
* A full-screen, Pokémon GO style map showing available drops nearby.
* Different markers for different drop types (Business promo vs. Friendly gift).

**E. Transactions History**
* A detailed table showing:
    * Direct Transfers (Sent/Received).
    * Drops Placed (Claimed/Unclaimed).
    * Drops Collected.

**F. Profile & Settings**
* Edit Username, Avatar, and View "User Type" (Persona).

**G. Reacords**
* A page shows who is the most presones that Droped and Collected on the App

### 4. Documentation (Overwrite existing MD files)
Please delete old documentation and generate **4 separate markdown files** with professional content:
1.  `INSTALL.md`: Step-by-step setup (npm install, env variables).
2.  `RUN.md`: How to run locally and use the "Demo Mode".
3.  `DEPLOY.md`: Instructions for Vercel/Netlify deployment and Stellar Testnet funding.
4.  `README.md`: The main project face. Professional introduction, features list, tech stack, and "Why Stellar" explanation.

### Execution Plan
Please generate the code for the **Layouts (Sidebar/BottomNav)**, the **Wallet Context (with Demo mode)**, and the **New Transfer Page** first, as these are the most complex. Then provide the updated **Landing Page**.