import React from "react";
import Tile from "../ui/Tile";

const HomePage: React.FC = () => {
  return (
    <div className="p-4 bg-background text-text">
      <h1 className="text-2xl font-bold text-accent">Welcome to LearnQuest!</h1>
      <p className="mt-2">
        This is a fun and interactive learning platform for kids.
      </p>

      <Tile
        imageSrc="https://pics.s4v.my/uploads/img_1754910824338_5uk5a2dgkxe.jpg"
        label="Learn"
        route="/poc"
      />
    </div>
  );
};

export default HomePage;
