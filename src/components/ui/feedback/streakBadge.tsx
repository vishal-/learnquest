import { useEffect, useState } from "react";

interface StreakBadgeProps {
  count: number;
  animated?: boolean;
  duration?: number; // ms before auto-dismiss, 0 = no auto-dismiss
  onDismiss?: () => void;
}

/**
 * Reusable streak badge component
 * Shows "🔥 X in a row!" with optional auto-dismiss
 */
const StreakBadge = ({
  count,
  animated = true,
  duration = 2000,
  onDismiss
}: StreakBadgeProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (count < 2 || duration <= 0) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [count, duration, onDismiss]);

  if (!isVisible || count < 2) return null;

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

export default StreakBadge;
