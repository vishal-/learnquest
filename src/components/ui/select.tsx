import React from "react";

interface SelectProps {
  options: number[];
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, label }) => {
  return (
    <div className="flex flex-col text-sm text-white">
      {label && <label className="mb-1 text-gray-300">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
