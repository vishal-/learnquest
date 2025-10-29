import { useState, useEffect } from "react";
import { getFlags } from "../../../lib/firestore";
import { appConfig } from "../../../config/app.config";
import Button from "../../ui/button";
import CourseContent from "../../ui/courseContent";

interface FlagData {
  image: string;
  thumbnail: string;
}

export default function ChallengeFlags() {
  const [flags, setFlags] = useState<Record<string, FlagData>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [questions, setQuestions] = useState<
    Array<{
      country: string;
      flag: FlagData;
      options: string[];
    }>
  >([]);

  useEffect(() => {
    const loadFlags = async () => {
      const flagsData = await getFlags();
      setFlags(flagsData);
    };
    loadFlags();
  }, []);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameEnded(true);
    }
  }, [gameStarted, timeLeft, gameEnded]);

  const generateQuestions = () => {
    const countries = Object.keys(flags);
    const selectedCountries = countries
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    const newQuestions = selectedCountries.map((country) => {
      const wrongOptions = countries
        .filter((c) => c !== country)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      const options = [country, ...wrongOptions].sort(
        () => 0.5 - Math.random()
      );

      return {
        country,
        flag: flags[country],
        options
      };
    });

    setQuestions(newQuestions);
  };

  const startGame = () => {
    generateQuestions();
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setGameEnded(false);
  };

  const handleAnswer = (selectedCountry: string) => {
    if (selectedCountry === questions[currentQuestion].country) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameEnded(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
  };

  if (Object.keys(flags).length === 0) {
    return <div className="p-4">Loading flags...</div>;
  }

  if (!gameStarted) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">🏳️ Challenge - Flags</h1>
        <p className="text-lg mb-6">Identify 10 flags in 30 seconds!</p>
        <button
          onClick={startGame}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
        >
          Start Challenge
        </button>
      </div>
    );
  }

  if (gameEnded) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">🏳️ Challenge Complete!</h1>
        <p className="text-2xl mb-4">Score: {score}/10</p>
        <p className="text-lg mb-6">
          {score >= 8
            ? "Excellent! 🎉"
            : score >= 6
            ? "Good job! 👍"
            : "Keep practicing! 💪"}
        </p>
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <CourseContent>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Question {currentQuestion + 1}/10
        </h1>
        <div className="text-xl font-bold text-red-500">⏰ {timeLeft}s</div>
        <div className="text-xl font-bold">Score: {score}</div>
      </div>

      <CourseContent.Framed>
        <img
          src={`${appConfig.baseImagePath}/flags/thumbs/${currentQ.flag.thumbnail}`}
          alt="Flag to identify"
          className="mx-auto w-48 h-32 object-contain border-2 border-gray-300 rounded"
        />
      </CourseContent.Framed>

      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {currentQ.options.map((option, index) => (
          <Button
            variant="option"
            onClick={() => handleAnswer(option)}
            key={index}
            label={option}
          />
        ))}
      </div>
    </CourseContent>
  );
}
