import { SubjectId } from "../types/subject.types";

export const subjectStyles = {
    [SubjectId.TRIVIA]: {
        bg: "#4b1212",
        shadow: "#C94B4B",
        rotate: "-3deg",
        pageBackground: "#cdb4db",
    },
    [SubjectId.STEM]: {
        bg: "#223f6d",
        shadow: "#2D6FD4",
        rotate: "3deg",
        pageBackground: "#ffc8dd",
    },
    [SubjectId.MATHS]: {
        bg: "#1e7962",
        shadow: "#2A9D7A",
        rotate: "-2deg",
        pageBackground: "#ffafcc",
    },
    [SubjectId.HINDI]: {
        bg: "#c97c34",
        shadow: "#C97A20",
        rotate: "2deg",
        pageBackground: "#bde0fe",
    },
    [SubjectId.ENGLISH]: {
        bg: "#2c5f8d",
        shadow: "#4A90E2",
        rotate: "1deg",
        pageBackground: "#fff4e6",
    },
    [SubjectId.WORLD]: {
        bg: "#523e8f",
        shadow: "#7C5DC9",
        rotate: "-1deg",
        pageBackground: "#a2d2ff",
    },
} as const;
