const CourseContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[var(--color-background)]">
      <div className="max-w-4xl w-full p-4">{children}</div>
    </div>
  );
};

const Title: React.FC<{ description: string }> = ({ description }) => {
  return <h2 className="text-xl my-6 text-white text-center">{description}</h2>;
};

const Framed: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white-300 rounded-2xl shadow-xl p-6 mb-8  border-1 border-[var(--color-accent)]">
      <h1
        className="text-3xl font-extrabold text-gray-400"
        style={{ fontFamily: "var(--font-kids)" }}
      >
        {children}
      </h1>
    </div>
  );
};

CourseContent.Title = Title;
CourseContent.Framed = Framed;

CourseContent.displayName = "CourseContent";

export default CourseContent;
