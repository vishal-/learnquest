import { FaVolumeUp } from "react-icons/fa";

const Button = () => {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded">
      Click Me
    </button>
  );
};

const Audio: React.FC<{ onClick: () => void; label?: string }> = ({
  onClick,
  label = ""
}) => {
  return (
    <button
      onClick={onClick}
      className="flex mx-auto items-center border rounded-full px-4 py-2 text-blue-500 hover:text-blue-700 hover:border-blue-700 transition-all"
    >
      <span>{label}</span>
      <FaVolumeUp className="ml-2" size={20} />
    </button>
  );
};

Button.Audio = Audio;

export default Button;
