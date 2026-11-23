# lovely-carousel

<div align="center">

# 🌸 Lovely Carousel — Romantic Liquid Glass Music Experience

An aesthetic, mobile-first liquid-glass music player web application crafted with Next.js 14, Framer Motion, Tailwind CSS, and HTML5 Web Audio.

![Romantic Liquid Glass Player](public/images/wallpaper.png)

</div>

---

## ✨ Features

- 💖 **3D Liquid-Glass Heart Loading Screen:**
  - Introductory romantic screen featuring a 3D animated beating heart with perspective depth, radial specular reflections, glowing progress bar, and floating rose petals.
  - Displays the heartfelt poetic quote:
    > *“ke itna ameer toh nhi ki teri sari khawais poori kar saku, par maage tu toh waqt sara tere naam krdu”*  
    > **- sagar ♡**
  - **Shared Layout Animation (`layoutId`):** When loading completes, the quote smoothly glides across the screen and lands beneath the active track.

- 💿 **Liquid Glass Album Artwork & Transitions:**
  - Glossy, specular liquid-glass album sleeve with dark vignette typography.
  - Directional slide animations (left-to-right / right-to-left) with touch & drag gesture support.
  - Background image preloading for zero-lag track switching.

- 🎛️ **Full Playback Controls:**
  - 5-button circular glass control dock (Shuffle, Previous, Play/Pause with glowing hot-pink neon halo ring, Next, Repeat).
  - Smooth interactive scrubber with live elapsed and total duration timestamps.

- 🎵 **Floating "Next Song" Pill & Song Drawer:**
  - Compact glass card previewing the upcoming song with instant "Play Next" action.
  - Slide-up full song archive drawer with virtualized rendering for 60fps scrolling.

- ⚡ **Production-Grade Mobile Optimizations:**
  - **Fine-Grained State Selectors:** Audio `timeupdate` only updates the progress bar, keeping the main page and components idle during playback.
  - **Hardware GPU Compositing:** CSS `transform-gpu`, `will-change-transform`, and `contain: paint` prevent CPU layout recalculations.
  - **Next.js Image Pipeline:** Modern AVIF/WebP responsive formats and immutable caching headers.
  - **Dynamic Code-Splitting:** Modal drawer is loaded lazily on demand.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or later
- pnpm (recommended), npm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sagarsajwan26/lovely-carousel.git

# Navigate to project directory
cd lovely-carousel

# Install dependencies
pnpm install
```

### Running Locally

```bash
# Start development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the player.

### Production Build

```bash
# Build for production
pnpm run build

# Start production server
pnpm start
```

---

## 📜 License

Created with ♡ by [Sagar Sajwan](https://github.com/sagarsajwan26).
