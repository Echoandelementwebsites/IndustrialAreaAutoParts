// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  env: {
    // Provide a fallback for Cloudinary Cloud Name during build if not present
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo",
    // Also provide fallback for Upload Preset just in case
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.browser.core.windows.net https://*.clerk.accounts.dev https://challenges.cloudflare.com https://va.vercel-scripts.com https://cdn.jsdelivr.net https://upload-widget.cloudinary.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' blob: data: https:; " +
              "font-src 'self'; " +
              "object-src 'none'; " +
              "base-uri 'self'; " +
              "form-action 'self'; " +
              "frame-ancestors 'none'; " +
              "block-all-mixed-content; " +
              "upgrade-insecure-requests; " +
              "connect-src 'self' https://*.clerk.accounts.dev https://clerk.browser.core.windows.net https://api.clerk.dev https://vitals.vercel-insights.com https://api.cloudinary.com https://upload-widget.cloudinary.com;",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
