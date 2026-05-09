/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    // Static export não suporta o otimizador de imagens server-side.
    // As imagens são servidas direto do public/.
    unoptimized: true,
  },
}

module.exports = nextConfig
