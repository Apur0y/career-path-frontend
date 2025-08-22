import React from "react";
import { BeatLoader } from "react-spinners";

interface Class {
  className?: string;
  color?: string; // Add the color prop for custom color
}

const LoadingButton = ({ className, color = "#fff" }: Class) => {  // Default color is set to #fff
  return (
    <div className="flex justify-center items-center">
      <BeatLoader
        color={color}  // Use the color passed or the default value
        size={18}
        aria-label="Loading Spinner"
        data-testid="loader"
        className={className} // Use the className prop if passed
      />
    </div>
  );
};

export default LoadingButton;
