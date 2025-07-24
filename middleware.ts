// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/api/uploadthing(.*)',
  '/company/:companyId', // ✅ revisa si ese es el path real
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth();
  }
});

export const config = {
  matcher: [
    // Protege todas menos archivos estáticos
    '/((?!_next|.*\\..*).*)',
    // Siempre aplica para rutas API
    '/(api|trpc)(.*)',
  ],
};
