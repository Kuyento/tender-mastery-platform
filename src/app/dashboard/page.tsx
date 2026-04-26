/**
 * /dashboard — Learner dashboard.
 *
 * Protected: requires authentication (enforced by middleware).
 * Displays the learner's enrolled courses, progress, and certificates.
 */

export default function DashboardPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
      <p className="mt-4 text-muted-foreground">
        Welcome back! Here&apos;s an overview of your learning progress.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* TODO: Fetch and render enrolled courses with progress indicators */}
        {/* TODO: Fetch and render earned certificates */}
      </div>
    </main>
  );
}
