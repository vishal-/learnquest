import { getCombinedSubjectsData } from "../lib/subjectsData.constants";

export const useSubjects = () => {
    return {
        subjects: getCombinedSubjectsData(),
    };
};
