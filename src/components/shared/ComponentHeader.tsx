import React from "react";

export default function ComponentHeader({
  title = "Component Header",
  description = "This is a component header" as string | React.ReactNode,
  className = "text-3xl md:text-5xl font-semibold ",
}) {
  return (
    <div className="flex justify-center flex-col items-center gap-4 max-w-4xl mx-auto">
      <h1 className={`${className}  font-bold `}>{title}</h1>
      <p className="text-subtitle mb-4 text-center mt-1">{description}</p>
      {/* {children && <div className="mt-4">{children}</div>} */}
    </div>
  );
}
