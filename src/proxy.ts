/**
 * Next.js Proxy (formerly Middleware) for session management and route protection.
 *
 * Responsibilities:
 *  1. Refresh the Supabase Auth session on every request so that Server
 *     Components always receive a valid, up-to-date session cookie.
 *  2. Protect authenticated-only routes by redirecting unauthenticated users
 *     to the login page.
 *  3. Protect the /admin route behind a role check.
 *
 * Route protection summary:
 *  - Public (no auth required):
 *      /                  — marketing / home page
 *      /courses           — course listing
 *      /api/webhooks/*    — Stripe webhook endpoint (verified by Stripe signature)
 *
 *  - Authenticated (any signed-in user):
 *      /dashboard         — learner dashboard
 *      /courses/[slug]/modules/* — module and lesson pages
 *
 *  - Admin only:
 *      /admin             — admin panel
 *
 * TODO (Step 3): Add free-preview lesson exemptions once the lessons schema
 * and `is_preview` flag are in place. Preview lessons inside
 * /courses/[slug]/modules/[moduleSlug]/lessons/[lessonSlug] should be
 * accessible without authentication when `is_preview` is true.
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Initialise a Supabase client that can read/write cookies on the response.
  // This is required to keep the session alive across server-side requests.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write updated cookies back to both the request and the response so
          // that downstream Server Components see the refreshed session.
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Do not add any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ── Admin route protection ────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (!user) {
      // Not signed in — redirect to login.
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // TODO (Step 2): Once the `profiles` table exists, fetch the user's role
    // from Supabase and verify it equals 'admin'. If not, redirect to /dashboard
    // or return a 403 Forbidden response. Example:
    //
    //   const { data: profile } = await supabase
    //     .from('profiles')
    //     .select('role')
    //     .eq('id', user.id)
    //     .single()
    //
    //   if (profile?.role !== 'admin') {
    //     return NextResponse.redirect(new URL('/dashboard', request.url))
    //   }

    return supabaseResponse;
  }

  // ── Authenticated-only routes ─────────────────────────────────────────────
  const requiresAuth =
    pathname.startsWith("/dashboard") ||
    // Protect all module and lesson pages under a course slug.
    // Public course overview pages (/courses/[slug]) remain accessible.
    Boolean(pathname.match(/^\/courses\/[^/]+\/modules/));

  if (requiresAuth && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Return the response with refreshed session cookies attached.
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     *  - _next/static  (static files)
     *  - _next/image   (image optimisation)
     *  - favicon.ico, sitemap.xml, robots.txt (metadata files)
     *
     * This ensures the proxy runs on every page and API route so that
     * session cookies are always refreshed, while skipping static assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
