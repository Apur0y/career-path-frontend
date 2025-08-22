"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../shared/button/Button";
import SectionHeader from "../shared/SectionHeader";
import { useForm } from "react-hook-form";

export default function GenerateResume({
  setStep,
  onSubmit
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (data: any) => void;
}) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleBack = (): void => {
    setStep(5);
    console.log("Back")
  };

  const simulateLoading = () => {

    

    setIsLoading(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setStep(7);
        // router.push("/jobseekeruser/aigeneratedresume");
      }

    }, 40);
  };


  return (
    <div className="flex justify-center mt-12">
      <div className=" w-full max-w-[1180px] h-auto">
        <div>
          <SectionHeader
            title="AI Resume Magic"
            description="Now, let’s turn all the information you’ve provided into a professional resume! Our AI will generate a polished version that showcases your strengths and matches industry standards."
          />

          {isLoading ? (
            <div className="mb-16 mt-6">
              <p className="text-xl font-medium  mb-3  text-gray-600">
                AI is refining your resume...
              </p>
              <div className="h-4 w-full bg-gray-200 rounded">
                <div
                  className="h-4  bg-primary rounded transition-all duration-150"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <></>
            // <ButtonWrapper
            //   text="Next"
            //   icon="arrow-right"
            //   action="submit"
            //   bgColor="#28C76F"
            // />
          )}
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex justify-between">
              <button type="button" onClick={() => handleBack()} className={`px-4  py-2 rounded-md bg-secondary text-white cursor-pointer hover:bg-black ${isLoading? "invisible":""}`}>
                Back
              </button>
              <button onClick={() => simulateLoading()}>

                <Button
                  type="submit"
                  text="Generate"
                  icon="arrow-right"
                  action="submit"
                  bgColor="#28C76F"
                  name="Next"
                  className="px-4  py-2  rounded-md"
                />
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
