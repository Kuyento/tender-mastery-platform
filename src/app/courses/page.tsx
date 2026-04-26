/**
 * /courses — Course listing page.
 *
 * Publicly accessible. Displays all available courses on the platform.
 * No authentication required.
 */

export default function CoursesPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">All Courses</h1>
      <p className="mt-4 text-muted-foreground">
        Browse our full catalogue of tender mastery courses.
      </p>
      {/* TODO: Fetch and render course cards from Supabase */}
    </main>
  );
}
