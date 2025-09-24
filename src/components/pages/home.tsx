import React from "react";
import Tile from "../ui/tile";
import { useSubjects } from "../../hooks/useSubjects";
import Loader from "../ui/loader";

const HomePage: React.FC = () => {
  const { subjects, loading, error } = useSubjects();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error loading subjects: {error.message}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-background text-text flex flex-col items-center">
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {subjects.map((subject) => (
          <Tile
            key={subject.id}
            imageSrc={subject.image}
            label={subject.label}
            route={subject.route}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
