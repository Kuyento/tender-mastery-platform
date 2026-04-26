/**
 * /courses/[slug]/modules/[moduleSlug] — Module overview page.
 *
 * Protected: requires authentication (enforced by middleware).
 * Displays the module description and a list of lessons within the module.
 */

export default async function ModuleOverviewPage({
  params,
}: {
  params: Promise<{ slug: string; moduleSlug: string }>;
}) {
  const { slug, moduleSlug } = await params;

  return (
    <main className="container mx-auto px-4 py-12">
      <p className="text-sm text-muted-foreground">Course: {slug}</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">
        Module: {moduleSlug}
      </h1>
      <p className="mt-4 text-muted-foreground">
        Overview and lesson list for this module.
      </p>
      {/* TODO: Fetch module data by moduleSlug from Supabase and render lesson list */}
    </main>
  );
}
