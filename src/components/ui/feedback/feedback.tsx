import React from "react";
import Button from "@/components/ui/forms/button";
import Toast from "./toast";

// ─── Encouragement Messages ────────────────────────────────────────────────

const ENCOURAGEMENTS = [
  "Amazing! 🎉",
  "Wonderful! ⭐",
  "You got it! 🙌",
  "Brilliant! 🌟",
  "Nailed it! 💥",
  "Perfect! 👏",
  "Awesome! 🚀",
  "Fantastic! 🧡",
  "Super smart! 🧠",
  "Way to go! 🎊"
];

const TRY_AGAIN = [
  "Oops! Try again 🙈",
  "Not quite… 🤔",
  "Almost! Have another go 🔄",
  "Keep trying! 💪",
  "You can do it! 💫",
  "Let's try once more! 🌈"
];

const ENCOURAGING_HINTS = [
  "Great effort! 💪",
  "Getting closer! 🎯",
  "Nice try! 👍",
  "Keep going! 🔥"
];

// ─── Helper Functions ─────────────────────────────────────────────────────

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Types ────────────────────────────────────────────────────────────────

export type FeedbackVariant =
  | "correct"
  | "incorrect"
  | "info"
  | "warning"
  | "hint"
  | "success"
  | "danger";

type BaseFeedbackProps = {
  message?: string;
  autoMessage?: boolean; // Auto-generate encouraging message
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
};

export type FeedbackProps = BaseFeedbackProps & {
  variant?: FeedbackVariant;
};

type CorrectFeedbackProps = BaseFeedbackProps & {
  streak?: number;
  showButton?: boolean;
  buttonLabel?: string;
};

type IncorrectFeedbackProps = BaseFeedbackProps & {
  hint?: string;
  showButton?: boolean;
  buttonLabel?: string;
};

// ─── Feedback Component ────────────────────────────────────────────────────

const Feedback: React.FC<FeedbackProps> = ({
  variant = "correct",
  message,
  autoMessage = false,
  onAction,
  actionLabel = "Next",
  className = ""
}) => {
  const getVariantConfig = () => {
    switch (variant) {
      case "correct":
      case "success":
        return {
          bg: "bg-[#90EE90]",
          border: "border-[#2D8C40]",
          text: "text-[#2D2016]",
          icon: "✅",
          shadow: "shadow-[0_4px_0_#2D8C40]"
        };
      case "incorrect":
      case "danger":
        return {
          bg: "bg-[#FF6B6B]",
          border: "border-[#C94B4B]",
          text: "text-white",
          icon: "❌",
          shadow: "shadow-[0_4px_0_#C94B4B]"
        };
      case "warning":
        return {
          bg: "bg-[#FFE5B4]",
          border: "border-[#FFB347]",
          text: "text-[#2D2016]",
          icon: "⚠️",
          shadow: "shadow-[0_4px_0_#FFB347]"
        };
      case "hint":
        return {
          bg: "bg-[#A2D2FF]",
          border: "border-[#5B9BFF]",
          text: "text-[#2D2016]",
          icon: "💡",
          shadow: "shadow-[0_4px_0_#5B9BFF]"
        };
      case "info":
      default:
        return {
          bg: "bg-[#BDEFFF]",
          border: "border-[#5B9BFF]",
          text: "text-[#2D2016]",
          icon: "ℹ️",
          shadow: "shadow-[0_4px_0_#5B9BFF]"
        };
    }
  };

  const config = getVariantConfig();
  const displayMessage =
    message || (autoMessage ? randomFrom(ENCOURAGEMENTS) : "");

  return (
    <div
      className={`
        rounded-2xl border-4 p-6 text-center space-y-4
        animate-pop-in
        ${config.bg} ${config.border} ${config.text} ${config.shadow}
        ${className}
      `}
    >
      <div className="font-poppins font-bold text-2xl">
        {config.icon} {displayMessage}
      </div>
      {onAction && (
        <Button
          variant="primary"
          size="lg"
          onClick={onAction}
          className="w-full"
        >
          {actionLabel} ✨
        </Button>
      )}
    </div>
  );
};

// ─── Correct Feedback Component ────────────────────────────────────────────

const FeedbackCorrect: React.FC<CorrectFeedbackProps> = ({
  message,
  streak,
  onAction,
  actionLabel = "Next Challenge",
  showButton = true,
  className = ""
}) => {
  const displayMessage = message || randomFrom(ENCOURAGEMENTS);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Streak Badge */}
      {streak && streak > 1 && (
        <div className="flex justify-center animate-bounce-scale">
          <div className="bg-[#FFD93D] border-4 border-[#2D2016] rounded-full px-6 py-3 font-poppins font-bold text-sm shadow-[0_3px_0_#C8A800]">
            🔥 {streak} in a row!
          </div>
        </div>
      )}

      {/* Main Feedback */}
      <div className="rounded-2xl border-4 border-[#2D8C40] bg-[#90EE90] p-6 text-center space-y-4 animate-pop-in">
        <div className="font-poppins font-bold text-3xl text-[#2D2016]">
          ✅ {displayMessage}
        </div>
        {showButton && onAction && (
          <Button
            variant="primary"
            size="lg"
            onClick={onAction}
            className="w-full"
          >
            {actionLabel} ✨
          </Button>
        )}
      </div>
    </div>
  );
};

