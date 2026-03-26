import React, { forwardRef } from "react";

export type TextareaVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "info";
export type TextareaSize = "sm" | "md" | "lg";

const variantStyles: Record<TextareaVariant, string> = {
  primary: "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
  secondary: "border-gray-300 focus:ring-purple-500 focus:border-purple-500",
  success: "border-gray-300 focus:ring-green-500 focus:border-green-500",
  warning: "border-gray-300 focus:ring-yellow-500 focus:border-yellow-500",
  info: "border-gray-300 focus:ring-cyan-500 focus:border-cyan-500"
};

const sizeStyles: Record<TextareaSize, string> = {
  sm: "px-3 py-2 text-sm min-h-[100px]",
  md: "px-3 py-2 text-base min-h-[200px]",
  lg: "px-4 py-3 text-lg min-h-[300px]"
};

interface TextareaPropsBase {
  label?: string;
  variant?: TextareaVariant;
  textareaSize?: TextareaSize;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
}

export type TextareaProps = TextareaPropsBase &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      variant = "primary",
      textareaSize = "md",
      error = false,
      errorMessage,
      helperText,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            font-mono
            border-2 rounded-lg
            transition-all duration-200
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            bg-white resize-vertical
            placeholder-gray-400
            ${sizeStyles[textareaSize]}
            ${variantStyles[variant]}
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
            ${className}
          `}
          {...props}
        />
        {helperText && !error && (
          <span className="text-xs text-gray-500 mt-1">{helperText}</span>
        )}
        {error && errorMessage && (
          <span className="text-xs text-red-500 mt-1">{errorMessage}</span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
