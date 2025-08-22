/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileText, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import { toast } from "react-hot-toast";
import ExperienceAddModal from "./modal/ExperienceAddModal";
import ExperienceEditModal from "./modal/ExperienceEditModal";
import Cookies from "js-cookie";

interface ExperienceSectionProps {
  experiences: Experience[];
}

interface Experience {
  title: string;
  company: string;
  date: string;
  description: string;
  hugs?: number | null;
  ExperienceNumber: string;
}

// Change Time Format
const changeTimeFormat = (timeStr: string) => {
  // const timeStr = "2025-07-29T03:50:11.596Z";
  const date = new Date(timeStr);
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate
}

const ExperienceSection = ({
  setProfileData,
  profileData
}: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);
  const [selectedExperience, setSelectedExperience] = useState<any>(null); // Track selected experience
  const [selectedExperienceNumber, setSelectedExperienceNumber] = useState<any>(null)
  // const 

  const experienceData = [
    {
      experienceNumber: "Experience 1",
      title: "Mid-Level UI/UX Designer",
      company: "SM Technology (betopia Group)",
      date: "08/08/2024 - Till Now",
      description:
        "I am very happy to get the opportunity for UI/UX designer intern. I strive to bring creativity, diligence, and fresh perspectives to every project. Eager to learn, I embrace challenges and aim to exceed expectations with my innovative designs and user-centric approach.",
      hugs: 125,
    },
    {
      experienceNumber: "Experience 2",
      title: "Jr. UI/UX Designer",
      company: "SM Technology (betopia Group)",
      date: "20/04/2024 - 31/07/2024",
      description:
        "I am very happy to get the opportunity for UI/UX designer intern. I strive to bring creativity, diligence, and fresh perspectives to every project. Eager to learn, I embrace challenges and aim to exceed expectations with my innovative designs and user-centric approach.",
      hugs: 26,
    },
    {
      experienceNumber: "Experience 3",

      title: "Intern UI/UX Designer",
      company: "SM Technology (betopia Group)",
      date: "20/01/2024 - 18/04/2024",
      description:
        "I am very happy to get the opportunity for UI/UX designer intern. I strive to bring creativity, diligence, and fresh perspectives to every project. Eager to learn, I embrace challenges and aim to exceed expectations with my innovative designs and user-centric approach.",
      hugs: null,
    },
  ];

  // Handle clicking the edit button
  const handleEditClick = (experience: any, index: any) => {
    setSelectedExperience(experience); // Set the selected experience
    setSelectedExperienceNumber(index);
    setIsModalOpenEdit(true); // Open the edit modal
  };

  // Handle the update of the experience
  // const handleUpdateExperience = (updatedExperience: any) => {

  //   console.log("Updated Data from Experience Page: ", updatedExperience)

  //   // Update the jobExperience array in profileData
  //   setProfileData((prevData: any) => ({
  //     ...prevData,
  //     jobExperience: prevData.jobExperience.map((exp: any, index: any) =>
  //       index === selectedExperienceNumber
  //         ? updatedExperience // Replace the updated experience
  //         : exp // Keep other experiences unchanged
  //     ),
  //   }));


  //   // Now that profileData is updated, send the full updated data to the backend
  //   // updateProfileData(profileData);

  //   const updatedProfile = {
  //     ...prevData,
  //     jobExperience: updatedJobExperience,
  //   };

  //   // Send the full updated profile data to the backend
  //   updateProfileData(updatedProfile); // Pass the full updated profile to the backend

  //   // });

  //   console.log("Final full data after experiange updated: ", profileData);
  //   return updatedProfile; // Return the updated profile data
  // };

  // Handle the update of the experience
  const handleUpdateExperience = (updatedExperience: any) => {
    // Update the jobExperience array in profileData
    setProfileData((prevData: any) => {
      const updatedJobExperience = prevData.jobExperience.map((exp: any, index: any) =>
        index === selectedExperienceNumber
          ? updatedExperience // Replace the updated experience
          : exp // Keep other experiences unchanged
      );

      const updatedProfile = {
        ...prevData,
        jobExperience: updatedJobExperience,
      };

      // Send the full updated profile data to the backend
      updateProfileData(updatedProfile); // Pass the full updated profile to the backend

      return updatedProfile; // Return the updated profile data
    });
  };


  // Send the full profile data to the backend API
  const updateProfileData = async (updatedProfileData: any) => {
    try {

      const { id, userId, User, profileId, ...profileWithoutId } = updatedProfileData;

      console.log("Profile Data Without id: ", profileWithoutId);

      const response = await fetch(`http://172.252.13.71:5005/api/v1/profiles/resume/${updatedProfileData?.User?.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileWithoutId), // Send full profile data as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to update profile data");
      }

      const data = await response.json();
      console.log("Profile updated successfully:", data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <section>
      <div>
        <div className="flex border-b pb-3 border-b-[#cfcbcb] items-center justify-between mb-4">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
            Work Experience
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            {/* <Plus className="w-4 h-4" />
            <span className="text-sm">Add Experience</span> */}
          </button>
        </div>
        <div className="  ">
          {profileData?.jobExperience?.map((exp: any, index: any) => (
            <div key={index} className="space-y-2 mt-6">
              <div className="flex justify-between mb-2">
                <h2 className="md:text-2xl text-xl font-bold text-secondary mb-2">
                  Experience-{index + 1}
                </h2>{" "}
                <button
                  onClick={() => handleEditClick(exp, index)} // Pass the experience to the edit function
                  className="flex items-center gap-2 text-subtitle mb-2 cursor-pointer"
                >
                  <LuPencilLine className="text-lg" /> Edit
                </button>
              </div>
              <div className="flex justify-between">
                <div className="space-y-2">
                  <h3 className="md:text-lg text-base  font-semibold text-secondary">
                    {exp?.job_title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {exp?.company_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm sm:text-base text-gray-500">
                    {changeTimeFormat(exp?.start_date)} - {changeTimeFormat(exp?.end_date)}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="md:text-lg text-base font-semibold text-subtitle">
                  Experience Summary
                </h3>
                <p className="mt-1 text-gray-700 text-sm sm:text-base ">
                  {exp?.job_description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <ExperienceAddModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <ExperienceEditModal
          isModalOpenEdit={isModalOpenEdit}
          setIsModalOpenEdit={setIsModalOpenEdit}
          selectedExperience={selectedExperience} // Pass the selected experience to the modal
          setProfileData={setProfileData}
          profileData={profileData}
          handleUpdateExperience={handleUpdateExperience} // Pass update handler
        />
      </div>
    </section>
  );
};

export default ExperienceSection;
