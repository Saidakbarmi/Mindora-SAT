# MINDORA — Platform Context & Handoff Reference

> **Clear Mind. Higher Score.**  
> SAT Preparation & Performance Analytics Platform for High-School Students.

---

## 1. Project Identity
- **Product Name:** MINDORA
- **Tagline:** Clear Mind. Higher Score. (Tiniq aql. Yuqori natija.)
- **Mission:** High-focus, distraction-free digital SAT preparation workspace combining structured video curriculum, interactive diagnostic drills, and granular score analytics.
- **Target Audience:** SAT test-takers aiming for top percentiles (1400–1600), currently centered around a student progressing from 1180 to 1450+.

---

## 2. Visual Identity & Design System
- **Color Palette:**
  - Background Base: `#051316` (Deep Midnight Teal)
  - Surface Glass: `rgba(8, 28, 33, 0.75)` to `rgba(18, 52, 59, 0.65)` with `backdrop-filter: blur(20px)`
  - Primary Accent / Mint: `#8fe3d0`
  - Subtle Lime Highlight: `#c2f287`
  - Deep Teal Border: `rgba(143, 227, 208, 0.12)`
  - Text Primary: `#ffffff`
  - Text Muted: `#88a2a8`
- **Typography:**
  - Clean modern sans-serif (`Inter`, `Plus Jakarta Sans`, system fallbacks) with generous letter-spacing on uppercase labels (`0.06em`).
  - Strict typographic hierarchy: Large stats (`36px - 44px`), Section titles (`20px - 26px`), Subtitles (`13px - 14px`), Metadata badges (`11px - 12px`).
- **Glassmorphism System:**
  - Multi-layered borders (`1px solid var(--glass-border)`), soft ambient inner glows, zero harsh shadows.
- **Adaptive Atmosphere System:**
  - Dynamic page-aware atmospheric backdrop that subtly morphs tint, gradient angles, and radial glows depending on the active view:
    - `.atmosphere-dashboard`
    - `.atmosphere-learn`
    - `.atmosphere-homework`
    - `.atmosphere-practice`
    - `.atmosphere-progress`
    - `.atmosphere-leaderboard`
    - `.atmosphere-attendance`
    - `.atmosphere-achievements`
    - `.atmosphere-tools`
- **Design Philosophy:**
  - Academic, calm, analytical, focused.
  - No cartoonish elements, no garish rainbow gradients, no distracting animations.
  - Space is used intentionally: high density of useful SAT metrics without clutter.

---

## 3. Architecture & Tech Stack
- **Framework:** React 19 (`react`, `react-dom`) + Vite 8
- **Styling:** Modular CSS architecture centered in `src/App.css`, `src/index.css`, and `src/styles/design-system.css`.
- **Icons:** `lucide-react`
- **Celebration Effects:** `canvas-confetti`
- **Build Tool:** Vite (`npm run build` generates production bundle in `dist/`).
- **Linter:** `oxlint`
- **Directory Structure:**
  ```
  Mindora/
  ├── public/
  │   └── Mindora көк қанат эмблемасы.png   # Canonical logo mark
  ├── src/
  │   ├── assets/
  │   ├── components/
  │   │   ├── FocusModeOverlay.jsx          # Zen fullscreen focus timer
  │   │   ├── InteractiveDrillModal.jsx     # Interactive quiz/drill tester
  │   │   ├── ScoreTrajectoryChart.jsx      # SVG dynamic score chart
  │   │   ├── SearchModal.jsx               # Global search (Ctrl+K)
  │   │   ├── SettingsModal.jsx             # User preferences & SAT goals
  │   │   ├── Sidebar.jsx                   # Collapsible desktop & mobile drawer
  │   │   ├── StudyEnvironment.jsx          # Ambient sounds / timer
  │   │   ├── TopNavbar.jsx                 # Top bar with segmented dual-language switch (O'Z/EN), compact search, focus mode
  │   │   └── Footer.jsx                    # Shared application footer with Saidakbar creator attribution and social links
  │   ├── data/
  │   │   ├── mockData.js                   # Canonical student & stats data
  │   │   ├── satCourseData.js              # 90-Day complete SAT syllabus
  │   │   └── actualYoutubeCourse.json      # Structured YouTube lesson modules
  │   ├── styles/
  │   │   └── design-system.css             # Tokens & Adaptive Atmosphere styles
  │   ├── utils/
  │   │   └── i18n.js                       # English & Uzbek translations dictionary
  │   ├── views/
  │   │   ├── DashboardView.jsx             # Main overview & next up lesson
  │   │   ├── LearnView.jsx                 # 90-Day Curriculum timeline
  │   │   ├── VideoLessonView.jsx           # Video player workspace & notes
  │   │   ├── HomeworkView.jsx              # Daily homework sets & drills
  │   │   ├── PracticeTestsView.jsx         # Full-length SAT practice tests
  │   │   ├── LeaderboardView.jsx           # Academy rankings & score peers
  │   │   ├── AttendanceView.jsx            # Monthly study attendance tracker
  │   │   ├── ProgressView.jsx              # Analytical score & subject bridge
  │   │   ├── AchievementsView.jsx          # Badges & streak rewards
  │   │   └── StudyToolsView.jsx            # Flashcards, Vocab, Mistakes Bank, Notes
  │   ├── App.jsx                           # Master layout, router, global modal state
  │   ├── App.css                           # Primary application styling & media queries
  │   └── main.jsx                          # React 19 DOM bootstrap
  ├── package.json
  └── vite.config.js
  ```
