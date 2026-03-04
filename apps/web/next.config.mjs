/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    externalDir: true
  },
  transpilePackages: ["@nebula/protocol", "@nebula/physics"]
};

export default nextConfig;
