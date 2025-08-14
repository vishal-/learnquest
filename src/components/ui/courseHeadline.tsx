const CourseHeadline: React.FC<{ description: string }> = ({ description }) => {
  return <h2 className="text-xl my-6 text-white text-center">{description}</h2>;
};

export default CourseHeadline;
