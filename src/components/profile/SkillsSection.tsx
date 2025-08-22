import React, { useState } from "react";
import { Plus } from "lucide-react";
import SkillsAddModal from "./modal/SkillsAddModal";
import toast from "react-hot-toast";

interface JobExperience {
  title: string;
  company: string;
  date: string;
  description: string;
  hugs?: number | null;
  ExperienceNumber: string;
  skills: string
}

export interface ProfileData {
  jobExperience: JobExperience[];
  skills: string[]; // Add skills directly in ProfileData
}

interface SkillsSectionProps {
  skills: string[];
  onSkillsUpdate: (skills: string[]) => void;
  profileData?: ProfileData;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onSkillsUpdate,
  profileData
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const allSkills = [
  //   ...new Set([
  //     ...(profileData?.skills || []),
  //     ...(profileData?.jobExperience?.flatMap((job: any) =>
  //       job?.skills ? job?.skills?.split(',').map((s: string) => s.trim()) : []
  //     ) || [])
  //   ])
  // ].filter(skill => skill && skill.trim() !== ''); // Filter out empty/null skills

  const allSkills = [
    ...new Set([
      ...(profileData?.skills || []),
      ...(profileData?.jobExperience?.flatMap((job: any) =>
        Array.isArray(job?.skills)
          ? job?.skills.map((s: string) => s.trim()) // Map over the array of skills
          : [] // Return an empty array if job.skills is not an array
      ) || [])
    ])
  ].filter(skill => skill && skill.trim() !== ''); // Filter out empty/null skills


  const handleAddSkill = (newSkill: string) => {
    if (!newSkill.trim()) return;

    // Check if skill already exists
    if (allSkills.includes(newSkill.trim())) {
      toast.error("This skill already exists in your profile");
      return;
    }

    // Update skills
    onSkillsUpdate([...allSkills, newSkill.trim()]);
  };

  return (
    <section>
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-[#ccc] pb-3">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
            Skills
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300  cursor-pointer "
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-3 space-x-4 pb-4">
          {
            // Combine skills from both profileData.skills and job experiences
            [...new Set([
              ...(profileData?.skills || []), // Include profile-level skills
              ...(profileData?.jobExperience?.flatMap((job) => job?.skills as string || []) || []) // Include job skills
            ])]
              .filter(skill => skill) // Filter out any empty/null/undefined skills
              .map((skill) => (
                <button
                  key={skill} // Use skill as key since it's unique
                  className="px-6 py-2 bg-gray-100 text-secondary rounded-full shadow hover:bg-gray-200"
                >
                  {skill}
                </button>
              ))
          }
        </div>
      </div>

      <SkillsAddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onAddSkill={handleAddSkill}
      />
    </section>
  );
};

export default SkillsSection;
