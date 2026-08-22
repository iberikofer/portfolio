# 👨‍💻 Yaroslav Sych — Developer Portfolio

A modern, high-performance personal portfolio website built with **React 19**, **TypeScript**, **Vite**, and **SCSS Modules**. Designed with a futuristic dark neon aesthetic, real-time Canvas wave physics, smooth animations, auto-expanding form controls, and responsive layouts tailored for all screen sizes from 320px mobile devices to 4K displays.

---

## ✨ Features

- **⚡ Blazing Fast Performance:** Powered by Vite 7 with `@vitejs/plugin-react-swc` for instant HMR and optimized production builds.
- **🎨 Modern Cyberpunk UI:** Custom glassmorphism dark theme with neon mint accents (`#64ffbc`), smooth gradients, and non-intrusive ambient background lighting.
- **🌊 Dynamic Real-time Canvas Wave Divider:** Real-time 4-layer harmonic neon wave ribbons synthesized on HTML5 Canvas. Features dynamic crest/trough morphing and `IntersectionObserver` auto-pausing for 0% CPU consumption during scrolling.
- **✍️ React Typewriter Logo:** A cross-browser, slice-free React typewriter animation in the header (`Yaroslav Sych |`) with a synchronized blinking cursor.
- **📜 Scroll Progress Tracking:** Real-time progress bar reflecting reading depth across the page.
- **💼 Project Showcase Grid:** Dynamic project cards featuring tech tags, project descriptions, live GitHub links, and GitHub Pages links.
- **✉️ Interactive Contact Form:** Integrated with **EmailJS** for direct inbox message delivery, featuring:
  - Auto-expanding/shrinking `textarea` with smooth height transitions.
  - Custom scrollbar overflow handling for extra-long messages.
- **📱 Ultra-Responsive Layout:** Carefully tuned breakpoints (`320px`, `360px`, `425px`, `480px`, `768px`, `1024px`) ensuring seamless experience on all mobile, tablet, and desktop viewports.
- **⚡ Eager Scroll State Sync:** Zero layout shift or header styling flash when reloading the page mid-scroll.

---

## 🛠️ Tech Stack

| Domain                   | Technologies                                                                  |
| ------------------------ | ----------------------------------------------------------------------------- |
| **Core Framework**       | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Build Tooling**        | [Vite 7](https://vitejs.dev/), SWC Compiler                                   |
| **Styling & Graphics**   | SCSS Modules, CSS Variables, HTML5 Canvas 2D API, Flexbox/Grid                |
| **Form & Emailing**      | [EmailJS Browser SDK](https://www.emailjs.com/)                               |
| **Linting & Formatting** | ESLint 9, [Prettier 3](https://prettier.io/), React Hooks Plugin              |

---

## 📂 Project Structure

```text
portfolio/
├── .github/               # GitHub Actions workflows & Dependabot
├── public/                # Static assets (CV PDF, favicon, icons)
├── src/
│   ├── assets/            # Project images and screenshots
│   ├── components/        # Reusable UI components (ScrollToTop, WaveDivider, etc.)
│   ├── data/              # Application data (profile, skills, projects list)
│   ├── sections/          # Page sections (Header, Hero, About, Projects, Contact, Footer)
│   ├── styles/            # SCSS variables, mixins, global resets
│   ├── App.tsx            # Root Application Component
│   ├── main.tsx           # Application Entry Point
│   └── vite-env.d.ts      # TypeScript environment & asset declarations
├── .prettierrc            # Prettier code formatting rules
├── .prettierignore        # Prettier ignore patterns
├── eslint.config.js       # ESLint 9 flat configuration
├── package.json           # Scripts and dependencies
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite build settings
```

---

## 🚦 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/iberikofer/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/portfolio/`.

---

## 🛠️ Available Scripts

In the project directory, you can run:

- `npm run dev` — Starts the Vite development server with Hot Module Replacement.
- `npm run build` — Compiles TypeScript and builds the production-ready assets in the `dist` directory.
- `npm run preview` — Locally previews the production build.
- `npm run lint` — Runs ESLint to check for code issues.
- `npm run format` — Formats all codebase files with Prettier.
- `npm run format:check` — Verifies code formatting across the repository.

---

## 📄 License

This project is open-source and available under the MIT License.
