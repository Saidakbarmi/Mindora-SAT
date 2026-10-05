export const initialStudent = {
  name: "Saidakbar",
  fullName: "Saidakbar Rahimov",
  role: "Student",
  avatar: "/assets/saidakbar.jpg",
  level: 14,
  xp: 1840,
  streak: 12,
  goalScore: 1450,
  currentScore: 1320,
  improvement: 140,
  testDate: "Nov 21, 2026",
  daysLeft: 47,
  attendanceRate: 94,
  attendedClasses: 32,
  missedClasses: 2,
  lateClasses: 1,
  mathScore: 690,
  readingWritingScore: 630,
  subjectMastery: {
    math: 82,
    reading: 74,
    writing: 88,
  }
};

export const todaysLesson = {
  id: "lesson-quad-1",
  subject: "MATH",
  title: "Quadratic Functions",
  unit: "Lesson 4 of 12",
  duration: "18 min",
  progress: 64,
  description: "Understand quadratic equations, vertex form, parabolas, and real-world trajectory modeling.",
  instructor: "Dr. Aris Thorne (Stanford Math PhD)",
  thumbnail: "/assets/lesson_quadratic.jpg",
  nextUp: [
    { id: "l-5", title: "Factoring Techniques", lesson: "Lesson 5", duration: "15 min", locked: false },
    { id: "l-6", title: "Word Problems & Modeling", lesson: "Lesson 6", duration: "14 min", locked: true },
    { id: "l-quiz", title: "Practice Quiz", lesson: "10 questions", duration: "12 min", locked: true },
  ],
  outline: [
    { title: "Introduction to Quadratic Curves", time: "02:15", done: true },
    { title: "Standard vs Vertex Form: f(x) = a(x-h)² + k", time: "05:40", done: true },
    { title: "Finding Roots with Quadratic Formula", time: "04:10", done: false, active: true },
    { title: "Discriminant Analysis & Complex Roots", time: "03:30", done: false },
    { title: "Real SAT Problem Walkthrough", time: "02:25", done: false },
  ],
  transcript: "Welcome to today's core SAT Math session. Quadratic equations are among the highest-yielding topics in the advanced math domain of the Digital SAT. Notice how a quadratic function defines a parabolic curve with an axis of symmetry x = -b / (2a). When rewriting equations into vertex form, the coordinates (h, k) directly provide the maximum or minimum value without needing derivatives...",
  notes: "Key Takeaway: If discriminant b² - 4ac > 0 there are 2 real solutions; = 0 gives 1 unique double root; < 0 gives no real solutions."
};

export const scoreTrajectory = [
  { month: "Mar", score: 1180, label: "Baseline" },
  { month: "Apr", score: 1210, label: "+30 pts" },
  { month: "May", score: 1260, label: "+50 pts" },
  { month: "Jun", score: 1320, label: "Current (Jun)" },
  { month: "Jul", score: 1380, projected: true },
  { month: "Aug", score: 1450, target: true, label: "Target 1450" },
];

export const homeworkList = [
  {
    id: "hw-1",
    title: "Algebra Drill",
    subject: "Mathematics",
    subjectTag: "MATH",
    questionsCount: 12,
    dueDate: "Due today",
    status: "in-progress", // 'not-started' | 'in-progress' | 'overdue' | 'completed'
    progress: 58,
    estimatedMinutes: 25,
    difficulty: "Medium",
    color: "#8FE3D0"
  },
  {
    id: "hw-2",
    title: "Reading Practice",
    subject: "Reading & Writing",
    subjectTag: "READING",
    questionsCount: 18,
    dueDate: "Due tomorrow",
    status: "not-started",
    progress: 0,
    estimatedMinutes: 30,
    difficulty: "Hard",
    color: "#E8B85A"
  },
  {
    id: "hw-3",
    title: "Geometry Set",
    subject: "Mathematics",
    subjectTag: "MATH",
    questionsCount: 20,
    dueDate: "2 days overdue",
    status: "overdue",
    progress: 15,
    estimatedMinutes: 35,
    difficulty: "Hard",
    color: "#E47B7B"
  },
  {
    id: "hw-4",
    title: "Writing & Grammar",
    subject: "Writing Conventions",
    subjectTag: "WRITING",
    questionsCount: 15,
    dueDate: "Completed",
    status: "completed",
    progress: 100,
    score: "94%",
    estimatedMinutes: 20,
    difficulty: "Medium",
    color: "#A8F06A"
  },
  {
    id: "hw-5",
    title: "Advanced Math: Exponential Growth",
    subject: "Mathematics",
    subjectTag: "MATH",
    questionsCount: 14,
    dueDate: "Due in 3 days",
    status: "not-started",
    progress: 0,
    estimatedMinutes: 22,
    difficulty: "Medium",
    color: "#A7D7E8"
  },
  {
    id: "hw-6",
    title: "Vocabulary in Context",
    subject: "Reading & Writing",
    subjectTag: "READING",
    questionsCount: 10,
    dueDate: "Completed yesterday",
    status: "completed",
    progress: 100,
    score: "100%",
    estimatedMinutes: 15,
    difficulty: "Easy",
    color: "#A8F06A"
  }
];