- **Routing:** Hash-based lightweight dynamic routing (`window.location.hash`, `#learn`, `#homework`, `#progress`, etc.) synchronized with `currentTab` in `App.jsx`.
- **State Management:** React state lifted to `App.jsx` for student progress, completed lesson IDs, active modal states, language selection (`uz` / `en`).

---

## 4. Current Implemented Features
1. **Dashboard (`#dashboard`):** Real-time SAT score hero, Daily streak & attendance meters, Next-up lesson card with direct resume, 5-test score history mini-chart.
2. **Learn / 90-Day Curriculum (`#learn`):** 90-day structured syllabus grouped by stages (Foundations, Advanced Math, Reading Evidence, Full Drills), progress indicators, completion state saved to `localStorage`.
3. **Video Lesson Workspace (`#video-lesson`):** Immersive embedded YouTube player, lesson checkpoints, timestamped note-taking scratchpad, direct bridge to homework drills.
4. **Homework (`#homework`):** Filterable homework drills (All, In Progress, Completed, Overdue) with timed question sets.
5. **Practice Tests (`#practice`):** Diagnostic test simulations, Bluebook-aligned section breakdown, target pacing analysis.
6. **Leaderboard (`#leaderboard`):** Academy leaderboard with tier ranks, weekly XP, and user's pinned rank position.
7. **Attendance (`#attendance`):** Interactive monthly heat calendar, 94% overall attendance, weekly streak safety logs.
8. **Achievements (`#achievements`):** Milestone badges (7-Day Streak, Math 700+, Reading Master), unlock criteria, XP rewards.
9. **Study Tools (`#flashcards`, `#vocabulary`, `#notes`, `#mistakes`):**
   - SAT Flashcard review deck
   - High-frequency SAT vocabulary builder
   - Searchable student notebook
   - Mistakes Bank (xatolar tahlili) with categorized error breakdown.
10. **Progress (`#progress`):**
    - Master Score Bridge (`1320 ──[ 130 ball qoldi ]──> 1450`) with +140 gain and Nov 21 countdown.
    - 3-tier Subject Performance hierarchy (Writing 88% Strongest, Math 82% On track, Reading 74% Priority).
    - Next Priority Action Card (`[Reading Mashqlarini Boshlash →]`).
    - Milestones Roadmap (1180 -> 1320 -> 1350 [next goal] -> 1400 -> 1450).
11. **Settings (`SettingsModal.jsx`):** Target score adjustment, notification toggles, language preference, profile information.
12. **Focus Mode (`FocusModeOverlay.jsx`):** Zen ambient focus timer with lo-fi sound generator.
13. **Global Search (`SearchModal.jsx`):** `Ctrl+K` searchable catalog of all lessons, drills, vocabulary, and notes.
14. **Application Footer (`Footer.jsx`):** Multi-column premium footer establishing MINDORA as a project created and designed by Saidakbar, with social links (GitHub, Telegram, Portfolio, Email) and responsive layout.

