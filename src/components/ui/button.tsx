import { FaVolumeUp } from "react-icons/fa";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "outline"
  | "ghost"
  | "option";

interface ButtonProps {
  onClick: () => void;
  label?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
}

const getVariantClasses = (variant: ButtonVariant = "primary") => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "text-blue-600 hover:bg-blue-100",
    option:
      "bg-gray-700 text-white text-2xl text-bold hover:bg-gray-600 disabled:bg-gray-500 rounded-lg disabled:cursor-not-allowed",
  };
  return variants[variant];
};

const Button: React.FC<ButtonProps> & { Audio: React.FC<ButtonProps> } = ({
  onClick,
  label,
  variant = "primary",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded transition-colors ${getVariantClasses(
        variant
      )}`}
      disabled={disabled}
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
