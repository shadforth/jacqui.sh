import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@vercel/analytics'],
  },
  async redirects() {
    return [
      {
        source: '/writing/an-elaborate-prank-pigeons-the-life-of-a-showbird',
        destination: '/writing/pigeons',
        permanent: true,
      },
      {
        source: '/writing/book-review-pragmatic-thinking-and-learning',
        destination: '/writing/pragmatic-thinking-and-learning',
        permanent: true,
      },
      {
        source: '/writing/creative-writing-cooking-with-radio-waves',
        destination: '/writing/cooking-with-radio-waves',
        permanent: true,
      },
      {
        source: '/writing/creative-writing-mum',
        destination: '/writing/mum',
        permanent: true,
      },
      {
        source: '/writing/lessons-from-learning-a-programming-language-on-the-job',
        destination: '/writing/learning-a-language-on-the-job',
        permanent: true,
      },
      {
        source: '/writing/software-engineering-most-undervalued-skill',
        destination: '/writing/undervalued-skill',
        permanent: true,
      },
      {
        source: '/writing/unit-testing-logs-in-kotlin',
        destination: '/writing/testing-logs-in-kotlin',
        permanent: true,
      },
      {
        source: '/writing/what-planes-teach-us-about-design',
        destination: '/writing/planes-and-design',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
