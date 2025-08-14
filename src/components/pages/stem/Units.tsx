import React, { useState, useEffect } from "react";
import { units } from "../../../lib/units";
import type { Course } from "../../../types/subject.types";
import CourseContent from "../../ui/courseContent";
import Button from "../../ui/button";
import Feedback from "../../ui/feedback";

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
    <CourseContent>
      <CourseContent.Title description={description} />

      <CourseContent.Framed>{currentUnit}</CourseContent.Framed>

      <div className="mb-10 flex flex-wrap justify-center gap-4 w-full max-w-xl">
        {randomizedCategories.map((category) => (
          <Button
            key={category}
            variant="secondary"
            onClick={() => handleCategorySelect(category)}
            label={category}
          />
        ))}
      </div>

      <div className="text-center mb-6">
        <Button onClick={loadNewUnit} label="New Unit" />
      </div>

      {selectedCategory !== null && (
        <Feedback
          message={
            isCorrect
              ? "🎉 Correct!"
              : `❌ Incorrect! The correct category is ${correctCategory}`
          }
          variant={isCorrect ? "success" : "danger"}
        />
      )}
    </CourseContent>
  );
};

export default Units;
