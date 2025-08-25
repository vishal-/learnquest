import React, { useState, useEffect, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase.config";
import type { Course } from "../../../types/subject.types";
import CourseContent from "../../ui/courseContent";
import Button from "../../ui/button";
import Feedback from "../../ui/feedback";
import Loader from "../../ui/loader";

const getRandomElements = <T,>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

type CountryCapitalMap = Record<string, string>;

const CapitalOfCountries: React.FC<{ course: Course }> = ({
  course: { description }
}) => {
  const [countriesAndCapitals, setCountriesAndCapitals] =
    useState<CountryCapitalMap>({});
  const [loading, setLoading] = useState(true);
  const [currentCountry, setCurrentCountry] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctCapital, setCorrectCapital] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchCapitals = async () => {
      setLoading(true);
      const docRef = doc(db, "datasets", "capitals-of-countries");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCountriesAndCapitals(docSnap.data() as CountryCapitalMap);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchCapitals();
  }, []);

  const generateQuestion = useCallback(() => {
    if (Object.keys(countriesAndCapitals).length === 0) return;

    const countries = Object.keys(countriesAndCapitals);
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    const correctAnswer = countriesAndCapitals[randomCountry];
    const capitalsPool = Object.values(countriesAndCapitals).filter(
      (c) => c !== correctAnswer
    );
    const wrongOptions = getRandomElements(capitalsPool, 5);
    const allOptions = getRandomElements([...wrongOptions, correctAnswer], 6);

    setCurrentCountry(randomCountry);
    setCorrectCapital(correctAnswer);
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
  }, [countriesAndCapitals]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === correctCapital);
  };

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  if (loading) {
    return (
      <CourseContent>
        <CourseContent.Title description={description} />
        <Loader />
      </CourseContent>
    );
  }

  return (
    <CourseContent>
      <CourseContent.Title description={description} />

      <CourseContent.Framed>{currentCountry}</CourseContent.Framed>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {options.map((option) => (
          <Button
            key={option}
            label={option}
            variant={
              option === selectedOption
                ? isCorrect
                  ? "success"
                  : "danger"
                : "option"
            }
            onClick={() => handleOptionClick(option)}
            disabled={!!selectedOption}
          />
        ))}
      </div>

      <div className="text-center mb-6">
        <Button
          onClick={generateQuestion}
          variant="primary"
          label="Next Country"
        />
      </div>

      {selectedOption && (
        <Feedback
          variant={isCorrect ? "success" : "danger"}
          message={isCorrect ? "✅ Correct!" : "❌ Wrong."}
        />
      )}
    </CourseContent>
  );
};

export default CapitalOfCountries;
