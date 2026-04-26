/**
 * /login — Authentication page.
 *
 * Publicly accessible. Handles sign-in and sign-up via Supabase Auth.
 * After successful authentication, users are redirected to the `redirectTo`
 * query parameter (if present) or to /dashboard by default.
 */

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Sign in to Tender Mastery
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to sign in or create an account.
          </p>
        </div>
        {/* TODO: Implement Supabase Auth sign-in form (magic link / email+password) */}
      </div>
    </main>
  );
}
