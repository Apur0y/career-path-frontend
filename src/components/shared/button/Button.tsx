import React from "react";

type ButtonProps = {
  name?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: unknown;
};

export default function Button({
  name = "Submit",
  type = "button",
  className = "",
  onClick,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} bg-primary text-white cursor-pointer hover:bg-green-600 transition`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {name}
    </button>
  );
}
