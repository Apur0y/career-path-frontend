import { Job } from "@/types/AllTypes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface RecentJobCardProps {
  job: Job;
}

export default function RecomandationJobCard({ job }: any) {
  const pathname = usePathname();

  return (
    <div className="w-full md:max-w-[457px]  border border-gray-100 rounded-lg shadow-md p-4 bg-white ">
      <div className="flex gap-2 items-center">
        <Image
          src={"/company1.png"}
          alt="company"
          height={48}
          width={48}
          className=" rounded-3xl"
        />
        <h1 className="text-md xl:text-xl font-semibold">{job?.company}</h1>
      </div>
      <h2 className="text-sm  mt-3 xl:text-lg  font-semibold">{job?.title}</h2>
      <p className="text-gray-500 text-xs xl:text-base">{job?.location}</p>

      <hr className="xl:my-3 my-2 border-t border-gray-200" />

      <div className="flex items-center justify-between">
        <h1 className="text-xs xl:text-base">
          {job?.salary_info?.salary_max ? (
            <span className="text-md 2xl:text-xl font-semibold text-nowrap">
              {job?.salary_info?.salary_max} / Month
            </span>
          ) : (
            "Negotiable"
          )}
        </h1>

        {/* // <span className='text-md 2xl:text-xl font-semibold text-nowrap'>{job?.salaryRange}</span>/Month */}
        {pathname.includes("/jobSeeker/job-details") ? (
          <>
            <p className="text-primary underline">View Details</p>
          </>
        ) : (
          <>
            <Link target="_blank" href={`${job?.job_url}`}>
              <button className="2xl:px-6 px-2 py-2 2xl:py-3 bg-primary rounded xl:text-base 2xl:scale-75 2xl:pr-3 3xl:pr-0 3xl:scale-100 text-xs text-white cursor-pointer hover:bg-green-600 text-nowrap">
                Apply Now
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
