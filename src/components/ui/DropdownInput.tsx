import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Option = {
  label: string;
  value: string;
};

type SelectInputProps = {
  label: string;
  name: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const DropdownInput = ({
  label,
  
  options,
  defaultValue = "",
  onChange,
}: SelectInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
         
          className="w-full p-3 pr-10 border border-[#c2c2c2] text-gray-500 rounded-md appearance-none"
          value={defaultValue}
          onChange={onChange}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <MdOutlineKeyboardArrowDown
          className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default DropdownInput;

