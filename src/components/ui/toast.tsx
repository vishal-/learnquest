import { useEffect, useState } from "react";

export type ToastVariant = "success" | "error" | "warning" | "info" | "streak";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number; // ms, 0 = no auto-close
  onClose?: () => void;
}

const Toast = ({
  message,
  variant = "info",
  duration = 3000,
  onClose
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration <= 0) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getVariantConfig = () => {
    switch (variant) {
      case "success":
        return {
          bg: "bg-[#90EE90]",
          text: "text-[#2D2016]",
          border: "border-[#2D8C40]",
          icon: "✅"
        };
      case "error":
        return {
          bg: "bg-[#FF6B6B]",
          text: "text-white",
          border: "border-[#C94B4B]",
          icon: "❌"
        };
      case "warning":
        return {
          bg: "bg-[#FFE5B4]",
          text: "text-[#2D2016]",
          border: "border-[#FFB347]",
          icon: "⚠️"
        };
      case "streak":
        return {
          bg: "bg-[#FFD93D]",
          text: "text-[#2D2016]",
          border: "border-[#F4C430]",
          icon: "🔥"
        };
      case "info":
      default:
        return {
          bg: "bg-[#BDEFFF]",
          text: "text-[#2D2016]",
          border: "border-[#5B9BFF]",
          icon: "ℹ️"
        };
    }
  };

  const config = getVariantConfig();

  return (
    <div
      className={`
        fixed top-6 left-1/2 -translate-x-1/2
        max-w-xs px-6 py-3 rounded-2xl border-3
        shadow-[0_4px_8px_rgba(0,0,0,0.15)]
        z-50 animate-pop-in
        font-poppins font-bold text-sm
        flex items-center gap-2
        ${config.bg} ${config.text} ${config.border}
      `}
    >
      <span className="text-xl">{config.icon}</span>
      <span className="flex-1">{message}</span>
    </div>
  );
};

export default Toast;
