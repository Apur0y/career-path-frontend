import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";

interface FormData {
  job_title: string;
  company_name: string;
  start_date: string;
  end_date: string;
  job_description: string;
}

interface ExperienceEditModalProps {
  isModalOpenEdit: boolean;
  setIsModalOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  selectedExperience: any;
  handleUpdateExperience: (updatedExperience: any) => void;
}

const ExperienceEditModal = ({
  isModalOpenEdit,
  setIsModalOpenEdit,
  selectedExperience,
  setProfileData,
  profileData,
  handleUpdateExperience,
}: any) => {

  console.log("Selected Experiange Data: ", selectedExperience)
  console.log("Profile Data from the Experience Edit Modal: ", profileData)

  // Helper function to format date to "yyyy-MM-dd"
  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      job_title: selectedExperience?.job_title || "",
      company_name: selectedExperience?.company_name || "",
      start_date: formatDate(selectedExperience?.start_date) || "",
      end_date: formatDate(selectedExperience?.end_date) || "",
      job_description: selectedExperience?.job_description || "",
    },
  });

  // Reset form with selectedExperience data when modal is opened
  useEffect(() => {
    if (selectedExperience) {
      reset({
        job_title: selectedExperience?.job_title || "",
        company_name: selectedExperience?.company_name || "",
        start_date: formatDate(selectedExperience?.start_date) || "",
        end_date: formatDate(selectedExperience?.end_date) || "",
        job_description: selectedExperience?.job_description || "",
      });
    }
  }, [isModalOpenEdit, selectedExperience, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Combine the updated form data with the selected experience data
    const newUpdatedExperience = {
      job_title: selectedExperience?.job_title,
      company_name: selectedExperience?.company_name,
      start_date: selectedExperience?.start_date,
      end_date: selectedExperience?.end_date,
      job_description: selectedExperience?.job_description
    }
    const updatedExperience = { ...newUpdatedExperience, ...data };
    console.log("Updated Experience Data: ", updatedExperience);
    handleUpdateExperience(updatedExperience); // Pass the updated experience back to the parent
    setIsModalOpenEdit(false); // Close the modal after updating
  };


  // const onSubmit: SubmitHandler<FormData> = async (data) => {
  //   try {
  //     console.log("Experience Updated Data: ", data);

  //     const updatedData = {
  //       jobTitle: data?.jobTitle,
  //       companyName: data?.companyName,
  //       startDate: data?.startDate,
  //       phonendDateeNumber: data?.endDate,
  //       jobDescription: data?.jobDescription,
  //     };

  //     // const response = await fetch(`http://172.252.13.71:5005/api/v1/profiles/resume/${profileData?.User?.id}`, {
  //     //   method: "PATCH",
  //     //   headers: {
  //     //     Authorization: `Bearer ${Cookies.get("accessToken")}`,
  //     //     "Content-Type": "application/json",
  //     //   },
  //     //   body: JSON.stringify(updatedData), // Send updated data as JSON
  //     // });

  //     // if (!response.ok) {
  //     //   throw new Error("Failed to update profile data");
  //     // }

  //     // const updatedData = await response.json();
  //     console.log("Profile updated successfully:", updatedData);

  //     // Close the modal and reset form after submission
  //     setIsModalOpenEdit(false);
  //     reset(data);

  //     setProfileData((prevData: any) => ({
  //       ...prevData,  // Spread the previous state to maintain unchanged data
  //       ...updatedData // Apply the updated data (could be nested as well)
  //     }));

  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  const handleCancel = () => {
    setIsModalOpenEdit(false);
  };

  return (
    <>
      {isModalOpenEdit && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Edit Experience</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700">Job Title</label>
                <input
                  {...register("job_title")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Job Title"
                />
              </div>
              <div>
                <label className="block text-gray-700">Company Name</label>
                <input
                  {...register("company_name")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Company"
                />
              </div>
              <div>
                <label className="block text-gray-700">Start Date</label>
                <input
                  {...register("start_date")}
                  type="date"
                  className="w-full border-b border-gray-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700">End Date</label>
                <input
                  {...register("end_date")}
                  type="date"
                  className="w-full border-b border-gray-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700">Job Description</label>
                <textarea
                  {...register("job_description")}
                  className="w-full border-b border-gray-300 focus:outline-none resize-none h-24"
                  placeholder="Experience Summary"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400  cursor-pointer "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700  cursor-pointer "
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ExperienceEditModal;
