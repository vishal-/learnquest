type FeedbackProps = {
  message: string;
  variant: "warning" | "danger" | "success";
};

const Feedback: React.FC<FeedbackProps> = ({
  message,
  variant = "success"
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "danger":
        return "bg-red-100 text-red-800 border-red-300";
      case "success":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-green-100 text-green-800 border-green-300";
    }
  };

  return (
    <div
      className={`px-5 py-3 text-center rounded border mb-4 ${getVariantClasses()}`}
    >
      {message}
    </div>
  );
};

export default Feedback;
