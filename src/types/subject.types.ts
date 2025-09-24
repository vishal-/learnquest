export interface Course {
  id: string;
  subjectId: string;
  label: string;
  description: string;
  image: string;
  route: string;
  component: string;
}

export interface Subject {
  id: string;
  label: string;
  description: string;
  image: string;
  route: string;
  courses: Course[];
}
