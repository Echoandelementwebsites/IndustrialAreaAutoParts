import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.browser.core.windows.net https://*.clerk.accounts.dev https://challenges.cloudflare.com https://va.vercel-scripts.com https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    connect-src 'self' https://*.clerk.accounts.dev https://clerk.browser.core.windows.net https://api.clerk.dev https://vitals.vercel-insights.com https://api.cloudinary.com;
`;

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Allows all paths (transformations, folders, etc.)
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
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
