export type BoardContent = {
  topic: string;
  title: string;
  points: string[];
  formula?: string;
  aside?: string;
};

const boards: { test: RegExp; board: BoardContent }[] = [
  {
    test: /derivative|calculus|integral|chain rule/,
    board: {
      topic: "Calculus",
      title: "The derivative = rate of change",
      points: [
        "Nudge x by a tiny h, watch f move",
        "Slope of that nudge → the derivative",
        "Power rule: drop the exponent, subtract one",
      ],
      formula: "f(x) = 3x²  →  f'(x) = 6x",
      aside: "Try f(x) = x³ next",
    },
  },
  {
    test: /neural|gradient|overfit|machine learning|model|ai\b/,
    board: {
      topic: "Machine Learning",
      title: "How a network actually learns",
      points: [
        "Predict → measure error → nudge weights",
        "Loss = distance from the truth",
        "Big train/test gap = overfitting",
      ],
      formula: "w ← w − η · ∂L/∂w",
      aside: "η too large ⇒ training diverges",
    },
  },
  {
    test: /python|pandas|code|bug|error/,
    board: {
      topic: "Programming",
      title: "Debug like a professional",
      points: [
        "1. What you expected",
        "2. What actually happened",
        "3. Smallest input that reproduces it",
      ],
      formula: "df.dropna()  ≠  df.fillna(0)",
      aside: "Shrink the example before you fix it",
    },
  },
  {
    test: /quantum|qubit|entangle|superposition/,
    board: {
      topic: "Quantum Computing",
      title: "A qubit is a unit vector",
      points: [
        "|0⟩ and |1⟩ are just basis vectors",
        "Superposition mixes them with amplitudes",
        "Measurement squares those amplitudes",
      ],
      formula: "|ψ⟩ = α|0⟩ + β|1⟩,  |α|² + |β|² = 1",
      aside: "α = β = 1/√2 ⇒ 50 / 50",
    },
  },
  {
    test: /study|memor|exam|revis|focus|schedule/,
    board: {
      topic: "Study Science",
      title: "Retrieval beats re-reading",
      points: [
        "Close the book, write what you recall",
        "Check, then patch only the gaps",
        "Revisit at 1 day, 3 days, 7 days",
      ],
      formula: "25 min focus + 5 min break  × 3",
      aside: "Passive review feels good, works worst",
    },
  },
];

const fallback: BoardContent = {
  topic: "Warm-up",
  title: "Start from what you already believe",
  points: [
    "State your rough guess out loud",
    "We keep the right half of your intuition",
    "Then one practice problem to lock it in",
  ],
  formula: "guess → test → correct → repeat",
  aside: "Ask me anything on the left",
};

export function boardFor(question: string): BoardContent {
  const q = question.toLowerCase();
  return boards.find((b) => b.test.test(q))?.board ?? fallback;
}

export const welcomeBoard = fallback;
