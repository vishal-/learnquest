import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

interface BackButtonProps {
  to: string;
}

const BackButton = ({ to }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center gap-2 text-[#2D2016] hover:opacity-70 transition-opacity font-nunito font-semibold text-sm mb-4"
    >
      <FiArrowLeft className="h-5 w-5" />
      Back
    </button>
  );
};

export default BackButton;
