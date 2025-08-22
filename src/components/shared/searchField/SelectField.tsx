import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md"; // Import the arrow icon

type Option = { value: string; label?: string };

type SelectFieldProps = {
  label: string;
  name: string;
  options: Option[];
  register: (
    name: string,
    options: { required: boolean }
  ) => Record<string, unknown>;
  required?: boolean;
  error?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  register,
  required = false,
  error,
}) => {
  return (
    <div className="w-sm relative">
      <label htmlFor={name} className="block text-[#333333] font-medium">
        {label}
      </label>

      <select
        {...register(name, { required })}
        className="flex-1 text-gray-700 p-2 border border-gray-300 rounded-md w-full pr-10 appearance-none"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>

      {/* Add the dropdown icon */}
      <MdOutlineKeyboardArrowDown className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none mt-4" />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default SelectField;
