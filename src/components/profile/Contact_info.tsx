import React, { useState } from "react";
import { GraduationCap, Plus, X } from "lucide-react";
import Link from "next/link";
import SocialLinksAddModal from "./modal/SocialLinksAddModal";
import { SocialLinksEditModal } from "./modal/SocialLinksEditModal";
// import SocialLinksEditModal from "./modal/SocialLinksEditModal";

const ContactInfoProfile = ({ profileData, onSocialMediaUpdate }: any) => {
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [editingField, setEditingField] = useState<{
    field: string;
    value: string;
  } | null>(null);

  const handleEdit = (field: string, value: string) => {
    setEditingField({ field, value });
    setIsModalOpenEdit(true);
  };

  const handleSave = (updatedValue: string) => {
    if (!editingField) return;

    const updatedSocialMedia = {
      ...profileData.socialMedia,
      [editingField.field]: updatedValue
    };

    onSocialMediaUpdate(updatedSocialMedia);
    setIsModalOpenEdit(false);
    setEditingField(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 border-b border-[#ccc] pb-3">
        <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
          Contact Information & Social Links
        </h2>
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add</span>
        </button> */}
      </div>
      {/* Social link  */}
      <div>
        {/* GitHub URL  */}
        {profileData?.socialMedia?.github_url && (
          <div className="flex justify-between items-start pb-4">
            <div className="space-y-2">
              <p className="text-base text-secondary font-medium">GitHub:</p>
              <Link
                href={profileData.socialMedia.github_url}
                className="text-sm text-[#009DFF] underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.socialMedia.github_url}
              </Link>
            </div>
            <button
              onClick={() => handleEdit('github_url', profileData.socialMedia.github_url)}
              className="text-subtitle hover:text-gray-700 mt-2  cursor-pointer "
            >
              ✎ Edit
            </button>
          </div>
        )}

        {/* Likedin URL  */}
        {profileData?.socialMedia?.linkedin_profile_url && (
          <div className="flex justify-between items-start pb-4">
            <div className="space-y-2">
              <p className="text-base text-secondary font-medium">LinkedIn:</p>
              <Link
                href={profileData.socialMedia.linkedin_profile_url}
                className="text-sm text-[#009DFF] underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.socialMedia.linkedin_profile_url}
              </Link>
            </div>
            <button
              onClick={() => handleEdit('linkedin_profile_url', profileData.socialMedia.linkedin_profile_url)}
              className="text-subtitle hover:text-gray-700 mt-2"
            >
              ✎ Edit
            </button>
          </div>
        )}

        {/* Personal Website  */}
        {profileData?.socialMedia?.personal_website_url && (
          <div className="flex justify-between items-start pb-4">
            <div className="space-y-2">
              <p className="text-base text-secondary font-medium">Personal Website:</p>
              <Link
                href={profileData.socialMedia.personal_website_url}
                className="text-sm text-[#009DFF] underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.socialMedia.personal_website_url}
              </Link>
            </div>
            <button
              onClick={() => handleEdit('personal_website_url', profileData.socialMedia.personal_website_url)}
              className="text-subtitle hover:text-gray-700 mt-2 cursor-pointer "
            >
              ✎ Edit
            </button>
          </div>
        )}

        {/* Portfolio URL  */}
        {profileData?.socialMedia?.portfolio_url && (
          <div className="flex justify-between items-start pb-4">
            <div className="space-y-2">
              <p className="text-base text-secondary font-medium">Portfolio:</p>
              <Link
                href={profileData.socialMedia.portfolio_url}
                className="text-sm text-[#009DFF] underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.socialMedia.portfolio_url}
              </Link>
            </div>
            <button
              onClick={() => handleEdit('portfolio_url', profileData.socialMedia.portfolio_url)}
              className="text-subtitle hover:text-gray-700 mt-2 cursor-pointer "
            >
              ✎ Edit
            </button>
          </div>
        )}

        {/* Twitter URL  */}
        {profileData?.socialMedia?.twitter_url && (
          <div className="flex justify-between items-start pb-4">
            <div className="space-y-2">
              <p className="text-base text-secondary font-medium">Twitter:</p>
              <Link
                href={profileData.socialMedia.twitter_url}
                className="text-sm text-[#009DFF] underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.socialMedia.twitter_url}
              </Link>
            </div>
            <button
              onClick={() => handleEdit('twitter_url', profileData.socialMedia.twitter_url)}
              className="text-subtitle hover:text-gray-700 mt-2 cursor-pointer "
            >
              ✎ Edit
            </button>
          </div>
        )}

        {/* Other Social Media  */}
        {profileData?.socialMedia?.other_social_media_url && (
          <div className="flex justify-between items-start pb-4">
            <div className="space-y-2">
              <p className="text-base text-secondary font-medium">Other Social Media:</p>
              <Link
                href={profileData.socialMedia.other_social_media_url}
                className="text-sm text-[#009DFF] underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.socialMedia.other_social_media_url}
              </Link>
            </div>
            <button
              onClick={() => handleEdit('other_social_media_url', profileData.socialMedia.other_social_media_url)}
              className="text-subtitle hover:text-gray-700 mt-2  cursor-pointer "
            >
              ✎ Edit
            </button>
          </div>
        )}
      </div>


      {/* <SocialLinksAddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      /> */}

      {/* edit Social contact info  */}
      {/* <SocialLinksEditModal
        isModalOpenEdit={isModalOpenEdit}
        setIsModalOpenEdit={setIsModalOpenEdit}
      /> */}

      <SocialLinksEditModal
        isModalOpenEdit={isModalOpenEdit}
        setIsModalOpenEdit={setIsModalOpenEdit}
        field={editingField?.field}
        value={editingField?.value}
        onSave={handleSave}
      />
    </div>
  );
};

export default ContactInfoProfile;
