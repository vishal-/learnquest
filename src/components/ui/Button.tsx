import { FaVolumeUp } from "react-icons/fa";

interface ButtonProps {
  onClick: () => void;
  label?: string;
}

const Button: React.FC<ButtonProps> & { Audio: React.FC<ButtonProps> } = ({
  onClick,
  label
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white font-bold px-6 py-3 rounded-full"
    >
      {label}
    </button>
  );
};

const Audio: React.FC<ButtonProps> = ({ onClick, label = "" }) => {
  return (
    <button
      onClick={onClick}
      className="flex mx-auto items-center border rounded-full px-4 py-2 text-blue-500 hover:text-blue-700 hover:border-blue-700 transition-all"
    >
      <span>{label}</span>
      <FaVolumeUp className="ms-3" size={20} />
    </button>
  );
};

Button.Audio = Audio;

export default Button;
