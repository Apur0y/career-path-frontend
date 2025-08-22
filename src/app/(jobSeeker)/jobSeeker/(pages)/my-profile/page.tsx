/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import AboutSection from "@/components/profile/AboutSection";
import ExperienceSection from "@/components/profile/Experience";
import SkillsSection from "@/components/profile/SkillsSection";
import EducationSection from "@/components/profile/EducationSection";
import ContactInfoProfile from "@/components/profile/Contact_info";
import Container from "@/components/ui/Container";
import Cookies from "js-cookie";
import { Loader } from "@/components/shared/MainLoader";
import { GoDownload } from "react-icons/go";
import Link from "next/link";



const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "http://172.252.13.71:5005/api/v1/profiles/get-my-profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`, // Use Cookies.get if using cookies
            }, // if using HttpOnly cookie
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();

        console.log("Fetched Profile Data:", data);
        if (!data || !data.data) {
          throw new Error("Invalid profile data format");
        }

        setProfileData(data.data);
        console.log("Profile Data Printed From the Main Page: ", profileData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Function to update the profile data
  const updateProfileData = async (updatedProfileData: any) => {
    try {
      const response = await fetch(
        `http://172.252.13.71:5005/api/v1/profiles/resume/${updatedProfileData?.User?.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfileData), // Send updated data as JSON
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile data");
      }

      const data = await response.json();
      console.log("Profile updated successfully:", data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // In your ProfilePage component
  const handleSkillsUpdate = async (skills: string[]) => {
    try {

      // Filter out null/empty values
      const filteredSkills = skills.filter(skill => skill && skill.trim() !== '');


      // Create updated profile data
      // const updatedProfile = {
      //   ...profileData,
      //   skills
      // };

      const updatedProfile = {
        ...profileData,
        skills: filteredSkills
      };


      // Update local state first for immediate UI update
      setProfileData(updatedProfile);

      // Send update to backend
      const response = await fetch(
        `http://172.252.13.71:5005/api/v1/profiles/resume/${profileData?.User?.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ skills }), // Only send the skills to update
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update skills");
      }

      const data = await response.json();
      console.log("Skills updated successfully:", data);
    } catch (error) {
      console.error("Error updating skills:", error);
      // Optionally revert local state if update fails
      // setProfileData(profileData);
    }
  };

  // Add these functions to your ProfilePage component
  const handleEducationUpdate = async (updatedEducation: any) => {
    try {
      const updatedProfile = {
        ...profileData,
        education: updatedEducation
      };

      setProfileData(updatedProfile);

      const response = await fetch(
        `http://172.252.13.71:5005/api/v1/profiles/resume/${profileData?.User?.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ education: updatedEducation }),
        }
      );

      if (!response.ok) throw new Error("Failed to update education");

      const data = await response.json();
      console.log("Education updated successfully:", data);
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  const handleCertificationUpdate = async (updatedCertifications: any) => {
    try {
      const updatedProfile = {
        ...profileData,
        certifications: updatedCertifications
      };

      setProfileData(updatedProfile);

      const response = await fetch(
        `http://172.252.13.71:5005/api/v1/profiles/resume/${profileData?.User?.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ certifications: updatedCertifications }),
        }
      );

      if (!response.ok) throw new Error("Failed to update certifications");

      const data = await response.json();
      console.log("Certifications updated successfully:", data);
    } catch (error) {
      console.error("Error updating certifications:", error);
    }
  };

  // Add this function to your ProfilePage component
  const handleSocialMediaUpdate = async (updatedSocialMedia: any) => {
    try {
      const updatedProfile = {
        ...profileData,
        socialMedia: updatedSocialMedia
      };

      setProfileData(updatedProfile);

      const response = await fetch(
        `http://172.252.13.71:5005/api/v1/profiles/resume/${profileData?.User?.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ socialMedia: updatedSocialMedia }),
        }
      );

      if (!response.ok) throw new Error("Failed to update social media");

      const data = await response.json();
      console.log("Social media updated successfully:", data);
    } catch (error) {
      console.error("Error updating social media:", error);
    }
  };

  // Loader component with a spinner

  return (
    <div>
      <Container>

        <div className=" mb-16  mx-auto px-4 section-gap bg-white">
        
          {isLoading ? (
            <Loader /> // Show loader while data is loading
          ) : (
            <>
              <p className="text-end my-5 flex justify-end">
             <Link href={"/jobSeeker/resume-download"}>
            <button className="py-3 bg-neutral-600 px-4 rounded-lg text-white flex items-center gap-1 cursor-pointer hover:bg-neutral-800 transition-all duration-300">
              Download Resume<GoDownload />
            </button>
             </Link>
            </p>
              <ProfileHeader profileData={profileData} setProfileData={setProfileData} />
              <div className="space-y-12 mt-8">
                <AboutSection profileData={profileData} setProfileData={setProfileData} />

                <ExperienceSection profileData={profileData} setProfileData={setProfileData} />

                <SkillsSection
                  skills={profileData?.skills || []}
                  onSkillsUpdate={handleSkillsUpdate} // Handle the skill update
                  profileData={profileData}
                />

                <EducationSection
                  profileData={profileData}
                  onEducationUpdate={handleEducationUpdate}
                  onCertificationUpdate={handleCertificationUpdate}
                />
                <ContactInfoProfile profileData={profileData} onSocialMediaUpdate={handleSocialMediaUpdate} />
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
