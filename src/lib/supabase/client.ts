/**
 * Supabase browser client helper.
 *
 * Use this in Client Components (files with 'use client') where you need to
 * interact with Supabase from the browser — e.g. reading auth state or
 * performing real-time subscriptions.
 *
 * Do NOT use this in Server Components, Route Handlers, or Server Actions.
 * Use the server client from `@/lib/supabase/server` for those contexts.
 */

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
