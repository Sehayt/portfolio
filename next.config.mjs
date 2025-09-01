/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // Disable image optimization since it requires a server
  experimental: {
    esmExternals: true
  },
  reactStrictMode: true,
  eslint: {
    // We run eslint in GitHub actions
    ignoreDuringBuilds: true
  },
  typescript: {
    // We run type checking in GitHub actions
    ignoreBuildErrors: true
  },
  compiler: {
    // For easier debugging of client components
    removeConsole: {
      exclude: ['error', 'warn', 'info', 'debug', 'log']
    }
  },
  transpilePackages: [
    "lucide-react"
  ]
};

export default nextConfig;
