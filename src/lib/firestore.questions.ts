import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase.config";
import type { Question } from "../types/quiz.type";

const QUESTIONS_COLLECTION = "quiz_questions";

/**
 * Save multiple questions to Firestore
 */
export const saveQuestions = async (
    questions: Omit<Question, "id" | "createdAt">[]
): Promise<string[]> => {
    const questionIds: string[] = [];

    for (const question of questions) {
        try {
            const docRef = await addDoc(collection(db, QUESTIONS_COLLECTION), {
                ...question,
                createdAt: Timestamp.now(),
            });
            questionIds.push(docRef.id);
        } catch (error) {
            console.error("Error saving question:", error);
            throw error;
        }
    }

    return questionIds;
};

/**
 * Get all questions
 */
export const getAllQuestions = async (): Promise<Question[]> => {
    try {
        const querySnapshot = await getDocs(
            collection(db, QUESTIONS_COLLECTION)
        );
        const questions: Question[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            questions.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
            } as Question);
        });

        return questions;
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
    }
};

/**
 * Get questions by subject
 */
export const getQuestionsBySubject = async (
    subject: string
): Promise<Question[]> => {
    try {
        const q = query(
            collection(db, QUESTIONS_COLLECTION),
            where("subject", "==", subject)
        );
        const querySnapshot = await getDocs(q);
        const questions: Question[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            questions.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
            } as Question);
        });

        return questions;
    } catch (error) {
        console.error("Error fetching questions by subject:", error);
        throw error;
    }
};

/**
 * Get questions by difficulty
 */
export const getQuestionsByDifficulty = async (
    difficulty: string
): Promise<Question[]> => {
    try {
        const q = query(
            collection(db, QUESTIONS_COLLECTION),
            where("difficulty", "==", difficulty)
        );
        const querySnapshot = await getDocs(q);
        const questions: Question[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            questions.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
            } as Question);
        });

        return questions;
    } catch (error) {
        console.error("Error fetching questions by difficulty:", error);
        throw error;
    }
};

/**
 * Get a single question by ID
 */
export const getQuestionById = async (questionId: string): Promise<Question | null> => {
    try {
        const docSnap = await getDocs(collection(db, QUESTIONS_COLLECTION));

        let question: Question | null = null;
        docSnap.forEach((doc) => {
            if (doc.id === questionId) {
                const data = doc.data();
                question = {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate() || new Date(),
                } as Question;
            }
        });

        return question;
    } catch (error) {
        console.error("Error fetching question:", error);
        throw error;
    }
};

/**
 * Update a question
 */
export const updateQuestion = async (
    questionId: string,
    updates: Partial<Question>
): Promise<void> => {
    try {
        const updateRef = doc(db, QUESTIONS_COLLECTION, questionId);
        const { id, createdAt, ...updateData } = updates;

        await updateDoc(updateRef, {
            ...updateData,
            updatedAt: Timestamp.now(),
        });
    } catch (error) {
        console.error("Error updating question:", error);
        throw error;
    }
};

/**
 * Delete a question
 */
export const deleteQuestion = async (questionId: string): Promise<void> => {
    try {
        const docRef = doc(db, QUESTIONS_COLLECTION, questionId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting question:", error);
        throw error;
    }
};

/**
 * Batch save questions (for bulk imports)
 */
export const batchSaveQuestions = async (
    questions: Omit<Question, "id" | "createdAt">[]
): Promise<{ success: number; failed: number; errors: string[] }> => {
    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    for (let i = 0; i < questions.length; i++) {
        try {
            await addDoc(collection(db, QUESTIONS_COLLECTION), {
                ...questions[i],
                createdAt: Timestamp.now(),
            });
            success++;
        } catch (error) {
            failed++;
            errors.push(
                `Question ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}`
            );
        }
    }

    return { success, failed, errors };
};