export const interactiveDrillQuestions = [
  {
    id: 1,
    subject: "Algebra & Functions",
    question: "If 3x + 7 = 28, what is the value of 6x - 5?",
    options: [
      { id: "A", text: "37" },
      { id: "B", text: "42" },
      { id: "C", text: "45" },
      { id: "D", text: "49" }
    ],
    correct: "A",
    explanation: "Subtract 7 from both sides: 3x = 21, so x = 7. Then evaluate 6x - 5: 6(7) - 5 = 42 - 5 = 37."
  },
  {
    id: 2,
    subject: "Quadratic Equations",
    question: "The function f(x) = (x - 4)² - 9 intersects the x-axis at points (p, 0) and (q, 0). What is the value of p + q?",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "8" },
      { id: "C", text: "9" },
      { id: "D", text: "-8" }
    ],
    correct: "B",
    explanation: "Set f(x) = 0: (x - 4)² = 9 → x - 4 = ±3 → x = 7 or x = 1. The sum of the roots p + q = 7 + 1 = 8. (Or by symmetry, axis of symmetry is x = 4, so sum of roots is 2 × 4 = 8)."
  },
  {
    id: 3,
    subject: "System of Linear Equations",
    question: "A system of equations is given by: 2x - 3y = 12 and 4x + ky = 24. For what value of k does the system have infinitely many solutions?",
    options: [
      { id: "A", text: "k = -6" },
      { id: "B", text: "k = 6" },
      { id: "C", text: "k = -3" },
      { id: "D", text: "k = 3" }
    ],
    correct: "A",
    explanation: "Multiply the first equation by 2: 4x - 6y = 24. Comparing this to 4x + ky = 24, we see k must equal -6 for identical lines."
  },
  {
    id: 4,
    subject: "Exponents & Radicals",
    question: "Which of the following is equivalent to (x^(2/3)) * (x^(1/2)) for x > 0?",
    options: [
      { id: "A", text: "x^(1/3)" },
      { id: "B", text: "x^(7/6)" },
      { id: "C", text: "x^(2/6)" },
      { id: "D", text: "x^(3/5)" }
    ],
    correct: "B",
    explanation: "Add the exponents: 2/3 + 1/2 = 4/6 + 3/6 = 7/6. Therefore, x^(7/6)."
  }
];

