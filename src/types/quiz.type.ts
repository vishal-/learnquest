export const QuizSubject = {
    MATH: "Math",
    SCIENCE: "Science",
    ENGLISH: "English",
    HISTORY: "History",
    GEOGRAPHY: "Geography",
    ARTS: "Arts",
    TECHNOLOGY: "Technology",
    HEALTH: "Health",
    SPORTS: "Sports",
    GENERAL: "General Knowledge",
} as const;

export const QuizDifficulty = {
    CURIOUS: "Curious", // Easy (ages 3–7)
    CLEVER: "Clever", // Medium (ages 8–13)
    GENIUS: "Genius", // Hard (ages 14–18)
} as const;

export interface Question {
    id: string;
    subject: QuizSubject;
    difficulty: QuizDifficulty;
    question: string;
    options: string[];  // Array of 4 options (A, B, C, D)
    answer: string;   // The correct answer (e.g. "A", "B", "C", or "D")    
    explanation: string;
    createdAt: Date;
}

export type QuizSubject = typeof QuizSubject[keyof typeof QuizSubject];
export type QuizDifficulty = typeof QuizDifficulty[keyof typeof QuizDifficulty];