---

## 5. Canonical Student Profile Data
All mock views reference the canonical student profile:
- **Name:** Saidakbar
- **Avatar:** Realistic high-resolution student portrait
- **Current SAT Score:** `1320`
- **Goal SAT Score:** `1450`
- **Improvement:** `+140` points (from 1180 diagnostic)
- **Points Remaining:** `130` points
- **Current Percentile:** `88-persentil`
- **Study Streak:** `12 kun`
- **Overall Attendance:** `94%` (28/30 dars)
- **Subject Accuracy:**
  - Writing & Language: `88%` (Strongest Area)
  - Math: `82%` (`690 / 800`, On Track)
  - Reading: `74%` (`630 / 800`, First Priority)
- **Official SAT Date:** November 21, 2026

---

## 6. Important Design Decisions Made
1. **Desktop ChatGPT-Style Collapsible Sidebar:**
   - Width is 250px expanded, 68px collapsed.
   - Clicking collapse button or mini-logo collapses/expands smoothly.
2. **Mobile Sidebar Overlay Architecture:**
   - On screens `<= 900px`, the desktop 68px collapsed rail is **disabled**.
   - Instead, the sidebar is an off-screen drawer (`transform: translateX(-105%)`) with a dark backdrop (`.sidebar-mobile-backdrop`).
   - The close button (`.sidebar-collapse-toggle-btn`) acts as a full dismiss button (`setIsMobileOpen(false)`).
   - Tapping the backdrop or any nav link dismisses the drawer completely.
3. **Score Bridge Pattern over Disconnected Stats:**
   - Score progress is visually connected as a bridge between current (1320) and goal (1450) with distance and exam date callouts.
4. **Uzbek First-Class Typography Rules:**
   - Button text must have `white-space: normal; line-height: 1.35;` to prevent Uzbek word truncation.
   - Headings use `word-break: break-word` and dynamic flex wrapping instead of premature font reduction.
   - Large tables are wrapped in mobile scroll containers (`overflow-x: auto`).

---

## 7. Protected Assets (MUST NOT BE REDESIGNED)
- **DO NOT redesign Learn / Lessons / Video Lesson Workspace:** The 90-day syllabus, video player layout, and video checkpoint logic are fully stable and protected.
- **DO NOT remove or weaken the Adaptive Atmosphere System:** The `.atmosphere-*` classes and radial background layers must remain active across all pages.
- **DO NOT modify the core color palette:** Teal, Mint, Lime, Glassmorphism, Deep Dark surfaces.
- **DO NOT change canonical mock data:** Saidakbar, 1320, 1450, +140, 130 remaining.
- **DO NOT replace the Logo Mark:** Public logo `/Mindora көк қанат эмблемасы.png` is canonical.

---

## 8. Stable Components
- `src/App.jsx`
- `src/components/Sidebar.jsx` (Mobile-drawer aware)
- `src/components/TopNavbar.jsx`
- `src/components/FocusModeOverlay.jsx`
- `src/components/InteractiveDrillModal.jsx`
- `src/components/ScoreTrajectoryChart.jsx`
- `src/components/SearchModal.jsx`
- `src/components/SettingsModal.jsx`
- `src/views/DashboardView.jsx`
- `src/views/LearnView.jsx`
- `src/views/VideoLessonView.jsx`
- `src/views/HomeworkView.jsx`
- `src/views/PracticeTestsView.jsx`
- `src/views/LeaderboardView.jsx`
- `src/views/AttendanceView.jsx`
- `src/views/AchievementsView.jsx`
- `src/views/StudyToolsView.jsx`
- `src/views/ProgressView.jsx`

---

## 9. Development Philosophy & Rules for Future Agents
1. **Audit Before Modifying:** Always inspect the live DOM and browser screenshots before touching any code.
2. **Small Controlled Changes:** Never run uncontrolled global rewrites. Target specific files and functions.
3. **Preserve Uzbek Text Integrity:** Always verify that button labels and headings display complete Uzbek text without clipping or wrapping collisions.
4. **Always Verify with Production Build:** Run `npm run build` after changes to confirm `0 errors`.
5. **Always Communicate in Uzbek:** The project owner requires all agent communications to be in Uzbek ("Menga doim o'zbek tilida yoz!").