// ─── Incorrect Feedback Component ──────────────────────────────────────────

const FeedbackIncorrect: React.FC<IncorrectFeedbackProps> = ({
  message,
  hint,
  onAction,
  actionLabel = "Try Again",
  showButton = true,
  className = ""
}) => {
  const displayMessage = message || randomFrom(TRY_AGAIN);

  return (
    <div
      className={`rounded-2xl border-4 border-[#C94B4B] bg-[#FF6B6B] p-6 text-center space-y-4 animate-pop-in ${className}`}
    >
      <div className="font-poppins font-bold text-3xl text-white">
        ❌ {displayMessage}
      </div>
      {hint && (
        <div className="text-sm text-white font-nunito font-semibold opacity-95">
          💡 Hint: {hint}
        </div>
      )}
      {showButton && onAction && (
        <Button
          variant="danger"
          size="lg"
          onClick={onAction}
          className="w-full"
        >
          {actionLabel} 🔄
        </Button>
      )}
    </div>
  );
};

// ─── Streak Badge Component ────────────────────────────────────────────────

const FeedbackStreak: React.FC<{
  count: number;
  animated?: boolean;
}> = ({ count, animated = true }) => {
  if (count < 2) return null;

  return (
    <div
      className={`flex justify-center ${animated ? "animate-bounce-scale" : ""}`}
    >
      <div className="bg-[#FFD93D] border-4 border-[#2D2016] rounded-full px-6 py-3 font-poppins font-bold text-lg shadow-[0_3px_0_#C8A800]">
        🔥 {count} in a row!
      </div>
    </div>
  );
};

// ─── Toast Feedback Components ────────────────────────────────────────────

type ToastFeedbackProps = {
  isVisible: boolean;
  message?: string;
  onClose: () => void;
  duration?: number;
};

const FeedbackToastCorrect: React.FC<ToastFeedbackProps> = ({
  isVisible,
  message,
  onClose,
  duration = 2000
}) => {
  if (!isVisible) return null;

  const displayMessage = message || randomFrom(ENCOURAGEMENTS);

  return (
    <Toast
      message={displayMessage}
      variant="success"
      duration={duration}
      onClose={onClose}
    />
  );
};

const FeedbackToastIncorrect: React.FC<ToastFeedbackProps> = ({
  isVisible,
  message,
  onClose,
  duration = 3000
}) => {
  if (!isVisible) return null;

  const displayMessage = message || randomFrom(TRY_AGAIN);

  return (
    <Toast
      message={displayMessage}
      variant="error"
      duration={duration}
      onClose={onClose}
    />
  );
};

const FeedbackToastStreak: React.FC<{
  isVisible: boolean;
  count: number;
  onClose: () => void;
  duration?: number;
}> = ({ isVisible, count, onClose, duration = 1500 }) => {
  if (!isVisible || count < 2) return null;

  return (
    <Toast
      message={`${count} in a row!`}
      variant="streak"
      duration={duration}
      onClose={onClose}
    />
  );
};

// ─── Export with Sub-components ────────────────────────────────────────────

interface FeedbackComponent extends React.FC<FeedbackProps> {
  Correct: React.FC<CorrectFeedbackProps>;
  Incorrect: React.FC<IncorrectFeedbackProps>;
  Streak: React.FC<{
    count: number;
    animated?: boolean;
  }>;
  ToastCorrect: React.FC<ToastFeedbackProps>;
  ToastIncorrect: React.FC<ToastFeedbackProps>;
  ToastStreak: React.FC<{
    isVisible: boolean;
    count: number;
    onClose: () => void;
    duration?: number;
  }>;
  getEncouragement: () => string;
  getTryAgain: () => string;
  getHint: () => string;
}

const FeedbackWithComponents = Feedback as unknown as FeedbackComponent;

FeedbackWithComponents.Correct = FeedbackCorrect;
FeedbackWithComponents.Incorrect = FeedbackIncorrect;
FeedbackWithComponents.Streak = FeedbackStreak;
FeedbackWithComponents.ToastCorrect = FeedbackToastCorrect;
FeedbackWithComponents.ToastIncorrect = FeedbackToastIncorrect;
FeedbackWithComponents.ToastStreak = FeedbackToastStreak;
FeedbackWithComponents.getEncouragement = () => randomFrom(ENCOURAGEMENTS);
FeedbackWithComponents.getTryAgain = () => randomFrom(TRY_AGAIN);
FeedbackWithComponents.getHint = () => randomFrom(ENCOURAGING_HINTS);

export default FeedbackWithComponents;
