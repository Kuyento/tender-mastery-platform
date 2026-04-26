/**
 * Supabase server client helper.
 *
 * Use this in Server Components, Route Handlers, and Server Actions where you
 * need to interact with Supabase on the server side.
 *
 * This client reads and writes cookies via Next.js's `cookies()` API so that
 * the user's session is correctly propagated across server-side requests.
 *
 * Do NOT use this in Client Components — use `@/lib/supabase/client` instead.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method is called from a Server Component.
            // This can be safely ignored if you have middleware refreshing
            // user sessions — which this project does via `middleware.ts`.
          }
        },
      },
    },
  );
}
