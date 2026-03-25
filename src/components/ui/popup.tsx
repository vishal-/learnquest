import type { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
}

const Popup = ({
  isOpen,
  onClose,
  title,
  icon,
  children,
  maxWidth = "max-w-sm"
}: PopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-2xl border-4 border-[#2D2016] ${maxWidth} w-full shadow-lg animate-slide-up`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <IoClose className="w-5 h-5 text-[#2D2016]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Icon */}
          {icon && <div className="flex justify-center mb-6">{icon}</div>}

          {/* Title */}
          <h2 className="text-3xl font-poppins font-bold text-[#2D2016] text-center capitalize mb-4">
            {title}
          </h2>

          {/* Children Content */}
          {children}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Popup;
