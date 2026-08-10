export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  type: "video" | "reading" | "practice";
  completed: boolean;
};

export type Course = {
  slug: string;
  title: string;
  subject: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  instructor: string;
  hours: number;
  rating: number;
  learners: number;
  progress: number;
  outcomes: string[];
  lessons: Lesson[];
};

export type QuizQuestion = {
  id: string;
  courseSlug: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

const lessons = (items: [string, number, Lesson["type"], boolean][]): Lesson[] =>
  items.map(([title, minutes, type, completed], i) => ({
    id: `l${i + 1}`,
    title,
    minutes,
    type,
    completed,
  }));

export const courses: Course[] = [
  {
    slug: "ai-foundations",
    title: "AI Foundations: From Neurons to Networks",
    subject: "Artificial Intelligence",
    level: "Beginner",
    summary:
      "Build a working mental model of modern AI — perceptrons, gradient descent, and why deep networks generalise.",
    instructor: "Dr. Anaya Rao",
    hours: 12,
    rating: 4.8,
    learners: 18420,
    progress: 62,
    outcomes: [
      "Explain how a neural network learns from data",
      "Implement gradient descent by hand",
      "Evaluate a model with the right metric",
      "Spot overfitting before it costs you",
    ],
    lessons: lessons([
      ["What intelligence means to a machine", 14, "video", true],
      ["The perceptron, step by step", 22, "video", true],
      ["Loss functions and gradient descent", 26, "reading", true],
      ["Backpropagation intuition", 30, "video", false],
      ["Practice: train a tiny network", 45, "practice", false],
      ["Regularisation and generalisation", 24, "reading", false],
    ]),
  },
  {
    slug: "calculus-in-motion",
    title: "Calculus in Motion",
    subject: "Mathematics",
    level: "Intermediate",
    summary:
      "Limits, derivatives and integrals taught through animation, physics and real measurement problems.",
    instructor: "Prof. Miguel Santos",
    hours: 16,
    rating: 4.7,
    learners: 9310,
    progress: 28,
    outcomes: [
      "Differentiate confidently with the chain rule",
      "Model rates of change in physical systems",
      "Compute definite integrals and areas",
      "Translate a word problem into calculus",
    ],
    lessons: lessons([
      ["Limits without the hand-waving", 18, "video", true],
      ["The derivative as a rate", 21, "video", true],
      ["Chain, product and quotient rules", 28, "practice", false],
      ["Integration as accumulation", 25, "video", false],
      ["Applications in physics", 32, "reading", false],
    ]),
  },
  {
    slug: "python-for-data",
    title: "Python for Data Work",
    subject: "Programming",
    level: "Beginner",
    summary:
      "Go from first script to reproducible analysis with pandas, plotting and clean, testable code.",
    instructor: "Leila Haddad",
    hours: 10,
    rating: 4.9,
    learners: 26780,
    progress: 88,
    outcomes: [
      "Write readable, tested Python",
      "Reshape and clean messy datasets",
      "Visualise findings that persuade",
      "Structure a reproducible analysis",
    ],
    lessons: lessons([
      ["Setting up and running Python", 12, "video", true],
      ["Lists, dicts and comprehensions", 20, "practice", true],
      ["pandas essentials", 27, "video", true],
      ["Cleaning real-world data", 30, "practice", true],
      ["Plotting that communicates", 22, "reading", false],
    ]),
  },
  {
    slug: "quantum-primer",
    title: "A Quantum Computing Primer",
    subject: "Physics",
    level: "Advanced",
    summary:
      "Qubits, superposition and entanglement explained with linear algebra you already know.",
    instructor: "Dr. Ito Nakamura",
    hours: 14,
    rating: 4.6,
    learners: 4120,
    progress: 5,
    outcomes: [
      "Read and write quantum circuit diagrams",
      "Reason about superposition and measurement",
      "Follow Grover's and Shor's algorithms",
      "Assess what quantum hardware can do today",
    ],
    lessons: lessons([
      ["Qubits and the Bloch sphere", 24, "video", true],
      ["Gates as unitary matrices", 29, "reading", false],
      ["Entanglement and Bell states", 26, "video", false],
      ["Grover's search", 34, "practice", false],
    ]),
  },
  {
    slug: "learning-science",
    title: "The Science of Learning Fast",
    subject: "Study Skills",
    level: "Beginner",
    summary:
      "Spaced repetition, retrieval practice and interleaving — the evidence and how to actually apply it.",
    instructor: "Dr. Hannah Weiss",
    hours: 6,
    rating: 4.9,
    learners: 33150,
    progress: 44,
    outcomes: [
      "Design a spaced repetition schedule",
      "Use retrieval practice daily",
      "Interleave topics to boost transfer",
      "Diagnose why a topic isn't sticking",
    ],
    lessons: lessons([
      ["Why re-reading fails", 11, "video", true],
      ["Retrieval practice in 10 minutes a day", 16, "practice", true],
      ["Spacing schedules that work", 19, "reading", false],
      ["Interleaving and desirable difficulty", 21, "video", false],
    ]),
  },
  {
    slug: "prompt-engineering",
    title: "Prompt Engineering for Students",
    subject: "Artificial Intelligence",
    level: "Intermediate",
    summary:
      "Turn an AI assistant into a rigorous study partner instead of an answer vending machine.",
    instructor: "Sam Okoye",
    hours: 5,
    rating: 4.5,
    learners: 15990,
    progress: 0,
    outcomes: [
      "Write prompts that produce reasoning, not guesses",
      "Build Socratic study loops",
      "Check AI output for hallucination",
      "Create your own revision generators",
    ],
    lessons: lessons([
      ["Anatomy of a strong prompt", 13, "video", false],
      ["Socratic tutoring patterns", 18, "reading", false],
      ["Verification habits", 15, "practice", false],
    ]),
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    courseSlug: "ai-foundations",
    prompt: "What does a loss function measure during training?",
    options: [
      "How much memory the model uses",
      "The gap between predictions and the true labels",
      "The number of layers in the network",
      "How fast the GPU runs",
    ],
    answerIndex: 1,
    explanation:
      "The loss quantifies prediction error; gradient descent adjusts weights to reduce it.",
  },
  {
    id: "q2",
    courseSlug: "ai-foundations",
    prompt: "A model scores 99% on training data and 61% on unseen data. This is:",
    options: ["Underfitting", "Overfitting", "Perfect generalisation", "Data leakage from the test set"],
    answerIndex: 1,
    explanation:
      "A large train/test gap is the classic signature of overfitting — the model memorised rather than generalised.",
  },
  {
    id: "q3",
    courseSlug: "calculus-in-motion",
    prompt: "The derivative of a position function with respect to time gives:",
    options: ["Acceleration", "Displacement", "Velocity", "Total distance"],
    answerIndex: 2,
    explanation: "First derivative of position is velocity; the second derivative is acceleration.",
  },
  {
    id: "q4",
    courseSlug: "python-for-data",
    prompt: "Which pandas call removes rows containing missing values?",
    options: ["df.fillna()", "df.dropna()", "df.isna()", "df.replace()"],
    answerIndex: 1,
    explanation: "dropna() drops them; fillna() imputes; isna() only flags them.",
  },
  {
    id: "q5",
    courseSlug: "learning-science",
    prompt: "Which study technique has the strongest evidence for long-term retention?",
    options: ["Highlighting", "Re-reading notes", "Spaced retrieval practice", "Listening to lectures twice"],
    answerIndex: 2,
    explanation:
      "Testing yourself at increasing intervals beats passive review in nearly every controlled study.",
  },
];

export const learner = {
  name: "Dhruv",
  streak: 12,
  minutesThisWeek: 265,
  weeklyGoal: 300,
  xp: 8460,
  level: 7,
  badges: ["12-day streak", "Quiz ace", "Night owl", "First course finished"],
  activity: [
    { day: "Mon", minutes: 45 },
    { day: "Tue", minutes: 30 },
    { day: "Wed", minutes: 62 },
    { day: "Thu", minutes: 18 },
    { day: "Fri", minutes: 55 },
    { day: "Sat", minutes: 40 },
    { day: "Sun", minutes: 15 },
  ],
};

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

/** Deterministic offline "AI" tutor used for the demo experience. */
export function tutorReply(question: string): string {
  const q = question.toLowerCase();

  if (/derivative|calculus|integral/.test(q)) {
    return "Let's reason it out together. A derivative is a rate of change: how much the output moves for a tiny nudge in the input. Try this — for f(x) = 3x², what happens to f when x grows by a hair? Apply the power rule (bring the exponent down, subtract one) and tell me what you get. I'll check your reasoning, not just the answer.";
  }
  if (/neural|gradient|overfit|machine learning|ai\b/.test(q)) {
    return "Good question. A network learns by making a prediction, measuring how wrong it was with a loss function, and nudging every weight slightly in the direction that reduces that loss. Two checks for you: (1) what happens to training if the learning rate is far too large? (2) how would you tell overfitting apart from underfitting using only two numbers?";
  }
  if (/python|pandas|code|bug/.test(q)) {
    return "Let's debug it the way a professional would. First, state what you expected the code to do; second, what it actually did; third, the smallest input that still reproduces it. Paste that minimal snippet here and I'll walk you through the fix line by line.";
  }
  if (/quantum|qubit|entangle/.test(q)) {
    return "A qubit is a unit vector in a two-dimensional complex space — |0⟩ and |1⟩ are just basis vectors. Superposition is any α|0⟩ + β|1⟩ with |α|² + |β|² = 1. Question back to you: if α = β = 1/√2, what probability do you get on measurement, and why does the sign of β not change it?";
  }
  if (/study|memor|exam|revis|focus/.test(q)) {
    return "Here's an evidence-backed plan: 25 minutes of focused retrieval practice, 5-minute break, repeat three times. Do not re-read — close the book and write what you remember, then check. Space the same material again at 1 day, 3 days and 7 days. Which topic should we build the first schedule around?";
  }
  return "Great starting point. Before I explain, tell me what you already believe is true about this topic — even a rough guess. I'll show you exactly which part of your intuition is right, patch the part that isn't, and then give you one practice problem to lock it in.";
}
