/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    fontFamily: { sans: ['Inter', 'sans-serif'], display: ['Space Grotesk', 'sans-serif'], mono: ['DM Mono', 'monospace'] },
    colors: { ink: '#080b14', panel: '#101625', electric: '#648cff', violet: '#a78bfa', cyan: '#67e8f9' },
    boxShadow: { glow: '0 0 60px rgba(100,140,255,.16)' }
  }},
  plugins: []
}
