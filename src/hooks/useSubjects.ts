import { getCombinedSubjectsData } from "../lib/subjects";

export const useSubjects = () => {
    return {
        subjects: getCombinedSubjectsData(),
    };
};
