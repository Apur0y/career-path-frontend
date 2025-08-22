"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../shared/button/Button";
import SectionHeader from "../shared/SectionHeader";
import { useDispatch, useSelector } from "react-redux";

// Adjust path if different

interface CareerFormData {
  jobTitle: string;
  jobDescription: string;
}
interface IPersonal {
  setStep: any;
  formData: any
  setFormData: any;
}


export default function   CareerOverview({setStep,formData,setFormData}: IPersonal) {
  const { register, handleSubmit } = useForm<CareerFormData>();
  const router = useRouter();
const dispatch=useDispatch()
  const handleBack = (): void => {
    setStep(1);
    console.log("Back")
  };
  //  const data = useSelector(state => state.allResumeData.resumeData);

  // console.log(data)
  const onSubmit = (data: CareerFormData): void => {
    console.log(data, " Tour career here");
    setStep(3);
    setFormData(data)

    // router.push("/jobseekeruser/skillexprience");
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-center mt-12">
        <div className="p-6 w-full max-w-[1180px] h-[752px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <SectionHeader
              title="Your Career Overview"
              description="A strong career summary will make a lasting impression on recruiters. Let’s create a summary that highlights your experience and goals."
            ></SectionHeader>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
              <div className="w-full">
                <label className="block text-xl font-medium text-gray-800">
                  Role
                </label>
                <input
                  type="text"
                  placeholder="Geben Sie Ihre letzte bzw. aktuelle Berufsbezeichnung ein"
                  defaultValue={formData?.jobTitle}
                  className="w-full bg-gray-50 py-4 px-4 border border-[#c2c2c2] rounded"
                  {...register("jobTitle", { required: true })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-800 ">
              Career Objective
              </label>
              <textarea
                className="w-full h-[224px] bg-gray-50 py-4 px-4 border border-[#c2c2c2] rounded-md mb-16"
                id="textarea"
                placeholder="Ein erfahrener Marketingprofi mit über 5 Jahren Erfahrung im digitalen Marketing, spezialisiert auf SEO, Social-Media-Strategien und Content-Erstellung"
                defaultValue={formData?.jobDescription}
                {...register("jobDescription", { required: true })}
              />
            </div>


            <div className="flex justify-between">
              <button type="button" onClick={()=>handleBack()} className="px-4  py-2 rounded-md bg-secondary text-white cursor-pointer hover:bg-black">
                Back
              </button>
              <Button
                type="submit"
                text="Next"
                icon="arrow-right"
                action="submit"
                bgColor="#28C76F"
                name="Next"
                className="px-4  py-2  rounded-md"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
