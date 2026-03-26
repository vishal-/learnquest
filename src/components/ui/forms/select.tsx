import React, { useState } from "react";

export interface SelectOption {
  label: string;
  value: string | number;
}

export type SelectVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "info";

interface SelectProps {
  options: SelectOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  placeholder?: string;
  variant?: SelectVariant;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Kid-friendly Select component with shadcn-style architecture
 * Aligned with LearnQuest's pastel color palette and playful design
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      placeholder,
      variant = "primary",
      disabled = false,
      className = "",
      size = "md"
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const getVariantClasses = () => {
      switch (variant) {
        case "secondary":
          return {
            bg: "bg-[#BDEFFF]",
            border: "border-[#5B9BFF]",
            text: "text-[#2D2016]",
            shadow: "shadow-[0_3px_0_#5B9BFF]",
            focus: "focus:ring-[#5B9BFF] focus:bg-[#A2D2FF]",
            placeholder: "text-[#5B9BFF] opacity-60"
          };
        case "success":
          return {
            bg: "bg-[#90EE90]",
            border: "border-[#2D8C40]",
            text: "text-[#2D2016]",
            shadow: "shadow-[0_3px_0_#2D8C40]",
            focus: "focus:ring-[#2D8C40] focus:bg-[#A2F5A2]",
            placeholder: "text-[#2D8C40] opacity-60"
          };
        case "warning":
          return {
            bg: "bg-[#FFE5B4]",
            border: "border-[#FFB347]",
            text: "text-[#2D2016]",
            shadow: "shadow-[0_3px_0_#FFB347]",
            focus: "focus:ring-[#FFB347] focus:bg-[#FFF0CC]",
            placeholder: "text-[#FFB347] opacity-60"
          };
        case "info":
          return {
            bg: "bg-[#A2D2FF]",
            border: "border-[#5B9BFF]",
            text: "text-[#2D2016]",
            shadow: "shadow-[0_3px_0_#5B9BFF]",
            focus: "focus:ring-[#5B9BFF] focus:bg-[#BDEFFF]",
            placeholder: "text-[#5B9BFF] opacity-60"
          };
        case "primary":
        default:
          return {
            bg: "bg-[#ffc8dd]",
            border: "border-[#FF6B9D]",
            text: "text-[#2D2016]",
            shadow: "shadow-[0_3px_0_#FF6B9D]",
            focus: "focus:ring-[#FF6B9D] focus:bg-[#FFD9EA]",
            placeholder: "text-[#FF6B9D] opacity-60"
          };
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "px-3 py-2 text-sm";
        case "lg":
          return "px-5 py-4 text-lg";
        case "md":
        default:
          return "px-4 py-3 text-base";
      }
    };

    const variantClasses = getVariantClasses();

    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && (
          <label className="font-poppins font-bold text-sm text-[#2D2016]">
            {label}
          </label>
        )}
        <div className="relative group">
          <select
            ref={ref}
            value={value}
            onChange={(e) => {
              const selectedValue = e.target.value;
              const option = options.find(
                (opt) => String(opt.value) === selectedValue
              );
              onChange(option ? option.value : selectedValue);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={`
              w-full rounded-2xl border-4 font-poppins font-bold
              cursor-pointer appearance-none transition-all duration-100
              focus:outline-none focus:ring-2
              ${getSizeClasses()}
              ${variantClasses.bg}
              ${variantClasses.border}
              ${variantClasses.text}
              ${variantClasses.shadow}
              ${isFocused ? variantClasses.focus : "hover:shadow-[0_2px_0]"}
              ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0_2px_0] hover:translate-y-[1px] active:shadow-[0_1px_0] active:translate-y-[2px]"}
              ${placeholder ? variantClasses.placeholder : ""}
            `}
          >
            {placeholder && (
              <option value="" disabled selected hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={String(option.value)} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom Dropdown Arrow */}
          <div
            className={`
              pointer-events-none absolute right-3 top-1/2 -translate-y-1/2
              text-lg transition-transform
              ${isFocused ? "rotate-180" : ""}
            `}
          >
            ▼
          </div>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
