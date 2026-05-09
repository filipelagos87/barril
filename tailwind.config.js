/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Identidade Barril
        wood: '#3A2618',         // madeira escura (primária)
        gold: '#C9A227',          // dourado/cobre (acento)
        amber: '#D4811A',         // âmbar chopp (acento secundário)
        cream: '#F5E6C8',         // background creme
        ink: '#1A1410',           // background escuro
        bone: '#FFF8EC',          // branco quente
        // Aliases legacy (Hero/Cardapio/etc usam estes — refatorar depois)
        primary: '#3A2618',
        accent: '#C9A227',
        dark: '#1A1410',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bebas Neue', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'wood-grain': "url('/images/textures/wood.svg')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
