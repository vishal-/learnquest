import React, { forwardRef } from "react";

export type InputVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "info";
export type InputSize = "sm" | "md" | "lg";

const variantStyles: Record<InputVariant, string> = {
  primary:
    "border-[#ffc8dd] focus:ring-[#ffc8dd] focus:shadow-[0_0_0_3px_rgba(255,200,221,0.2)]",
  secondary:
    "border-[#BDEFFF] focus:ring-[#BDEFFF] focus:shadow-[0_0_0_3px_rgba(189,239,255,0.2)]",
  success:
    "border-[#90EE90] focus:ring-[#90EE90] focus:shadow-[0_0_0_3px_rgba(144,238,144,0.2)]",
  warning:
    "border-[#FFE5B4] focus:ring-[#FFE5B4] focus:shadow-[0_0_0_3px_rgba(255,229,180,0.2)]",
  info: "border-[#A2D2FF] focus:ring-[#A2D2FF] focus:shadow-[0_0_0_3px_rgba(162,210,255,0.2)]"
};

const sizeStyles: Record<InputSize, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg"
};

interface InputPropsBase {
  label?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
  error?: boolean;
  errorMessage?: string;
}

export type InputProps = InputPropsBase &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      variant = "primary",
      inputSize = "md",
      error = false,
      errorMessage,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label className="text-sm font-poppins font-bold text-[#2D2016] mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            font-poppins font-bold
            border-4 rounded-2xl
            transition-all duration-200
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            bg-white
            placeholder-gray-400
            ${sizeStyles[inputSize]}
            ${variantStyles[variant]}
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        {error && errorMessage && (
          <span className="text-xs font-poppins font-bold text-red-500 mt-1">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
