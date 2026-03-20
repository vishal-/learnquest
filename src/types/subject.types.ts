export const CourseCategory = {
  LEARN: "learn",
  PRACTICE: "practice",
  CHALLENGE: "challenge",
} as const;

export type CourseCategoryType =
  (typeof CourseCategory)[keyof typeof CourseCategory];

export const SubjectId = {
  GENERAL: "g.k",
  HINDI: "hindi",
  MATHS: "maths",
  STEM: "stem",
  WORLD: "world",
} as const;

export type SubjectIdType = (typeof SubjectId)[keyof typeof SubjectId];

export interface Course {
  id: string;
  subjectId: string;
  label: string;
  description: string;
  icon: string;
  route: string;
  component: string;
  category: CourseCategoryType;
}

export interface Subject {
  id: string;
  label: string;
  description: string;
  route: string;
  courses: Course[];
  icon: string;
  bg: string;
  shadow: string;
  rotate: string;
  pageBackground: string;
}
