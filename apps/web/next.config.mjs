import os from "node:os";

function resolveAllowedDevOrigins() {
  const allowed = new Set(["localhost", "127.0.0.1"]);

  for (const value of (process.env.NEXT_ALLOWED_DEV_ORIGINS ?? "").split(",")) {
    const origin = value.trim();
    if (origin) allowed.add(origin);
  }

  for (const entries of Object.values(os.networkInterfaces())) {
    for (const entry of entries ?? []) {
      if (entry.internal || entry.family !== "IPv4") continue;
      allowed.add(entry.address);
    }
  }

  return [...allowed];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  allowedDevOrigins: resolveAllowedDevOrigins(),
  experimental: {
    externalDir: true
  },
  transpilePackages: ["@nebula/protocol", "@nebula/physics"]
};

export default nextConfig;
