import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  jobTitle: string;
  company: string;
  dateRange: string;
  experienceSummary: string;
}

interface ExperienceAddModal {
  isModalOpen: boolean;
  setIsModalOpen: any;
}

const ExperienceAddModal: React.FC<ExperienceAddModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    defaultValues: {
      jobTitle: "Mid-Level UI/UX Designer",
      company: "SM Technology (betopia Group)",
      dateRange: "08/08/2024 - Till Now",
      experienceSummary:
        "I am very happy to get the opportunity for UI/UX Designer intern. I strive to bring creativity, diligence, and fresh perspectives to every project. Eager to learn, I embrace challenges and aim to exceed expectations with my innovative designs and user-centric approach.",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    setIsModalOpen(false); // Close modal after submission
    reset(data); // Update default values with submitted data
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  const { defaultValues } = formState;

  return (
    <div className="">
      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Edit Experience</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700">Job Title</label>
                <input
                  {...register("jobTitle")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Job Title"
                />
              </div>
              <div>
                <label className="block text-gray-700">Company</label>
                <input
                  {...register("company")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Company"
                />
              </div>
              <div>
                <label className="block text-gray-700">Date Range</label>
                <input
                  {...register("dateRange")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Date Range"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Experience Summary
                </label>
                <textarea
                  {...register("experienceSummary")}
                  className="w-full border-b border-gray-300 focus:outline-none resize-none h-24"
                  placeholder="Experience Summary"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceAddModal;
