import { Job } from "@/types/AllTypes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface RecentJobCardProps {
  job: Job;
}

export default function RecentJobCard({ job }: RecentJobCardProps) {
  const pathname = usePathname();

  // Optional: Format salary (e.g., add K, M suffixes)
  const formatSalary = (salary: string) => {
    return salary.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    // <Link href={`/jobSeeker/job-details/${job?.id}`}>
    
    <div className="w-full max-w-[457px] border border-gray-100 rounded-lg shadow-sm p-4 bg-white transition-shadow duration-300 hover:shadow-md">
      {/* Company Info */}
      <div className="flex items-center gap-3">
        <Image
          src={job?.company?.logo || "/company1.png"}
          alt={job?.company?.companyName || "Company"}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <h3 className="text-sm md:text-base lg:text-xl font-semibold text-gray-900">
            {job?.company?.companyName}
          </h3>
        </div>
      </div>

      {/* Job Title */}
      <h2 className="mt-3 text-sm xl:text-lg font-semibold text-gray-800 line-clamp-1">
        {job?.title}
      </h2>

      {/* Location */}
      <p className="text-xs xl:text-sm text-gray-500 mt-1">{job?.location}</p>

      {/* Divider */}
      <hr className="my-3 border-t border-gray-200" />

      {/* Salary & Action */}
      <div className="flex lg:flex-row flex-col lg:items-center gap-3 justify-between">
        <div className="text-xs xl:text-sm text-gray-700">
          <span className="font-bold text-2xl">
            {formatSalary(job?.salaryRange)}
          </span>
          <span className="text-gray-500"> /month</span>
        </div>

        {/* Conditional Action Button or Text */}
        {pathname.includes("/jobSeeker/job-details") ? (
          <p className="text-primary text-xs font-medium underline hover:text-green-700 cursor-pointer transition-colors">
            View Details
          </p>
        ) : (
          <Link href={`/jobSeeker/job-details/${job?.id}`} passHref>
            <button className="px-3 py-1.5 xl:px-6 xl:py-3 bg-primary text-white text-xs xl:text-sm font-medium hover:cursor-pointer rounded hover:bg-white hover:text-black hover:border-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 whitespace-nowrap">
              Apply Now
            </button>
          </Link>
        )}
      </div>
    </div>
    // </Link>
  );
}
