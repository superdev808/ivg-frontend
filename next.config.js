/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental:{appDir: true},
    // output: 'export',
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
        {
          protocol: "http",
          hostname: "**",
        },
      ],
  },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
      eslint: {
        ignoreDuringBuilds: true,
    },
    trailingSlash: true


}

module.exports = nextConfig
