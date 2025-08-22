import React from "react";
import { CgMail } from "react-icons/cg";
import { FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import { PiPhone } from "react-icons/pi";
import { TbMapPinCode } from "react-icons/tb";
import { RefObject } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
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

    const { data: myUser, refetch } = useGetMeQuery({})

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
              {profileData.profile?.firstName} {profileData.profile?.lastName}
            </h1>
            <p className="text-xl text-[#323B4C] mb-2">
              {profileData?.profile?.JobTitle}
            </p>
            <div className="flex flex-wrap gap-8 justify-start items-center text-[#323B4C]">
              <div className="flex items-center space-x-2">
                <PiPhone className="w-4 h-4" />
                <p>{profileData?.profile.phoneNumber}</p>
              </div>
              <div className="flex items-center space-x-2">
                <CgMail className="w-4 h-4" />
                <p>{profileData?.profile.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-[#323B4C] mt-2">
              <IoLocationOutline  className="w-4 h-4" />
              <p>
                {profileData.profile?.address}, {profileData.profile?.city},
                {profileData.profile?.state},{" "}
                {profileData.profile?.countryRegion}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 flex gap-20 flex-1">
        {/* Left Column */}
        <div className="border-r-[1px] border-[#a2d2f0] pr-16">
          {/* Portfolio */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-blue pb-2">
              PORTFOLIO
            </h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <a
                  href={`${profileData?.profile?.socialMedia?.personal_website_url}`}
                  className="text-[#2563EB] hover:underline text-sm flex gap-2 items-center"
                >
                  <FaExternalLinkAlt className="w-4 h-4 text-[#ff46b8] pt-0 size-6" />
                  <p>Portfolio</p>
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={`${profileData.profile?.socialMedia?.linkedin_profile_url}`}
                  className="text-[#2563EB] hover:underline text-sm flex gap-2 items-center"
                >
                  <FaLinkedin className="w-4 h-4 text-[#3B82F6] pt-0 size-6" />
                  <p>LinkedIn</p>
                </a>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">
              SKILLS
            </h2>
            <ul className="flex justify-center items-start flex-col">
              {profileData?.profile?.skills.map((skill: string) => (
                <li key={skill} className="flex items-center  space-x-2">
                  {/* <div className="w-1 h-1 bg-[#90CDF4] rounded-full"></div> */}
                  <span className="text-[#374151]">{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          {profileData?.profile?.languages && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">
                LANGUAGES
              </h2>
              <ul>
                {profileData?.profile?.languages.map(
                  (lang: string, index: number | string) => (
                    <li key={index} className="flex items-center space-x-2">
                      {/* <div className="w-1 h-1 bg-[#90CDF4] rounded-full"></div> */}
                      <span className="text-[#374151]">{lang}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Co-curricular Activities */}
          {/* <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">CO-CURRICULAR ACTIVITIES</h2>
            <ul>
              {["BEE Member", "Travelling", "Cricket"].map((activity) => (
                <li key={activity} className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-[#90CDF4] rounded-full"></div>
                  <span className='text-[#374151]'>{activity}</span>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* Right Column */}
        <div className="w-2/3">
          {/* About Me */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">
              ABOUT ME
            </h2>
            <p className="text-[#374151]">
              {profileData.resume?.data?.sections[1]?.content[0]}
            </p>
          </div>

          {/* Education */}
          {profileData?.profile?.education && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">
                EDUCATION QUALIFICATION
              </h2>
              <div>
                {profileData?.profile?.education?.map((edu: any, idx: any) => (
                  <div key={idx} className="mb-3">
                    <h3 className="font-semibold text-[#1F2937]">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-[#374151]">
                      {edu.institution_name}
                    </p>
                    <p className="text-sm text-[#374151]">{edu.major}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Training */}
          {profileData?.profile?.certifications.length>0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">
                TRAINING / CERTIFICATION
              </h2>
              <div className="">
                {profileData?.profile?.certifications?.map(
                  (certificate: any, idx: any) => (
                    <div key={idx} className="mb-3">
                      <h3 className="font-semibold text-[#1F2937]">
                        {certificate?.certification_name}
                      </h3>
                      <p className="text-sm text-[#374151]">
                        {certificate?.issuing_organization}
                      </p>
                      <p className="text-sm text-[#374151]">
                        {certificate?.issue_date}
                      </p>
                      <p className="text-sm text-[#374151]">
                        {certificate?.expiry_date}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {profileData?.profile?.jobExperience && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">
                WORK EXPERIENCE
              </h2>
              <div>
                {profileData?.profile?.jobExperience?.map(
                  (job: any, idx: any) => (
                    <div key={idx} className="space-y-6 mb-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm text-[#1F2937]">
                          {job?.job_title}
                        </h3>
                        <span className="text-sm text-[#6B7280]">
                          {formatDateRangeWithTillNow(
                            job?.start_date,
                            job?.end_date
                          )}
                        </span>
                      </div>
                      <p className="font-semibold text-[#1F2937] mb-2">
                        {job?.company_name}
                      </p>
                      <p className="text-[#6B7280]">{job?.job_description}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeComponent;


{/* <Link href={"/jobSeeker/home"} className="w-full">
            <Button className="w-full py-3 px-6 rounded-lg border border-primary hover:border-secondary hover:bg-white hover:text-secondary hover:border transition  font-medium cursor-pointer" name="Find Your Favorite Job">
              Find Your Favorite Job
            </Button>
          </Link> */}