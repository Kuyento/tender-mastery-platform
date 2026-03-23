# Tender Mastery Platform — Evals

## Build Spec Reference

Stack: Next.js 16, Supabase, Stripe, Tailwind CSS, shadcn/ui, Bunny.net,
Genially, Make.com, Vercel, GitHub
Starting course: Procurement Principles — 6 modules, 36 lessons
Exclusions: No SCORM, No H5P, No xAPI, No WordPress, No long-running
server processes

---

## 1. Safety Evals

- Before any Supabase migration runs: verify it does not drop or truncate
  a table containing learner progress, purchase records, or certificate data
- Before any RLS policy is modified: verify the change does not expose user
  data across accounts
- Before any schema change to enrollments, progress, or stripe_events:
  require explicit confirmation
- Before any Stripe webhook handler is modified: verify idempotency keys
  are still present and duplicate event processing is still protected
- Before any price or product ID is changed in code: verify the ID exists
  in the live Stripe environment, not just test mode
- Before refund or cancellation logic is touched: verify the change does
  not silently skip updating the enrollments table in Supabase
- Before any video URL structure is changed: verify existing lesson records
  in Supabase still resolve to a valid Bunny.net stream URL
- Before signed URL logic is modified: verify unenrolled users cannot
  access video content directly

---

## 2. Alignment Evals

- Procurement Principles is the flagship product. No agent action should
  restructure the course schema in a way that breaks the 6-module,
  36-lesson hierarchy
- A learner who purchases a course owns it permanently. Any subscription
  model is additive, not a replacement. Verify this before any enrollment
  or access-control logic is written or refactored
- Completion certificates are a trust signal. Any change to certificate
  generation must preserve learner name, course name, and completion date
  as immutable fields
- The platform is operated by one person. Any feature requiring ongoing
  manual admin intervention is a misaligned build. New features must
  include an admin UI path or automation hook
- Genially embeds are third-party hosted. Do not attempt to self-host or
  replicate Genially content — the embed URL is the source of truth
- Quiz logic lives in React components backed by Supabase. Do not migrate
  quiz state to localStorage or client-only state

---

## 3. Regression Evals

- After any auth flow change: verify a returning learner can log in and
  see enrolled courses and progress intact
- After any Stripe webhook change: verify a completed checkout.session.completed
  event still creates an enrollment record
- After any progress-tracking change: verify lesson completion still
  advances the module progress bar and unlocks the next lesson
- After any routing or proxy.ts change: verify unauthenticated users are
  redirected to login and not shown course content
- After any certificate template change: verify previously issued
  certificates still render correctly with existing data

---

## 4. AI Memory / Context Evals

- The platform must remain operable by one person. Flag any architecture
  requiring a DevOps role to maintain
- Vercel is the deployment target. Flag any suggestion requiring a
  long-running server process
- Make.com handles automation. Do not duplicate Make.com logic inside
  Next.js API routes without explicit instruction
- The admin panel is for the operator only. All admin routes must be
  protected by a role check, not just authentication
- All database and component decisions must generalise cleanly to a second
  course without a migration

---

## 5. Next.js 16 Proxy Note

- Before adding any auth logic to proxy.ts, verify it belongs there
- Auth enforcement for sensitive data (enrollments, progress, certificates)
  must live in Server Components or Route Handlers, not in proxy.ts
- proxy.ts is for routing and redirects only
