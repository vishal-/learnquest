import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "outline"
    | "ghost"
    | "option";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  label?: string;
  onClick?: () => void | Promise<void>;
}

const getVariantStyles = (variant: string = "primary") => {
  const variants = {
    primary: {
      bg: "bg-[#FF6B9D]",
      text: "text-white",
      hover: "hover:bg-[#FF5A8C]",
      shadow: "shadow-[0_4px_0_#2D2016]",
      active: "active:shadow-[0_2px_0_#2D2016] active:translate-y-[2px]"
    },
    secondary: {
      bg: "bg-[#A2D2FF]",
      text: "text-[#2D2016]",
      hover: "hover:bg-[#8AC5FF]",
      shadow: "shadow-[0_4px_0_#2D2016]",
      active: "active:shadow-[0_2px_0_#2D2016] active:translate-y-[2px]"
    },
    success: {
      bg: "bg-[#90EE90]",
      text: "text-[#2D2016]",
      hover: "hover:bg-[#7AE97A]",
      shadow: "shadow-[0_4px_0_#2D2016]",
      active: "active:shadow-[0_2px_0_#2D2016] active:translate-y-[2px]"
    },
    danger: {
      bg: "bg-[#FF6B6B]",
      text: "text-white",
      hover: "hover:bg-[#FF5555]",
      shadow: "shadow-[0_4px_0_#2D2016]",
      active: "active:shadow-[0_2px_0_#2D2016] active:translate-y-[2px]"
    },
    outline: {
      bg: "bg-transparent",
      text: "text-[#2D2016]",
      hover: "hover:bg-[#FFE5EC]",
      shadow: "border-3 border-[#2D2016]",
      active: "active:translate-y-[1px]"
    },
    ghost: {
      bg: "bg-transparent",
      text: "text-[#2D2016]",
      hover: "hover:bg-[#F5EBE0]",
      shadow: "",
      active: ""
    },
    option: {
      bg: "bg-[#FFE5B4]",
      text: "text-[#2D2016]",
      hover: "hover:bg-[#FFD699]",
      shadow: "shadow-[0_3px_0_#2D2016]",
      active: "active:shadow-[0_1px_0_#2D2016] active:translate-y-[2px]"
    }
  };
  return variants[variant as keyof typeof variants] || variants.primary;
};

const getSizeStyles = (size: string = "md") => {
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  return sizes[size as keyof typeof sizes] || sizes.md;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      children,
      label,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(size);

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center
          rounded-xl border-none
          font-poppins font-bold
          transition-all duration-100 ease-out
          cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles.bg}
          ${variantStyles.text}
          ${variantStyles.hover}
          ${variantStyles.shadow}
          ${variantStyles.active}
          ${sizeStyles}
          ${className}
        `}
        {...props}
      >
        {label || children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Audio button subcomponent
const AudioButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "option",
      size = "md",
      label = "🔊",
      children,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center gap-2 ${className}`}
        {...props}
      >
        {label}
        {children}
      </Button>
    );
  }
);

AudioButton.displayName = "AudioButton";

export default Object.assign(Button, { Audio: AudioButton });
