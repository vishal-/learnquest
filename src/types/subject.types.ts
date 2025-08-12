export interface Course {
  label: string;
  description: string;
  image: string;
  route: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}

export interface Subject extends Course {
  courses: Course[];
}
