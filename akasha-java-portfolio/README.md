# Akasha G R — Java Full Stack Developer Portfolio

A modern, high-performance developer portfolio built with React 18, Vite, Tailwind CSS, Framer Motion, Three.js (React Three Fiber & Drei), and Lucide icons.

## Features & Enhancements

- **Optimized Bundle Splitting:** Lazy-loaded Three.js 3D hero scene with graceful pure-CSS fallback, reducing initial load bundle by over 97% (~33 kB initial JS).
- **Interactive Contact Form:** Supports Formspree ID (`VITE_FORMSPREE_ID`), custom API endpoints (`VITE_CONTACT_ENDPOINT`), or automatic fallback to pre-filled `mailto:` client. Includes loading, error, and sent reset states.
- **1-Click Copy-to-Clipboard:** Quick copy pills with visual feedback for both professional email and phone number.
- **Enhanced Project Cards:** Action buttons for repository code and live demos, support for real application screenshots with fallbacks to stylized mockups.
- **ATS Resume Download:** Instant download link pointing to verified PDF at `public/Akasha_GR_Resume.pdf`.

## Run Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Structure

```text
src/
  components/
    Scene.jsx
    SectionHeading.jsx
  App.jsx
  data.js
  main.jsx
  styles.css
public/
  Akasha_GR_Resume.pdf
```
