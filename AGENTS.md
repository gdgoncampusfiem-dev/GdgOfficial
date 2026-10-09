# AGENTS.md --- GDG Kolkata

> **Mandatory project instructions.** Read this file and
> `documentation.md` before making changes. These rules apply to every
> contributor and AI coding assistant working in this repository.

------------------------------------------------------------------------

## 1. Source of Truth

`documentation.md` defines the project's creative direction, visual
system, information architecture, technical approach, content standards,
and intended experience.

This file defines the implementation rules used to preserve that
direction.

### Instruction priority

When instructions conflict, follow this order:

1.  The project owner's latest explicit instruction
2.  `AGENTS.md` for implementation behavior
3.  `documentation.md` for the project's design and architecture
    decisions
4.  Existing, verified patterns in the repository
5.  Framework conventions
6.  Personal preference

If a meaningful conflict remains, explain it and ask the project owner.
Never silently change a major design decision, route structure, brand
direction, animation philosophy, or architecture.

Do not assume a planned feature exists simply because it is described in
the documentation. Inspect the repository first.

## 2. Mandatory Workflow Before Every Task

Before writing or modifying code:

1.  Read `AGENTS.md` and `documentation.md`.
2.  Inspect the existing repository, package scripts, dependencies,
    routes, components, and relevant configuration.
3.  Identify the specific files and components affected by the request.
4.  Reuse existing components, design tokens, types, and established
    patterns where appropriate.
5.  State any significant assumptions or implementation trade-offs
    before proceeding.
6.  Make the smallest coherent change that fully addresses the task.
7.  Check the result for correctness, responsiveness, accessibility,
    reduced-motion behavior, and performance.
8.  Run relevant available checks, such as linting, type checking,
    tests, and production builds.
9.  Report what changed, what was verified, and what remains incomplete.

Do not overwrite files or replace working sections without first
understanding their purpose. Do not modify unrelated sections during a
focused task.

If the repository or necessary files are unavailable, say so plainly.
Never claim to have inspected, edited, run, or verified something that
you have not actually accessed.

## 3. Creative North Star

The website's core idea is:

**CITY × TECHNOLOGY × COMMUNITY**

Its signature narrative is:

**BLACK → CITY → NETWORK → COMMUNITY → WHITE**

The website must feel premium, editorial, architectural, minimal,
intelligent, culturally rooted in Kolkata, technologically modern, and
human.

It must not look like a conventional GDG website, college-club template,
or generic SaaS landing page.

Use `documentation.md` for the full design intent and section-level
direction.

### Non-negotiable design decisions

-   The opening experience begins in near-black.
-   A custom Kolkata city illustration, authored as SVG, is central to
    the hero narrative.
-   The illustration gradually reveals architectural linework and
    evolves into a network motif.
-   The opening transitions through graphite into a warm-white editorial
    content experience.
-   The footer returns to black to close the narrative.
-   The dark-to-light transformation is a signature sequence, not a
    reason to alternate background colors throughout the site.
-   The visual identity is primarily neutral. Google colors are
    restrained accents, not the entire palette.
-   Real community content must take priority over decorative effects or
    invented content.

### Avoid

-   Generic SaaS cards and repeated card grids
-   Excessive rounded corners, pill controls, shadows, or decorative
    borders
-   Glassmorphism and gradient blobs
-   Random floating objects or gratuitous 3D
-   Excessive icons or visual clutter
-   Unnecessary motion and competing animation effects
-   Generic marketing language without specific meaning
-   AI-generated city grids in place of the planned authored Kolkata SVG
-   Copying another website's distinctive design or assets

Whitespace, typography, alignment, image composition, and precise
spacing should do most of the visual work.

## 4. Brand and Content Integrity

Respect the official GDG and Google brand guidance:

-   https://support.google.com/developergroups/answer/2893268
-   https://about.google/brand-resource-center/

Do not imply official corporate Google endorsement unless authorized.
Use logos and brand assets only in accordance with the relevant
guidelines.

Never fabricate or present unverified information as fact, including:

-   Community statistics
-   Events, dates, locations, attendance, or registration links
-   Team names, roles, portraits, or social profiles
-   Sponsors, partner logos, or partnerships
-   Testimonials, awards, or endorsements
-   Contact details

Use clearly labeled placeholders during development and replace them
with verified information before launch. Do not allow placeholder
content to appear as genuine production content.

## 5. Visual System Rules

### Color

Use the established tokens in `documentation.md` and the existing design
system. Do not introduce new colors without a clear visual or functional
reason.

Keep the contrast between the dark opening, graphite transition,
warm-white main content, and dark footer intentional.

### Typography

-   Use the established display, body, and optional metadata typefaces.
-   Maintain a clear typographic hierarchy.
-   Use responsive type sizing and readable line lengths.
-   Avoid introducing extra typefaces without justification.
-   Optimize font loading and respect font licenses.

### Layout

