import React from "react";

interface SelectOption {
  displayLabel: string;
  optionValue: string | number;
}

interface SelectProps {
  options: SelectOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, label }) => {
  return (
    <div className="text-white my-3">
      {label && <label className="me-3 text-gray-300">{label}</label>}
      <select
        value={value}
        onChange={(e) => {
          const selectedValue = e.target.value;
          const option = options.find(
            (opt) => String(opt.optionValue) === selectedValue
          );
          onChange(option ? option.optionValue : selectedValue);
        }}
        className="bg-gray-800 text-xl text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={String(opt.optionValue)} value={opt.optionValue}>
            {opt.displayLabel}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
export type { SelectOption };
