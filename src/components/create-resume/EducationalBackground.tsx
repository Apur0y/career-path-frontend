"use client";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Button from "../shared/button/Button";
import FormInput from "../ui/FormInput";
import { IPersonal } from "./personalInfo";
import { useState } from "react";

type EducationFormData = {
  education: {
    degree: string;
    institution: string;
    major: string;
    graduationStart: string;
    graduationEnd: string;
    achievements: FileList | null;
  }[];
};

export default function EducationalBackground({ setStep, formData, setFormData, setCertificate, certificate }: IPersonal) {





  const { register, control, handleSubmit, getValues } = useForm<EducationFormData>({
    defaultValues: {
      education: [
        {
          degree: formData?.degree || "",
          institution: formData?.institution ||  "",
          major:  formData?.major || "",
          graduationStart:  formData?.graduationStart || "",
          graduationEnd:  formData?.graduationEnd || "",
          achievements: formData?.achievements || null,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });
  const router = useRouter();

  const handleSwitch = (data: EducationFormData) => {
    // Capture the current form data when switching between sections
    setFormData({
      ...formData,
      education: data.education ? data.education : [], // Ensure education data is included
    });
    setCertificate(!certificate); // Toggle between Education and Certification sections
  };

  const handleBack = (): void => {
    setStep(3);
    console.log("Back")
  };



  const onSubmit = (data: EducationFormData) => {
    console.log("Educational Data Submitted:", data);
    setStep(5)
    setFormData(data);
    // router.push("/jobseekeruser/contactInfo");
  };

  return (
    <div className="min-h-screen">



      <div className="flex justify-center">
        <div className="w-full max-w-[1180px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields?.map((field, index) => (
              <div key={field.id} className="mb-8  pb-8">
                {/* Degree */}
                <div className="mb-4">
                  <FormInput
                    label="Your Degree"
                    type="text"
                    placeholder="e.g., Bachelor’s, Master’s"
                    {...register(`education.${index}.degree`, {
                      required: true,
                    })}
                  />
                </div>

                {/* Institution and Major */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormInput
                    label="Institution Name"
                    type="text"
                    placeholder="University of Munich"
                    {...register(`education.${index}.institution`, {
                      required: true,
                    })}
                  />
                  <FormInput
                    label="Major"
                    type="text"
                    placeholder="Electronic and Communication Engineering"
                    {...register(`education.${index}.major`, {
                      required: true,
                    })}
                  />
                </div>

                {/* Graduation Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormInput
                    label="Graduation Start"
                    type="date"
                    {...register(`education.${index}.graduationStart`, {
                      required: true,
                    })}
                  />
                  <FormInput
                    label="Graduation End"
                    type="date"
                    {...register(`education.${index}.graduationEnd`, {
                      required: true,
                    })}
                  />
                </div>

                {/* Achievements - static UI block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block  font-medium text-primary-dark mb-2">
                      Certificates
                    </label>

                    <div className="w-full p-6 bg-gray-50 border border-[#c2c2c2] rounded-md flex flex-col items-center justify-center text-center">
                      <svg
                        className="w-10 h-10 text-gray-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <p className="text-gray-500 mb-2">Drop file or browse</p>
                      <p className="text-xs text-gray-400 mb-4">
                        Format: jpeg, png & Max file size: 25 MB
                      </p>
                      <div>
                        <label
                          htmlFor="fileUpload"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Upload File
                        </label>

                        <div className="relative">
                          <input
                            id="fileUpload"
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            {...register(`education.${index}.achievements`)}
                          />
                          <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-center text-gray-600">
                            {"Click to browse or drag a file here"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                {fields.length > 1 && (
                  <div className="flex justify-end mb-4">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 text-sm flex items-center"
                    >
                      <IoIosRemoveCircleOutline className="mr-1" />
                      Remove Degree
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Add Another Degree Button */}
            <div className="mb-12">
              <button
                type="button"
                onClick={() =>
                  append({
                    degree: "",
                    institution: "",
                    major: "",
                    graduationStart: "",
                    graduationEnd: "",
                    achievements:null
                  })
                }
                className="text-[#28C76F] font-medium flex items-center"
              >
                <span className="mr-2">+</span> Add Another Degree
              </button>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => handleBack()} className="px-4  py-2 rounded-md bg-secondary text-white cursor-pointer hover:bg-black">
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
            <button
              onClick={() => handleSwitch(getValues())}  // Call handleSwitch with the current form data
              type="button"
              className="bg-secondary absolute top-0 right-0 rounded-lg px-3 py-2 md:px-6 md:py-3 text-white"
            >
              {certificate ? "Certifications" : "Education"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
