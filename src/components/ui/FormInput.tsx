import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", className = "px-4 py-4  ", ...props },
  ref
) {
  const id = React.useId();
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-[#333333] font-medium">
          {" "}
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${className} bg-gray-50 border border-[#c2c2c2]  rounded-md w-full`}
        ref={ref}
        {...props}
        id={id}
      ></input>
    </div>
  );
});

export default FormInput;
