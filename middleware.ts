import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes (like /signin and /signup)
const isPublicRoute = createRouteMatcher(['/signin(.*)', '/signup(.*)']);

export default clerkMiddleware((auth, req) => {
  // Allow public routes without protection
  console.log(req.url);
  if (isPublicRoute(req)) {
    return; // Skip protecting public routes
  }

  // Protect non-public routes
  auth().protect();
});

export const config = {
  matcher: [
    // Protect all routes except for the public routes defined inside the middleware logic
    '/((?!_next/static|_next/image|favicon.ico|static).*)',
    '/(api|trpc)(.*)', // Always run for API routes
  ],
};
