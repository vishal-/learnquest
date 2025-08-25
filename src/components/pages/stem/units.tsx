import React, { useState, useEffect, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import type { Course } from "../../../types/subject.types";
import CourseContent from "../../ui/courseContent";
import Button from "../../ui/button";
import Feedback from "../../ui/feedback";
import Loader from "../../ui/loader";

const Units: React.FC<{ course: Course }> = ({ course: { description } }) => {
  const [units, setUnits] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const allCategories = Object.keys(units);
  const [currentUnit, setCurrentUnit] = useState<string>("");
  const [correctCategory, setCorrectCategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [randomizedCategories, setRandomizedCategories] = useState<string[]>(
    []
  );

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "datasets", "unit-types");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Validate data structure
          if (data && typeof data === "object") {
            setUnits(data as Record<string, string[]>);
          } else {
            setError("Invalid data format in Firestore");
          }
        } else {
          setError("No such document exists!");
        }
      } catch (err) {
        console.error("Error fetching units:", err);
        setError("Failed to fetch units. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  useEffect(() => {
    if (Object.keys(units).length > 0) {
      loadNewUnit();
    }
  }, [units]);

  const loadNewUnit = useCallback(() => {
    if (allCategories.length === 0) return;
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
  }, [allCategories, units]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCorrect(category === correctCategory);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
