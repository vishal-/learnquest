const CourseContent = ({ children }: { children: React.ReactNode }) => {
  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the default context menu from appearing
    event.preventDefault();
    console.log("Right-click disabled on this component");
  };

  return (
    <div className="max-w-lg mx-auto" onContextMenu={handleContextMenu}>
      {children}
    </div>
  );
};

const Title: React.FC<{ description: string }> = ({ description }) => {
  return (
    <h2 className="text-xl mt-2 mb-6 text-white text-center">{description}</h2>
  );
};

const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h3 className="text-lg my-4 text-white text-center">{children}</h3>;
};

const Framed: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white-300 rounded-2xl shadow-xl p-6 my-9  border-1 border-[var(--color-accent)]">
      <h1 className="text-3xl font-extrabold text-gray-400 text-center">
        {children}
      </h1>
    </div>
  );
};

CourseContent.Title = Title;
CourseContent.SubTitle = SubTitle;
CourseContent.Framed = Framed;

CourseContent.displayName = "CourseContent";

export default CourseContent;
