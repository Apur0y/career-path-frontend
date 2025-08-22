import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Button from "../shared/button/Button";
import SectionHeader from "../shared/SectionHeader";
import FormInput from "../ui/FormInput";

// Type definition
type WorkForm = {
  experiences: {
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    jobDescription: string;
    achievements: FileList | null;
    skills: string[];
    languages: string[]; // Added languages field
  }[];
};

interface IPersonal {
  setStep: any;
  formData: any;
  setFormData: any;
}

export default function SkillsExperience({ setStep, formData, setFormData }: IPersonal) {
  const { control, register, handleSubmit, getValues } = useForm<WorkForm>({
    defaultValues: {
      experiences: [
        {
          jobTitle: formData?.jobTitle || '',
          companyName: formData?.companyName || '',
          startDate: formData?.startDate || '',
          endDate: formData?.endDate || '',
          jobDescription: formData?.jobDescription || '',
          achievements: formData?.achievements || null,
          skills: formData?.skills || [],
          languages: formData?.languages || [], // languages field initialized as an empty array
        },
      ],
    },
  });

  const [skills, setSkills] = useState(["Website Design", "Next.js", "CSS"]);
  const [newSkill, setNewSkill] = useState("");
  const [languages, setLanguages] = useState<string[]>(["English"]);
  const [newLanguage, setNewLanguage] = useState("");


  console.log("Skill experience",formData)

  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const addLanguage = () => {
    const language = newLanguage.trim();
    if (language && !languages.includes(language)) {
      setLanguages([...languages, language]);
      setNewLanguage("");
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setLanguages(languages.filter((language) => language !== languageToRemove));
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const router = useRouter();

  const handleBack = (): void => {
    setStep(2);
    console.log("Back");
  };

  const onSubmit = (data: WorkForm) => {
    // Merging skills and languages with form data
    const updatedData = {
      ...data,
      experiences: data.experiences.map((experience, index) => ({
        ...experience,
        skills: skills, // Adding skills to each experience
        languages: languages, // Adding languages to each experience
      })),
    };

    setStep(4);
    setFormData(updatedData); // Updating form data to include skills and languages
    // router.push("/jobseekeruser/education");
  };
  console.log("New fields",fields)

  return (
    <div className="flex justify-center mt-12">
      <div className="p-6 w-full max-w-[1180px] h-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionHeader
            title="Your Work Experience & Skills"
            description="Highlight your work experience and skills. The more detail you provide, the better the AI can tailor your resume to match job opportunities."
          />

          {fields?.map((field, index) => (
            <div key={field.id} className="mb-8">
              {/* Job Title */}
              <div className="mb-4">
                <FormInput
                  label="Job Title"
                  type="text"
                  placeholder="Junior Software Engineer"
                  defaultValue={formData?.jobTitle}
                  {...register(`experiences.${index}.jobTitle`)}
                />
              </div>

              {/* Company Name */}
              <div className="mb-4 md:w-1/2">
                <FormInput
                  label="Company Name"
                  type="text"
                  placeholder="Super Job"
                  defaultValue={formData?.companyName}
                  {...register(`experiences.${index}.companyName`)}
                />
              </div>

              {/* Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormInput
                  label="Start Date"
                  type="date"
                  {...register(`experiences.${index}.startDate`)}
                />
                <FormInput
                  label="End Date"
                  type="date"
                  {...register(`experiences.${index}.endDate`)}
                />
              </div>

              {/* Job Description */}
              <div className="mb-4">
                <label className="text-[#333333] font-medium">
                  Job Description
                </label>
                <textarea
                  className="w-full h-[224px] bg-gray-50 py-5 px-4 border border-[#c2c2c2] rounded-md"
                  placeholder="Ein erfahrener Ingenieurprofi ..."
                  {...register(`experiences.${index}.jobDescription`)}
                />
              </div>

              {/* Achievements File Input */}
              <div className="mb-4">
                <label className="text-[#333333] font-medium mb-2">
                  Achievements
                </label>
                <input
                  type="file"
                  multiple
                  {...register(`experiences.${index}.achievements`)}
                  className="px-4 py-4 bg-gray-50 border border-[#c2c2c2] rounded-md w-full"
                />
              </div>



              {/* Skills */}
              <div>
                <label className="text-[#333333] font-medium mb-2">Skills Needed</label>
                <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md min-h-[50px] mb-3">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-red-500"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Type a skill and press Enter"
                    className="flex-1 px-6 py-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Languages */}
              <div className="mt-3">
                <label className="text-[#333333] font-medium mb-2">Languages</label>
                <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md min-h-[50px] mb-3">
                  {languages.map((language, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      {language}
                      <button
                        type="button"
                        onClick={() => removeLanguage(language)}
                        className="ml-2 hover:text-red-500"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addLanguage()}
                    placeholder="Type a language and press Enter"
                    className="flex-1 px-6 py-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addLanguage}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 text-sm mb-4 text-end flex cursor-pointer"
                  >
                    <IoIosRemoveCircleOutline className="my-auto mr-1" /> Remove Experience
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Another Experience */}
          <div className="mb-12">
            <button
              type="button"
              onClick={() =>
                append({
                  jobTitle: "",
                  companyName: "",
                  startDate: "",
                  endDate: "",
                  jobDescription: "",
                  achievements: null,
                  skills: [], // Adding skills to new experience
                  languages: [], // Adding languages to new experience
                })
              }
              className="text-[#28C76F] font-medium flex items-center cursor-pointer"
            >
              <span className="mr-2">+</span> Add Another Work Experience
            </button>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => handleBack()}
              className="px-4 py-2 rounded-md bg-secondary text-white cursor-pointer hover:bg-black"
            >
              Back
            </button>
            <Button
              type="submit"
              text="Next"
              icon="arrow-right"
              action="submit"
              bgColor="#28C76F"
              name="Next"
              className="px-4 py-2 rounded-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
