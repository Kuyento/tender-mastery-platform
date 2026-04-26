/**
 * /courses/[slug]/modules/[moduleSlug]/lessons/[lessonSlug] — Lesson page.
 *
 * Protected: requires authentication (enforced by middleware).
 *
 * TODO (Step 3): Once the lessons schema and `is_preview` flag are in place,
 * add free-preview lesson exemptions in middleware.ts so that lessons where
 * `is_preview = true` are accessible without authentication.
 */

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; moduleSlug: string; lessonSlug: string }>;
}) {
  const { slug, moduleSlug, lessonSlug } = await params;

  return (
    <main className="container mx-auto px-4 py-12">
      <p className="text-sm text-muted-foreground">
        Course: {slug} / Module: {moduleSlug}
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">
        Lesson: {lessonSlug}
      </h1>
      <div className="mt-8">
        {/* TODO: Fetch lesson data from Supabase and render Bunny.net video player */}
        {/* TODO: Render lesson content, resources, and navigation (prev/next) */}
      </div>
    </main>
  );
}
