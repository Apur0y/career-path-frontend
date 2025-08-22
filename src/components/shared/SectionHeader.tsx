import React from "react";

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div>
      <h1 className=" text-2xl md:text-5xl text-[#333333] font-bold mb-4">
        {title}
      </h1>
      <p className="text-gray-600 mb-6">{description}</p>
    </div>
  );
};

export default SectionHeader;
