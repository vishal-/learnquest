import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { db } from "../config/firebase.config";
import type { Subject, Course } from "../types/subject.types";

// --- Type Guards ---
function isCourse(data: DocumentData, _: string): data is Course {
  const d = data as Partial<Course>;
  return (
    d.subjectId !== undefined &&
    d.label !== undefined &&
    d.description !== undefined &&
    d.image !== undefined &&
    d.route !== undefined &&
    d.component !== undefined
  );
}

function isSubject(data: DocumentData, _: string): data is Subject {
  const d = data as Partial<Subject>;
  return (
    d.label !== undefined &&
    d.description !== undefined &&
    d.image !== undefined &&
    d.route !== undefined
  );
}

// --- Store Definition ---
interface SubjectsState {
  subjects: Subject[];
  loading: boolean;
  error: Error | null;
  fetchSubjects: () => Promise<void>;
}

export const useSubjectsStore = create<SubjectsState>((set, get) => ({
  subjects: [],
  loading: true,
  error: null,
  fetchSubjects: async () => {
    // Prevent re-fetching if data already exists
    if (get().subjects.length > 0) {
      set({ loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      console.log("Fetching data from Firestore for Zustand store...");

      const coursesCollection = collection(db, "courses");
      const courseSnapshot = await getDocs(coursesCollection);
      const coursesData: Course[] = [];
      courseSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        if (isCourse(data, id)) {
          coursesData.push({ ...data, id });
        }
      });

      const subjectsCollection = collection(db, "subjects");
      const subjectSnapshot = await getDocs(subjectsCollection);
      const subjectsData: Subject[] = [];
      subjectSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        if (isSubject(data, id)) {
          subjectsData.push({ ...data, id, courses: [] });
        }
      });

      const combinedData = subjectsData.map((subject) => ({
        ...subject,
        courses: coursesData.filter((course) => course.subjectId === subject.id)
      }));

      set({ subjects: combinedData, loading: false });
      console.log("Zustand store updated successfully.");
    } catch (err) {
      console.error("Error fetching data for Zustand store:", err);
      if (err instanceof Error) {
        set({ error: err, loading: false });
      } else {
        set({ error: new Error("An unknown error occurred."), loading: false });
      }
    }
  }
}));
