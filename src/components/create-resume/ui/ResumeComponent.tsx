import React from "react";
import { CgMail } from "react-icons/cg";
import { FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import { PiPhone } from "react-icons/pi";
import { TbMapPinCode } from "react-icons/tb";
import { RefObject } from "react";
import { FaExternalLinkAlt, FaGithub, FaTwitter } from "react-icons/fa";
import { useGetMeQuery } from "@/redux/features/auth/auth";
import { IoLocationOutline } from "react-icons/io5";

interface ResumeComponentProps {
  downloadResume: () => void;
  printRef: RefObject<HTMLDivElement | null>;
  profileData: any; // Adjust type as needed
}

const ResumeComponent: React.FC<ResumeComponentProps> = ({
  downloadResume,
  printRef,
  profileData,
}) => {
  function formatDateRangeWithTillNow(start: string, end?: string): string {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;

    if (isNaN(startDate.getTime()) || (end && isNaN(endDate!.getTime()))) {
      return "Invalid date";
    }

    const format = (date: Date) =>
      date
        .toLocaleDateString("en-GB")
        .split("/")
        .map((part) => part.padStart(2, "0"))
        .join("/");

    const startFormatted = format(startDate);
    const endFormatted = endDate ? format(endDate) : "Till Now";

    return `${startFormatted} - ${endFormatted}`;
  }

  const { data: myUser, refetch } = useGetMeQuery({});

  return (
    // <div ref={printRef} className="p-5 border-4 border-[#2B93DD] mx-auto bg-white min-h-screen overflow-hidden flex flex-col">
    // // <div ref={printRef} className="p-5 border-0 border-[#2B93DD] mx-auto bg-white  overflow-hidden">
    <div
      ref={printRef}
      className="p-5 border-0 border-[#2B93DD] mx-auto bg-white min-w-5xl"
    >
      {/* Header Section */}
      <div className="p-2">
        <div className="p-2 flex gap-20">
          <div className="pr-0">
            <div className="w-48  h-48 p-2 rounded-full border-0 border-[#7fbeeb] overflow-hidden">
              <Image
                src={myUser?.data.profilePic || "/avatarPlaceholder1.png"} // Fallback image
                alt="image"
                className="w-full h-full rounded-full justify-center object-cover"
                height={200}
                width={200}
              />
              {/* <img src={myUser?.data.profilePic} alt="img"  /> */}
              {/* <div className="h-[150px] w-[150px] rounded-full bg-[#E5E7EB]  flex items-center justify-center"></div> */}
            </div>
          </div>

          <div className="mt-0">
            <h1 className="text-5xl font-bold text-[#323B4C] mb-2">
              {profileData?.firstName} {profileData?.lastName}
            </h1>
            <p className="text-xl text-[#323B4C] mb-2">
              {profileData?.profile?.JobTitle}
            </p>
            <div className="flex flex-wrap gap-8 justify-start items-center text-[#323B4C]">
              <div className="flex items-center space-x-2">
                <PiPhone className="w-4 h-4" />
                <p>{profileData?.phoneNumber || ""}</p>
              </div>
              <div className="flex items-center space-x-2">
                <CgMail className="w-4 h-4" />
                <p>{profileData?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-[#323B4C] mt-2">
              <IoLocationOutline className="w-4 h-4" />
              <p>
                {profileData?.address}, {profileData?.city},{profileData?.state}
                , {profileData?.countryRegion}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 flex gap-20 flex-1">
        {/* Left Column */}
        <div className="border-r-[1px] border-[#a2d2f0] pr-16">
          {/* Portfolio */}
          {(profileData?.socialMedia?.personal_website_url ||
            profileData?.socialMedia?.linkedin_profile_url) && (
            <div className="mb-8">
              <h2 className="text-lg font-bold  mb-4">PORTFOLIO</h2>

              <div className="space-y-2">
                {profileData?.socialMedia?.personal_website_url && (
                  <a
                    href={profileData.socialMedia.personal_website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] hover:underline text-sm flex gap-2 items-center"
                  >
                    <FaExternalLinkAlt className="size-5 text-[#ff46b8]" />
                    <span>Portfolio</span>
                  </a>
                )}

                {profileData?.socialMedia?.linkedin_profile_url && (
                  <a
                    href={profileData.socialMedia.linkedin_profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] hover:underline text-sm flex gap-2 items-center"
                  >
                    <FaLinkedin className="size-5 text-[#3B82F6]" />
                    <span>LinkedIn</span>
                  </a>
                )}

                {profileData?.socialMedia?.github_url && (
                  <a
                    href={profileData.socialMedia.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] hover:underline text-sm flex gap-2 items-center"
                  >
                    <FaGithub className="size-5" />
                    <span>GitHub</span>
                  </a>
                )}

                {profileData?.socialMedia?.twitter_url && (
                  <a
                    href={profileData.socialMedia.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] hover:underline text-sm flex gap-2 items-center"
                  >
                    <FaTwitter className="size-5 " />
                    <span>Twitter</span>
                  </a>
                )}

                {profileData?.socialMedia?.portfolio_url && (
                  <a
                    href={profileData.socialMedia.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] hover:underline text-sm flex gap-2 items-center"
                  >
                    <FaExternalLinkAlt className="size-5 text-[#ff46b8]" />
                    <span>Portfolio Website</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {profileData?.skills?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold  mb-4">SKILLS</h2>

              <ul className="flex flex-col gap-1">
                {profileData.skills.map((skill: string) => (
                  <li key={skill} className="text-[#374151]">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {profileData?.languages?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold  mb-4">LANGUAGES</h2>

              <ul className="flex flex-col gap-1">
                {profileData.languages.map((lang: string, index: number) => (
                  <li key={index} className="text-[#374151]">
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-2/3">
          {/* About Me */}
          <div className="mb-8">
            <h2 className="text-lg font-bold  mb-4">ABOUT ME</h2>
            <p className="text-[#374151]">{profileData?.aboutMe}</p>
          </div>

          {/* Education */}
          {profileData?.education?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold  mb-4">
                EDUCATION QUALIFICATION
              </h2>

              {profileData.education.map((edu: any, idx: number) => (
                <div key={idx} className="mb-4">
                  <h3 className="font-semibold text-[#1F2937]">{edu.degree}</h3>
                  <p className="text-sm text-[#374151]">
                    {edu.institution_name}
                  </p>
                  <p className="text-sm text-[#374151]">{edu.major}</p>
                </div>
              ))}
            </div>
          )}

          {/* Training / Certification */}
          {profileData?.certifications?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold  mb-4">
                TRAINING / CERTIFICATION
              </h2>

              {profileData.certifications.map(
                (certificate: any, idx: number) => (
                  <div key={idx} className="mb-4">
                    <h3 className="font-semibold text-[#1F2937]">
                      {certificate.certification_name}
                    </h3>

                    <p className="text-sm text-[#374151]">
                      {certificate.issuing_organization}
                    </p>

                    {certificate.issue_date && (
                      <p className="text-sm text-[#374151]">
                        Issue Date: {certificate.issue_date}
                      </p>
                    )}

                    {certificate.expiry_date && (
                      <p className="text-sm text-[#374151]">
                        Expiry Date: {certificate.expiry_date}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          )}

          {/* Work Experience */}
          {profileData?.jobExperience?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold  mb-4">
                WORK EXPERIENCE
              </h2>

              {profileData.jobExperience.map((job: any, idx: number) => (
                <div key={idx} className="mb-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-[#1F2937]">
                      {job.job_title}
                    </h3>

                    <span className="text-sm text-[#6B7280]">
                      {formatDateRangeWithTillNow(job.start_date, job.end_date)}
                    </span>
                  </div>

                  <p className="font-medium text-[#374151] mt-1">
                    {job.company_name}
                  </p>

                  <p className="text-[#6B7280] mt-2">{job.job_description}</p>

                  {job.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1  rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeComponent;

{
  /* <Link href={"/jobSeeker/home"} className="w-full">
            <Button className="w-full py-3 px-6 rounded-lg border border-primary hover:border-secondary hover:bg-white hover:text-secondary hover:border transition  font-medium cursor-pointer" name="Find Your Favorite Job">
              Find Your Favorite Job
            </Button>
          </Link> */
}