export const leaderboardUsers = [
  { rank: 1, name: "Emma", xp: 2840, streak: 21, avatar: "/assets/emma.jpg", badge: "Diamond Scholar" },
  { rank: 2, name: "Daniel", xp: 2710, streak: 18, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80", badge: "Math Virtuoso" },
  { rank: 3, name: "Sarah", xp: 2590, streak: 16, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", badge: "Grammar Master" },
  { rank: 4, name: "Alex K.", xp: 2320, streak: 14, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", badge: "Pacesetter" },
  { rank: 5, name: "Maya S.", xp: 2180, streak: 15, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80", badge: "Sprint Master" },
  { rank: 6, name: "James L.", xp: 2050, streak: 11, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", badge: "Focus Legend" },
  { rank: 7, name: "Noah", xp: 1920, streak: 9, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80", badge: "Steady Climber" },
  { rank: 8, name: "Saidakbar", isCurrentUser: true, xp: 1840, streak: 12, avatar: "/assets/saidakbar.jpg", badge: "Momentum Builder" },
  { rank: 9, name: "Liam", xp: 1760, streak: 8, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80", badge: "Scholar" },
  { rank: 10, name: "Olivia", xp: 1640, streak: 7, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80", badge: "Rising Star" }
];

export const achievementsList = [
  {
    id: "ach-1",
    title: "Momentum Builder",
    description: "Study 14 days in a row to unlock the next prestige tier.",
    progress: 12,
    max: 14,
    unlocked: false,
    icon: "flame",
    color: "#E8B85A",
    tier: "Gold"
  },
  {
    id: "ach-2",
    title: "First Week Mastery",
    description: "Complete your introductory onboarding and first diagnostic test.",
    progress: 7,
    max: 7,
    unlocked: true,
    icon: "check-circle",
    color: "#8FE3D0",
    tier: "Completed"
  },
  {
    id: "ach-3",
    title: "Math Virtuoso",
    description: "Score 90%+ on 5 consecutive algebra and advanced math sets.",
    progress: 4,
    max: 5,
    unlocked: false,
    icon: "award",
    color: "#A8F06A",
    tier: "Silver"
  },
  {
    id: "ach-4",
    title: "Reading Sprint",
    description: "Read 25 SAT historical passages and answer evidence questions.",
    progress: 25,
    max: 25,
    unlocked: true,
    icon: "book-open",
    color: "#A7D7E8",
    tier: "Completed"
  },
  {
    id: "ach-5",
    title: "Score Breakthrough",
    description: "Elevate your composite SAT diagnostic score by over +100 points.",
    progress: 140,
    max: 100,
    unlocked: true,
    icon: "trending-up",
    color: "#A8F06A",
    tier: "Legendary"
  },
  {
    id: "ach-6",
    title: "100 Questions Solved",
    description: "Solve 100 practice questions with detailed analytical review.",
    progress: 100,
    max: 100,
    unlocked: true,
    icon: "zap",
    color: "#8FE3D0",
    tier: "Completed"
  },
  {
    id: "ach-7",
    title: "Early Bird Focus",
    description: "Complete 5 morning study sessions before 8:00 AM.",
    progress: 3,
    max: 5,
    unlocked: false,
    icon: "sun",
    color: "#E8B85A",
    tier: "Bronze"
  },
  {
    id: "ach-8",
    title: "Night Owl Endurance",
    description: "Log 60 minutes of uninterrupted evening focus in low-distraction mode.",
    progress: 60,
    max: 60,
    unlocked: true,
    icon: "moon",
    color: "#A7D7E8",
    tier: "Completed"
  }
];

export const flashcardsData = [
  {
    id: 1,
    topic: "Math — Vertex Form",
    front: "What are the coordinates of the vertex for: f(x) = a(x - h)² + k?",
    back: "Vertex is (h, k). If a > 0, the parabola opens upward and k is minimum. If a < 0, it opens downward and k is maximum.",
    category: "Math"
  },
  {
    id: 2,
    topic: "Math — Circle Equation",
    front: "What is the standard equation of a circle centered at (h, k) with radius r?",
    back: "(x - h)² + (y - k)² = r²",
    category: "Math"
  },
  {
    id: 3,
    topic: "Reading — Vocabulary",
    front: "Anomalous (adj.)",
    back: "Deviating from what is standard, normal, or expected. Example: 'An anomalous temperature spike confused meteorologists.'",
    category: "Vocabulary"
  },
  {
    id: 4,
    topic: "Writing — Semicolon Rule",
    front: "When do you use a semicolon (;) on the SAT?",
    back: "To join two independent clauses (complete thoughts) without a coordinating conjunction (FANBOYS). E.g., 'The theorem holds; the proof is sound.'",
    category: "Writing"
  },
  {
    id: 5,
    topic: "Math — Sum of Roots",
    front: "For ax² + bx + c = 0, what is the formula for the sum of the roots?",
    back: "Sum of roots = -b / a. Product of roots = c / a (Vieta's Formulas).",
    category: "Math"
  }
];

export const vocabularyWords = [
  { word: "Pragmatic", pos: "adj.", def: "Dealing with things sensibly and realistically based on practical rather than theoretical considerations.", ex: "She took a pragmatic approach to SAT time management." },
  { word: "Lucid", pos: "adj.", def: "Expressed clearly; easy to understand; bright or luminous.", ex: "His lucid explanation of the parabola solved our doubts." },
  { word: "Equivocal", pos: "adj.", def: "Open to more than one interpretation; ambiguous.", ex: "The author's equivocal stance invited scholarly debate." },
  { word: "Corroborate", pos: "verb", def: "Confirm or give support to a statement, theory, or finding.", ex: "Recent satellite data corroborates the climate model." },
  { word: "Ephemeral", pos: "adj.", def: "Lasting for a very short time; transitory.", ex: "Exam anxiety is ephemeral; master the underlying concept." }
];

export const practiceTestsList = [
  {
    id: "sat-full-1",
    title: "MINDORA SAT Practice Test #1",
    type: "Full SAT Exam",
    duration: "134 mins",
    questions: 98,
    sections: ["Reading & Writing (2 modules)", "Math (2 modules)"],
    difficulty: "Adaptive Benchmark",
    bestScore: "1320",
    lastAttempt: "3 days ago",
    status: "Completed",
    previousScore: "1280",
    scoreDelta: "+40 pts"
  },
  {
    id: "sat-math-1",
    title: "MINDORA Math Diagnostic Drill — Module 2 (Hard)",
    type: "Math Section",
    duration: "70 mins",
    questions: 44,
    sections: ["Algebra", "Advanced Math", "Problem Solving", "Geometry"],
    difficulty: "Challenging",
    bestScore: "690",
    lastAttempt: "Yesterday",
    status: "Ready",
    previousScore: "640",
    scoreDelta: "+50 pts"
  },
  {
    id: "sat-rw-1",
    title: "MINDORA Reading & Writing Focus Module",
    type: "Reading & Writing",
    duration: "64 mins",
    questions: 54,
    sections: ["Craft & Structure", "Information & Ideas", "Expression"],
    difficulty: "Standard",
    bestScore: "630",
    lastAttempt: "5 days ago",
    status: "Ready",
    previousScore: "590",
    scoreDelta: "+40 pts"
  }
];
