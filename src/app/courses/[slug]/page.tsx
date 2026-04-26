/**
 * /courses/[slug] — Course overview page.
 *
 * Publicly accessible. Displays the course description, curriculum outline,
 * instructor details, and enrolment call-to-action.
 * No authentication required.
 */

export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Course: {slug}</h1>
      <p className="mt-4 text-muted-foreground">
        Overview, curriculum, and enrolment details for this course.
      </p>
      {/* TODO: Fetch course data by slug from Supabase and render full overview */}
    </main>
  );
}
