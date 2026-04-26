/**
 * /admin — Admin panel.
 *
 * Protected: requires authentication AND admin role (enforced by middleware).
 *
 * TODO (Step 2): Once the `profiles` table exists, the middleware will perform
 * a role check (role = 'admin') before allowing access to this route.
 * Until then, the route is protected by authentication only.
 */

export default function AdminPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
      <p className="mt-4 text-muted-foreground">
        Manage courses, modules, lessons, users, and platform settings.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* TODO: Render admin dashboard cards — courses, users, revenue, certificates */}
      </div>
    </main>
  );
}
