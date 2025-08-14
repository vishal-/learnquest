import React, { useState, useEffect } from "react";
import { units } from "../../../lib/units";
import type { Course } from "../../../types/subject.types";

const Units: React.FC<{ course: Course }> = ({ course: { description } }) => {
  const allCategories = Object.keys(units);
  const [currentUnit, setCurrentUnit] = useState<string>("");
  const [correctCategory, setCorrectCategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [randomizedCategories, setRandomizedCategories] = useState<string[]>(
    []
  );

  const loadNewUnit = () => {
    setSelectedCategory(null);
    setIsCorrect(null);
    const randomCategory =
      allCategories[Math.floor(Math.random() * allCategories.length)];
    setCorrectCategory(randomCategory);
    const unitsInCategory = units[randomCategory];
    const randomUnit =
      unitsInCategory[Math.floor(Math.random() * unitsInCategory.length)];
    setCurrentUnit(randomUnit);
    const shuffled = [...allCategories].sort(() => Math.random() - 0.5);
    setRandomizedCategories(shuffled);
  };

  useEffect(() => {
    loadNewUnit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCorrect(category === correctCategory);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[var(--color-background)]">
      <div className="mb-3 text-center w-full max-w-lg">
        <h2
          className="text-xl mb-3 text-white"
          style={{ fontFamily: "var(--font-kids)" }}
        >
          {description}
        </h2>
      </div>
      <div className="bg-white-300 rounded-2xl shadow-xl px-3 py-4 mb-8  border-2 border-[var(--color-accent)]">
        <h1
          className="text-2xl font-extrabold text-gray-400"
          style={{ fontFamily: "var(--font-kids)" }}
        >
          {currentUnit}
        </h1>
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-4 w-full max-w-xl">
        {randomizedCategories.map((category) => (
          <button
            key={category}
            className={`px-6 py-3 rounded-full font-bold shadow-md transition-all duration-200
              ${
                selectedCategory === category
                  ? isCorrect
                    ? "bg-green-400 text-white scale-105"
                    : "bg-red-400 text-white scale-105"
                  : "bg-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-hover)] hover:text-white"
              }
              ${
                selectedCategory !== null ? "cursor-not-allowed opacity-70" : ""
              }
            `}
            style={{ fontFamily: "var(--font-kids)" }}
            onClick={() => handleCategorySelect(category)}
            disabled={selectedCategory !== null}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory !== null && (
        <div className="text-center mb-8">
          <p
            className={`text-xl font-bold transition-all duration-200
            ${isCorrect ? "text-green-600" : "text-red-600"}`}
            style={{ fontFamily: "var(--font-kids)" }}
          >
            {isCorrect
              ? "🎉 Correct!"
              : `❌ Incorrect! The correct category is ${correctCategory}`}
          </p>
        </div>
      )}

      <button
        className="bg-[var(--color-secondary)] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-[var(--color-accent)] transition-all"
        style={{ fontFamily: "var(--font-kids)" }}
        onClick={loadNewUnit}
      >
        New Unit
      </button>
    </div>
  );
};

export default Units;
