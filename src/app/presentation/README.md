# StellarGo Interactive Presentation

An immersive, web-based pitch deck for StellarGo with rich animations and interactive features.

## Features

### 🎯 Navigation
- **Keyboard**: Use `←` and `→` arrow keys to navigate between slides
- **Mouse**: Click on the right side of the screen to go forward, left side to go back
- **Right-Click**: Goes to the previous slide
- **Touch**: Swipe left/right on mobile devices
- **On-Screen Controls**: Navigation buttons and slide indicators at the bottom

### 🌍 Language Toggle (WOW Factor)
To enable the Turkish language feature:
1. Add to your `.env.local`:
   ```
   NEXT_PUBLIC_TURKISH=true
   ```
2. When enabled, **scroll up or down** with your mouse wheel to toggle between English and Turkish
3. Turkish text appears with a distinct golden/amber styling
4. Smooth flip animation during language switches

### 🖥️ Fullscreen Mode
- Click the "Start Presentation" button on the first slide to enter fullscreen
- Press `ESC` to exit fullscreen
- Fullscreen button available in top-left corner if not in fullscreen mode

### 🎨 Slide Themes
Each slide has a unique visual theme:
- **Dark**: Problem slide with dark, gloomy atmosphere
- **Bright**: Solution slide with neon green highlights
- **Space**: Stellar/Why Stellar slides with animated stars
- **Gradient**: Business model and tech stack with colorful gradients

## Slide Content

1. **Intro**: StellarGo title with animated rocket emoji
2. **Problem**: The current state of crypto - fragmented and isolated
3. **Solution**: Geo-Drop concept - "Pokémon GO meets DeFi"
4. **Why Stellar**: Fee comparison showing Stellar's advantage
5. **Business Model**: Use cases for Person, Business, and Non-Profit
6. **User Journeys**: Detailed flows for different user types
7. **Smart Contracts**: Soroban implementation details
8. **Tech Stack**: All technologies used in the platform
9. **Demo & CTA**: QR code placeholder and links to GitHub/LinkedIn

## Usage

1. Navigate to `/presentation` in your browser
2. Click "Start Presentation" to begin in fullscreen
3. Use keyboard, mouse, or on-screen controls to navigate
4. Scroll to toggle language (if enabled)

## Customization

### Update Links
Edit the demo slide (last slide) to add your actual:
- GitHub repository URL
- LinkedIn profile URL
- Live demo URL

### Add QR Code
Replace the placeholder emoji (📱) in the demo slide with an actual QR code image:
```tsx
<img src="/qr-code.png" alt="Demo QR Code" className="w-64 h-64" />
```

### Modify Content
All slide content is defined in the `slides` array. Each slide has:
- `en`: English content (required)
- `tr`: Turkish content (optional)
- `background`: CSS gradient for the slide background
- `theme`: Visual theme type

## Tech Stack

- **Next.js 14**: React framework with App Router
- **Framer Motion**: Advanced animations and transitions
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **TypeScript**: Type safety

## Performance

- Client-side only (uses `'use client'`)
- Smooth 60fps animations
- Optimized transitions with Framer Motion
- Responsive design for all screen sizes

## Tips for Presenting

1. Start in fullscreen for the best experience
2. Practice navigation beforehand
3. If using Turkish toggle, demonstrate it early to impress judges
4. Pause on key slides (Why Stellar, Business Model) to let information sink in
5. Use the slide indicators to jump to specific sections during Q&A

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Touch navigation works

## Troubleshooting

**Fullscreen not working?**
- Some browsers require user interaction before allowing fullscreen
- Make sure you clicked the "Start Presentation" button

**Language toggle not showing?**
- Check that `NEXT_PUBLIC_TURKISH=true` is in your `.env.local`
- Restart your dev server after adding environment variables

**Animations stuttering?**
- Close other browser tabs/applications
- Check if hardware acceleration is enabled in your browser
- Try Chrome for best performance

---

Made with 💚 for Stellar

