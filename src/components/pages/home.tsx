import React from "react";
import Tile from "../ui/tile";
import { appSubjects } from "../../config/subjects";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen p-6 bg-background text-text flex flex-col items-center">
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {appSubjects.map((subject) => (
          <Tile
            key={subject.label}
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