Prefer editorial grids, deliberate asymmetry, strong alignment, thin
rules, numbered metadata, purposeful whitespace, and carefully composed
photography.

Do not force every section into the same layout. Each major section
should have a distinct visual idea while remaining part of one coherent
system.

### Components

Before creating a new component, check whether an existing one can be
extended or composed.

Prefer reusable components when they establish a real pattern. Do not
create abstractions solely to make the folder structure look
sophisticated.

Keep content data, presentation, motion, and business logic
appropriately separated.

## 6. Motion and Interaction Rules

Motion is a core part of the design system. It must communicate
hierarchy, reveal information, guide attention, or support the
city-to-network narrative.

Use the motion vocabulary defined in `documentation.md`:

-   Line reveals
-   Image reveals
-   Restrained typographic reveals
-   Grid-to-network connections
-   Subtle hover displacement
-   Limited magnetic interactions for key CTAs
-   Scroll-linked hero transformation
-   Short, purposeful page transitions

### Motion timing guidance

-   Micro-interactions: approximately 120--220 ms
-   Standard transitions: approximately 250--450 ms
-   Content reveals: approximately 500--900 ms
-   Signature cinematic moments: approximately 900--1400 ms

These are starting ranges, not mandatory values for every interaction.
Choose timing based on purpose and test the experience.

### Prohibited motion patterns

-   Random floating elements
-   Constantly moving backgrounds without purpose
-   Excessive bounce or elastic effects
-   Every word animating by default
-   Several competing animations at once
-   Long loading screens
-   Motion that delays access to essential content
-   Hover-only interactions for essential information

Prefer transforms and opacity when practical. Avoid repeated expensive
layout recalculation and excessive scroll event work.

### Accessibility

-   Respect `prefers-reduced-motion`.
-   Provide a reduced-motion alternative that preserves the content and
    narrative.
-   Never require animation to understand or use the page.
-   Disable or simplify custom cursors, magnetic effects, and expensive
    parallax on touch devices.
-   Essential actions and information must remain available by keyboard
    and touch.

## 7. Frontend Engineering Rules

Follow the existing repository's established setup. Where no established
convention exists, use the following defaults:

-   Next.js App Router
-   React with TypeScript and `.tsx`
-   Explicit types and well-defined component props
-   Server components by default when suitable
-   Client components only when interactivity, state, or browser-side
    behavior requires them
-   Next.js image optimization for appropriate image assets
-   Semantic HTML
-   Clear loading, empty, and error states

Avoid `any` unless there is a documented reason. Avoid unnecessary
client-side JavaScript, duplicate state, and overly complex component
APIs.

Do not introduce a new dependency without checking the existing
dependencies and explaining why the addition is justified. Do not add a
second library for a capability already handled by the project.

Do not change package managers or replace configuration files without a
clear need.

### Component organization

Follow the existing repository structure. If starting from a clean
repository, the conceptual separation should be:

-   `ui/`: reusable interface elements
-   `motion/`: animation and interaction primitives
-   Feature folders: sections and components for events, gallery,
    domains, team, sponsorship, and other page features
-   `data/`: typed content data where appropriate
-   `types/`: shared domain types
-   `lib/` and `hooks/`: reusable utilities and hooks

Do not create empty files, empty folders, or speculative components just
to match a proposed architecture.

## 8. Backend and Data Rules

The intended backend direction is Express with TypeScript, Prisma, and
Neon PostgreSQL.

Follow existing conventions first. Where no convention exists:

-   Separate routes, controllers, services, validation, and database
    access where useful.
-   Validate incoming request data at the API boundary.
-   Use centralized error handling.
-   Use consistent response and error structures.
-   Configure CORS deliberately.
-   Keep secrets in environment variables.
-   Never commit real credentials, API keys, database URLs, or
    production `.env` files.
-   Use migrations for deliberate database schema changes.
-   Keep seed data clearly identifiable as development data.
-   Handle loading, empty, and failure states on the frontend.

Potential API routes described in the documentation are candidates, not
an instruction to build every route immediately.

Never claim that an API, database connection, form, or integration works
until it has been implemented and appropriately tested.

## 9. Responsive Design Requirements

Responsive design must be considered while building a component, not
added as a last-minute patch.

### Desktop

-   Preserve editorial composition and intentional whitespace.
-   Use hover interactions only as enhancements.
-   Keep the hero illustration carefully composed.
-   Prevent navigation or motion effects from competing with content.

### Mobile and touch

-   Recompose layouts intentionally for narrow viewports.
-   Keep text readable and prevent horizontal overflow.
-   Use comfortable touch targets.
-   Do not depend on hover.
-   Simplify or remove expensive parallax and cursor effects.
-   Ensure forms, gallery controls, navigation, and event information
    remain usable.
-   Preserve the site's identity without forcing desktop animation
    behavior onto small screens.

Test intermediate widths as well as common phone and desktop sizes.

## 10. Accessibility, Performance, and SEO

### Accessibility checklist

