/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, X } from "lucide-react";
import React, { useState } from "react";

import { toast } from "react-hot-toast";
import EductionAddModal from "./modal/EductionAddModal";
// import EductionEditModal from "./modal/EductionEditModal";
import { ProfileData } from "./SkillsSection";
import { EductionEditModal } from "./modal/EductionEditModal";
import CertificationAddModal from "./modal/CertificationAddModal";

interface EducationSectionProps {
  profileData?: ProfileData;
}

const EducationSection = ({ profileData, onCertificationUpdate, onEducationUpdate }: any) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCertificationAddModalOpen, setIsCertificationAddModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [editingEducation, setEditingEducation] = useState<any>(null);
  const [editingCertification, setEditingCertification] = useState<any>(null);

  // const [selectedEducation, setSelectedEducation] = useState<any>(null); // Track selected experience
  const [selectedEducationNumber, setSelectedEducationNumber] = useState<any>(null)
  const [selectedCertificationNumber, setSelectedCertificationNumber] = useState<any>(null)

  const handleAddEducation = (newEducation: any) => {
    const updatedEducations = [
      ...(profileData?.education || []),
      newEducation
    ];
    onEducationUpdate(updatedEducations);
  };


  const handleAddCertification = (newCertification: any) => {
    const updatedCertifications = [
      ...(profileData?.certifications || []),
      newCertification
    ];
    onCertificationUpdate(updatedCertifications);
  };

  const handleEditEducation = (edu: any, index: number) => {
    setEditingEducation(edu);
    setSelectedEducationNumber(index)
    setIsModalOpenEdit(true);
  };

  const handleEditCertification = (cert: any, index: any) => {
    setEditingCertification(cert);
    setSelectedCertificationNumber(index)
    setIsModalOpenEdit(true);
  };

  return (
    <section>
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-[#ccc] pb-3">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
            Education & Certifications
          </h2>
        </div>
        {/* EDUCATION List */}
        <div className="mt-7">
          <div className="flex items-center justify-between mb-0  pb-3">
            <h2 className="lg:text-2xl text-lg font-medium text-secondary mb-3">
              EDUCATIONS
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300  cursor-pointer "
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add</span>
            </button>
          </div>
          {/*  */}
          <div className="space-y-6">
            {/* Education List */}
            {profileData?.education?.map((edu: any, index: any) => (
              <div key={index} className="flex justify-between items-start pb-4">
                {/* ... existing education display ... */}
                <div className="space-y-2">
                  <h3 className="md:text-lg text-base font-semibold text-secondary">
                    {edu?.degree}
                  </h3>
                  <p className="text-subtitle">
                    {edu?.institution_name}
                  </p>
                  <p className="text-base text-secondary font-medium ">
                    Major: {edu?.major}
                  </p>
                </div>
                <button
                  onClick={() => handleEditEducation(edu, index)}
                  className="text-subtitle hover:text-gray-700 mt-2  cursor-pointer "
                >
                  ✎ Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications List  */}
        <div className="mt-7">
          <div className="flex items-center justify-between  pb-3">
            <h2 className="lg:text-2xl text-xl font-medium text-secondary mb-3">
              CERTIFICATIONS
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300  cursor-pointer "
              onClick={() => setIsCertificationAddModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add</span>
            </button>
          </div>
          <div className="space-y-3">
            {/* Certification List */}
            {profileData?.certifications?.map((certification: any, index: any) => (
              <div key={index} className="flex justify-between items-start pb-1 border-0">
                {/* ... existing certification display ... */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-secondary">
                    {certification?.certification_name}
                  </h3>
                  <p className="text-subtitle">
                    {certification.issuing_organization}
                  </p>
                  {
                    (certification?.issue_date && certification?.expiry_dat) &&
                    <p className="text-base text-secondary font-medium ">
                      Graduated:
                    </p>
                  }
                  <p className="text-sm text-subtitle">
                    {certification?.issue_date && `Start Date: ${certification?.issue_date}`} {certification?.expiry_date && `- End Date: ${certification?.expiry_date}}`}
                  </p>
                </div>
                <button
                  onClick={() => handleEditCertification(certification, index)}
                  className="text-subtitle hover:text-gray-700 mt-2  cursor-pointer "
                >
                  ✎ Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* add eduction  */}
      <EductionAddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onAddEducation={handleAddEducation}
      />

      {/* Add Certification Modal */}
      <CertificationAddModal
        isCertificationAddModalOpen={isCertificationAddModalOpen}
        setIsCertificationAddModalOpen={setIsCertificationAddModalOpen}
        onAddCertification={handleAddCertification}
      />

      <EductionEditModal
        isModalOpenEdit={isModalOpenEdit}
        setIsModalOpenEdit={setIsModalOpenEdit}
        education={editingEducation}
        certification={editingCertification}
        onEducationUpdate={(updatedEdu: any) => {
          const updatedEducation = profileData.education.map((edu: any) =>
            edu === editingEducation ? updatedEdu : edu
          );
          onEducationUpdate(updatedEducation);
        }}
        onCertificationUpdate={(updatedCert: any) => {
          const updatedCertifications = profileData.certifications.map((cert: any) =>
            cert === editingCertification ? updatedCert : cert
          );
          onCertificationUpdate(updatedCertifications);
        }}
        onClose={() => {
          setEditingEducation(null);
          setEditingCertification(null);
        }}
      />
    </section>
  );
};

export default EducationSection;
