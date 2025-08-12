import type { Subject } from "../../../types/subject.types";

const SubjectLayout: React.FC<{ subject: Subject }> = ({ subject }) => {
  return <div>{subject.label}</div>;
};

export default SubjectLayout;
