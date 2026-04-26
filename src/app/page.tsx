/**
 * / — Home page (marketing / landing page).
 *
 * Publicly accessible. No authentication required.
 */

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Master the Art of Winning Tenders
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        Expert-led online courses designed to help Australian businesses write
        compelling, competitive tender responses.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/courses"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Browse Courses
        </Link>
        <Link
          href="/login"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}
