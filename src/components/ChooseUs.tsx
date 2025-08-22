import React from "react";
import { FaBriefcase, FaRobot, FaMousePointer } from "react-icons/fa";
import Container from "./ui/Container";
import ComponentHeader from "./shared/ComponentHeader";
import { cardData } from "@/lib/chooseCardData";

export default function ChooseUs() {
  return (
    <div>
      <div className="container section-gap">
        <div className="space-y-4">
          <ComponentHeader
            title="Why Choose Us?"
            description={
              <>
                Unlock personalized job opportunities, streamline your hiring
                process, and make smarter decisions with the power of AI, all in
                one seamless platform.
              </>
            }
          ></ComponentHeader>

          <div className="flex flex-wrap gap-6 justify-center mt-8 cursor-pointer">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 border-gray-200 border hover:shadow-md rounded-lg w-full sm:w-[30%] min-w-[280px] max-w-[457px]  transition-all duration-300"
              >
                <div className="mb-4 ">{card.icon}</div>
                <h3 className="text-lg md:text-2xl font-bold mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-center">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