-   Semantic landmarks and HTML
-   Logical heading hierarchy
-   Keyboard-operable navigation and controls
-   Visible focus states
-   Proper form labels and useful validation messages
-   Sufficient text and control contrast
-   Meaningful alt text for informative images
-   Appropriate accessible names for icon-only controls
-   Keyboard-operable dialogs and lightboxes
-   Reduced-motion support
-   No essential information available only on hover

### Performance checklist

-   Optimize image sizes and formats.
-   Lazy-load suitable below-the-fold media.
-   Load fonts efficiently.
-   Limit client-side JavaScript.
-   Use animation techniques that avoid expensive layout work.
-   Avoid unnecessary dependencies and oversized assets.
-   Test the production build where possible.

Performance targets in `documentation.md` are goals, not verified
results. Never report Lighthouse scores or test results unless they have
actually been measured.

### SEO checklist

Where appropriate, implement:

-   Page-specific metadata
-   Open Graph metadata
-   Canonical URLs
-   Sitemap
-   Robots rules
-   Clear titles and descriptions
-   Correct heading structure
-   Useful image alt text
-   Stable and meaningful route names

Do not claim indexing or search visibility without evidence.

## 11. Security and Privacy

-   Never expose secrets in source code, client bundles, logs,
    documentation, or commits.
-   Validate and sanitize untrusted input as appropriate.
-   Use server-side validation even when frontend validation exists.
-   Avoid exposing internal error details to public clients.
-   Do not collect unnecessary personal information.
-   Treat sponsorship/contact form submissions as untrusted input.
-   Follow the existing security setup and flag material risks before
    introducing a workaround.

If a requested change risks credentials, user data, or production
infrastructure, explain the risk before proceeding.

## 12. Testing and Verification

Run checks that are available and relevant to the changed files.

Possible checks include:

-   Lint
-   Type checking
-   Unit or integration tests
-   Production build
-   Route and link checks
-   Responsive layout review
-   Keyboard navigation review
-   Reduced-motion review
-   Form validation and submission checks

Do not invent test commands. Inspect `package.json` and project
configuration to find the actual commands.

If a check cannot run, state why. Distinguish clearly between:

-   Implemented
-   Checked manually
-   Tested automatically
-   Not tested
-   Known limitation

Never claim "everything works" based only on code generation.

## 13. Scope Control and Code Changes

For each task:

1.  Identify the requested outcome.
2.  Inspect the relevant existing code.
3.  Reuse existing conventions.
4.  Change only the necessary files.
5.  Preserve unrelated functionality.
6.  Avoid broad rewrites unless explicitly requested or technically
    necessary.
7.  Explain unavoidable breaking changes before making them.
8.  Review the diff or modified code when tools permit.
9.  Run relevant checks.
10. Summarize the result and any remaining work.

Do not silently delete content, routes, components, data, configuration,
or dependencies. Do not replace a complete file when a small targeted
change is sufficient.

If the requested feature depends on missing information, make safe,
clearly stated assumptions only when reasonable. Otherwise, ask a
focused clarification.

## 14. Definition of Done

A task is complete only when its result has been checked against the
requirements.

-   The change fulfills the requested behavior.
-   The design remains consistent with `documentation.md`.
-   Existing relevant components and tokens are reused.
-   Desktop and mobile behavior have been considered.
-   Keyboard and reduced-motion behavior have been considered.
-   Links, buttons, forms, and navigation work as claimed.
-   Content is verified or explicitly marked as placeholder.
-   No unrelated functionality has been knowingly damaged.
-   Relevant checks have been run, or their absence is disclosed.
-   Known limitations are reported honestly.

Do not equate "code written" with "feature verified."

## 15. Handoffs and Project Status

Keep the project status in the repository README or an existing
project-state file. Do not create a separate tracking system unless the
project needs one.

Record:

-   **Completed:** implemented and verified work
-   **In progress:** current work
-   **Pending:** work not yet started
-   **Known issues:** actual defects or limitations
-   **Next priority:** the next most valuable task

When handing work to another contributor or AI assistant, provide the
relevant files, current status, key decisions, exact next task, and any
checks already performed.

Never state that a planned feature has been completed merely because it
appears in the documentation.

## 16. First-Task Behavior

When beginning work on an unfamiliar or newly opened repository:

1.  Read `AGENTS.md` and `documentation.md`.
2.  Inspect the repository and available scripts.
3.  Summarize what actually exists.
4.  Identify missing foundations or blockers.
5.  Recommend a short, prioritized implementation plan.
6.  Wait for the project owner's task if no implementation task has been
    assigned.

Do not start building the whole website merely because the repository
has been opened.

------------------------------------------------------------------------

## Final Rule

**Preserve the vision. Inspect before changing. Build incrementally.
Keep the system coherent. Verify what you claim.**

The goal is not to add the most effects or write the most code. The goal
is to build a distinctive, usable, accessible, maintainable website that
expresses the identity of GDG Kolkata.
