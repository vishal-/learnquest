import { useState, useEffect, useRef, useCallback } from "react";
import { speak } from "../../../lib/speak";
import type { Course } from "../../../types/subject.types";
import Button from "../../ui/button";
import Feedback from "../../ui/feedback";
import CourseContent from "../../ui/courseContent";
import Input from "../../ui/input";
import ConfettiBurst from "../../ui/confettiBurst";
import StreakBadge from "../../ui/streakBadge";

// ─── Main Component ────────────────────────────────────────────────────────

export default function ReadTheClock({ course }: { course: Course }) {
  const [randomHour, setRandomHour] = useState(
    () => Math.floor(Math.random() * 12) + 1
  );
  const [randomMinute, setRandomMinute] = useState(() =>
    Math.floor(Math.random() * 60)
  );
  const [guessedHour, setGuessedHour] = useState("");
  const [guessedMinute, setGuessedMinute] = useState("");
  const [answered, setAnswered] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [showFeedbackToast, setShowFeedbackToast] = useState(false);
  const [feedbackIsCorrect, setFeedbackIsCorrect] = useState<boolean | null>(
    null
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreakBadge, setShowStreakBadge] = useState(false);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateNewTime = useCallback(() => {
    setRandomHour(Math.floor(Math.random() * 12) + 1);
    setRandomMinute(Math.floor(Math.random() * 60));
    setGuessedHour("");
    setGuessedMinute("");
    setAnswered(false);
    setFeedbackMsg("");
    setShowFeedbackToast(false);
    setFeedbackIsCorrect(null);
    setShowStreakBadge(false);
  }, []);

  const checkAnswer = () => {
    const hourGuess = parseInt(guessedHour);
    const minuteGuess = parseInt(guessedMinute);

    if (isNaN(hourGuess) || isNaN(minuteGuess)) {
      setFeedbackMsg("Please enter both hours and minutes!");
      setFeedbackIsCorrect(false);
      setShowFeedbackToast(true);
      setAnswered(true);
      return;
    }

    setAnswered(true);

    if (hourGuess === randomHour && minuteGuess === randomMinute) {
      const msg = Feedback.getEncouragement();
      setFeedbackMsg(msg);
      setFeedbackIsCorrect(true);
      setStreak((prev) => {
        const newStreak = prev + 1;
        if (newStreak > 1) {
          setShowStreakBadge(true);
        }
        return newStreak;
      });
      setShowConfetti(true);
      speak(msg.replace(/[🎉⭐🙌🌟💥👏🚀🧡🧠🎊]/g, ""));
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
      confettiTimer.current = setTimeout(() => setShowConfetti(false), 1200);

      setTimeout(() => {
        setShowFeedbackToast(true);
      }, 300);
    } else {
      const msg = Feedback.getTryAgain();
      setFeedbackMsg(msg);
      setFeedbackIsCorrect(false);
      setStreak(0);
      speak("Not quite, try again!");
      setShowFeedbackToast(true);
    }
  };

  const hourDegrees = (randomHour % 12) * 30 + randomMinute / 2;
  const minuteDegrees = randomMinute * 6;

  const handleFeedbackToastClose = () => {
    setShowFeedbackToast(false);
    generateNewTime();
  };

  // Initialize
  useEffect(() => {
    generateNewTime();
  }, [generateNewTime]);

  return (
    <>
      <ConfettiBurst active={showConfetti} />

      <CourseContent>
        <CourseContent.Title description={course.description} />

        {/* Streak Badge */}
        {showStreakBadge && (
          <StreakBadge
            count={streak}
            duration={2000}
            onDismiss={() => setShowStreakBadge(false)}
          />
        )}

        {/* Analog Clock */}
        <CourseContent.Card className="border-4 mb-8">
          <div className="w-64 h-64 relative mx-auto my-6 rounded-full border-4 border-[#2D2016] bg-white shadow-lg">
            {/* Clock numbers */}
            {[...Array(12)].map((_, i) => {
              const number = i === 0 ? 12 : i;
              const angle = i * 30;
              const x = Math.sin((angle * Math.PI) / 180) * 90;
              const y = -Math.cos((angle * Math.PI) / 180) * 90;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 font-poppins font-bold text-xl text-[#2D2016]"
                  style={{
                    transform: `translate(${x - 8}px, ${y - 12}px)`
                  }}
                >
                  {number}
                </div>
              );
            })}

            {/* Hour markers */}
            {[...Array(12)].map((_, i) => {
              const rotation = i * 30;
              return (
                <div
                  key={i}
                  className="absolute w-1 h-5 bg-[#2D2016] left-1/2 top-1"
                  style={{
                    transformOrigin: "2px 120px",
                    transform: `translateX(-50%) rotate(${rotation}deg)`
                  }}
                />
              );
            })}

            {/* Hour hand */}
            <div
              className="absolute w-1.5 h-16 bg-[#2D2016] left-1/2 bottom-1/2 rounded-sm"
              style={{
                transformOrigin: "bottom center",
                transform: `translateX(-50%) rotate(${hourDegrees}deg)`
              }}
            />

            {/* Minute hand */}
            <div
              className="absolute w-0.5 h-24 bg-[#5B9BFF] left-1/2 bottom-1/2 rounded-sm"
              style={{
                transformOrigin: "bottom center",
                transform: `translateX(-50%) rotate(${minuteDegrees}deg)`
              }}
            />

            {/* Center dot */}
            <div className="absolute w-3 h-3 bg-[#2D2016] rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>

          <p className="text-center font-nunito font-bold text-xs text-[#9B8B6E] mt-3">
            What time is shown? 👇
          </p>
        </CourseContent.Card>

        {/* Input section */}
        <div className="flex gap-4 justify-center items-end mb-8">
          <Input
            label="Hours"
            placeholder="1-12"
            value={guessedHour}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[1-9]$|^1[0-2]$/.test(value)) {
                setGuessedHour(value);
              }
            }}
            variant="primary"
            inputSize="md"
            disabled={answered}
            className="w-24 text-center"
          />
          <div className="text-3xl font-poppins font-bold text-[#2D2016]">
            :
          </div>
          <Input
            label="Minutes"
            placeholder="0-59"
            value={guessedMinute}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "" ||
                (/^[0-5]?[0-9]$/.test(value) && parseInt(value) <= 59)
              ) {
                setGuessedMinute(value);
              }
            }}
            variant="primary"
            inputSize="md"
            disabled={answered}
            className="w-24 text-center"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center mb-8">
          <Button
            label="Check Answer"
            variant="secondary"
            onClick={checkAnswer}
            disabled={answered}
          />
          <Button
            label="New Time"
            variant="primary"
            onClick={() => generateNewTime()}
          />
        </div>
      </CourseContent>

      {/* Toast Feedback */}
      {feedbackIsCorrect === true && (
        <Feedback.ToastCorrect
          isVisible={showFeedbackToast}
          message={feedbackMsg}
          onClose={handleFeedbackToastClose}
          duration={2000}
        />
      )}
      {feedbackIsCorrect === false && (
        <Feedback.ToastIncorrect
          isVisible={showFeedbackToast}
          message={feedbackMsg}
          onClose={handleFeedbackToastClose}
          duration={2000}
        />
      )}
    </>
  );
}
