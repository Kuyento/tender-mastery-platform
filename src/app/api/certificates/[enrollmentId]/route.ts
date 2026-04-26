/**
 * GET /api/certificates/[enrollmentId] — Certificate generation endpoint.
 *
 * Protected: requires authentication. Generates and returns a PDF certificate
 * for a completed course enrolment.
 *
 * The `enrollmentId` parameter identifies the specific enrolment record in
 * Supabase. The handler verifies that:
 *  1. The requesting user is authenticated.
 *  2. The enrolment belongs to the requesting user.
 *  3. The course has been marked as completed for that enrolment.
 */

import { createClient } from "@/lib/supabase/server";
import type { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ enrollmentId: string }> },
) {
  const { enrollmentId } = await params;

  const supabase = await createClient();

  // Verify the user is authenticated.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorised.", { status: 401 });
  }

  // TODO: Fetch the enrolment record from Supabase and verify ownership.
  // TODO: Verify the course is marked as completed for this enrolment.
  // TODO: Generate a PDF certificate (e.g. using @react-pdf/renderer or puppeteer).
  // TODO: Return the PDF as a downloadable response with appropriate headers.

  return new Response(
    JSON.stringify({
      message: `Certificate generation for enrolment ${enrollmentId} is not yet implemented.`,
    }),
    {
      status: 501,
      headers: { "Content-Type": "application/json" },
    },
  );
}
