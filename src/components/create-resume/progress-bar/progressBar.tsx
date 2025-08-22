"use client";

import React from "react";

interface StepLabel {
  number: string;
  title: string;
  subtitle: string;
}

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progressValue = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const stepLabels: StepLabel[] = [
    { number: "01", title: "Personal", subtitle: "Information" },
    { number: "02", title: "Career", subtitle: "summary" },
    { number: "03", title: "Skills", subtitle: "& Experience" },
    { number: "04", title: "Education", subtitle: "& Certifications" },
    { number: "05", title: "Contact", subtitle: "Information" },
    { number: "06", title: "AI", subtitle: "Resume Generation" },
    { number: "07", title: "Review", subtitle: "& Download" },
  ];

  return (
    <div className="w-full">
      {/* Progress bar with circles */}
      <div className="relative h-12 md:h-20">
        {/* Custom progress bar as connector line */}
        <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 z-0 px-8 md:px-20">
          <div className="w-full h-full bg-gray-200 rounded-full">
            <div
              className="h-full bg-[#10B981] rounded-full"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>

        {/* Circles container - using grid for perfect alignment */}
        <div className="relative grid grid-cols-7  md:grid-cols-7 z-10 h-full px-4 md:px-0">
          {stepLabels.slice(0, totalSteps).map((step, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <div
                key={stepNum}
                className="flex flex-col items-center justify-start"
              >
                {/* Circle number */}
                <div
                  className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 bg-gray-100 text-sm md:text-lg relative"
                  style={{
                    backgroundColor:
                      isCurrent || isCompleted ? "#28C76F" : "#D5D1DB",
                    borderColor:
                      isCurrent || isCompleted ? "#28C76F" : "#D1D5DB",
                    color: isCurrent || isCompleted ? "white" : "black",
                    transform: "translateY(50%)",
                  }}
                >
                  {step.number}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Labels container - using same grid layout */}
      {/* Labels for medium+ screens */}
      <div className="hidden md:grid md:grid-cols-7 gap-2">
        {stepLabels.slice(0, totalSteps).map((step, index) => {
          const stepNum = index + 1;
          const isCurrent = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={stepNum} className="flex flex-col items-center px-2">
              <span
                className={`text-sm md:text-base text-center ${
                  isCurrent
                    ? "text-gray-900 font-medium"
                    : isCompleted
                    ? "text-primary"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
              <span
                className={`text-sm md:text-base text-center ${
                  isCurrent
                    ? "text-gray-900 font-medium"
                    : isCompleted
                    ? "text-primary"
                    : "text-gray-500"
                }`}
              >
                {step.subtitle}
              </span>
            </div>
          );
        })}
      </div>

      {/* Current step only for small screens */}
      <div className="block md:hidden text-center mt-4">
        <div className="text-sm font-medium text-gray-900">
          {stepLabels[currentStep - 1].title}
        </div>
        <div className="text-sm text-gray-500">
          {stepLabels[currentStep - 1].subtitle}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
