import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// Simple in-memory rate limiter (per instance)
const rateLimit = new Map();

export default clerkMiddleware(async (auth, req) => {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const limit = 100; // requests per minute
  const windowMs = 60 * 1000;

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 0, startTime: Date.now() });
  }

  const current = rateLimit.get(ip);
  if (Date.now() - current.startTime > windowMs) {
    current.count = 0;
    current.startTime = Date.now();
  }

  current.count++;

  if (current.count > limit) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
