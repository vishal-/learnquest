export enum CourseCategory {
  LEARN = "learn",
  PRACTICE = "practice",
  CHALLENGE = "challenge",
}

export interface Course {
  id: string;
  subjectId: string;
  label: string;
  description: string;
  icon: string;
  route: string;
  component: string;
  category: CourseCategory;
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
