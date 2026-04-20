"use client";
import AllFilterSection from "@/components/job-details/AllfilterSection";
import JobDetailsCard from "@/components/job-details/JobDetailsCard";
import JobSeekerNavbar from "@/components/seeker-home/SeekerNavbar";
import Container from "@/components/ui/Container";
import React, { useEffect, useState } from "react";
import RecentJobCard from "@/components/recent-job/RecentJobCard";
import { ChevronLeft, List, Search, X } from "lucide-react";
import { Company, Job } from "@/types/AllTypes";
import { useGetAllCompaniesQuery } from "@/redux/features/company/companySlice";
import { useGetAllJobPostsQuery } from "@/redux/features/job/jobSlice";
import { useParams } from "next/navigation";
import SearchField from "@/components/shared/searchField/SearchField";

export default function JobDetailspage() {
  const [currentCompany, setCurrentCompany] = useState<Job | undefined>();
  const [showCompanies, setShowCompanies] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const { data: res, isLoading, refetch } = useGetAllCompaniesQuery();
  const [newJobs, setJobs] = useState<any>([]);

  const { id } = useParams();

  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const { data: jobs, isLoading: isAllJobsLoading } = useGetAllJobPostsQuery({
    page: 1,
    limit: 1000,
  });

  useEffect(() => {
    if (jobs?.data) {
      setAllJobs(jobs?.data.data);
      setCurrentCompany(jobs?.data.data[0]);
    }
    if (id != "jobs") {
      const nowJob = jobs?.data.data.find((p: any) => p.id == id);
      setCurrentCompany(nowJob);
    }
    refetch();
  }, [jobs?.data]);

  useEffect(() => {
    if (res?.data) {
      setCompanies(res.data);
    }
  }, [res?.data]);

  useEffect(() => {
    fetch("https://www.arbeitnow.com/api/job-board-api")
      .then((res) => res.json())
      .then((data) => {
        const formattedJobs = data.data.map((job: any) => ({
          id: job.slug,
          title: job.title,
          location: job.location,

          company: {
            companyName: job.company_name // fallback (API doesn’t provide logo)
          },

          salaryRange: "Negotiable", // API doesn't provide salary
          type: job.job_types?.[0] || "N/A",
          remote: job.remote,
          postedAt: new Date(job.created_at * 1000),
        }));

        setJobs(formattedJobs);
        console.log("Formatted Jobs:", formattedJobs);
      });
  }, []);

  const mergedJobs=[...newJobs, ...allJobs]

  if (isLoading || isAllJobsLoading) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center h-full">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-primary"></div>
        </div>
      </div>
    );
  }

  const handleCompanySelect = (company: Job) => {
    setCurrentCompany(company);
    setShowCompanies(false);

    // Reorder the jobs to move the selected company to the top
    const updatedJobs = [...allJobs];
    const selectedJobIndex = updatedJobs.findIndex(
      (job) => job.id === company.id,
    );

    if (selectedJobIndex > -1) {
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const toggleView = () => {
    setShowCompanies(!showCompanies);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <Container>
        <SearchField />
        {/* <div className='border-b-2 border-primary bg-gradient-b from-primary to-white my-5'>
                
                </div> */}

        <div className=" px-4 mt-5 md:mt-9">
          {/* Mobile Header */}
          <div className="md:hidden sticky top-0 bg-white border-b border-gray-200 p-4 z-10 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {!showCompanies && currentCompany && (
                  <button
                    onClick={() => setShowCompanies(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <h1 className="text-lg font-semibold">
                  {showCompanies
                    ? "Companies"
                    : currentCompany?.title || "Job Details"}
                </h1>
              </div>

              {showCompanies && (
                <button
                  onClick={toggleView}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 text-sm"
                  disabled={!currentCompany}
                >
                  <List size={16} />
                  <span className="hidden xs:inline">Details</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Companies List Section */}
            <div
              className={`space-y-2 md:space-y-6 w-full md:w-[300px] xl:w-[457px] max-h-[1300px] overflow-auto ${showCompanies ? "block" : "hidden md:block"}`}
              style={{
                scrollbarWidth: "none", // For Firefox
              }}
            >
              <style jsx>{`
                &::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {mergedJobs?.length > 0 ? (
                mergedJobs?.map((company:any) => (
                  <div
                    key={company?.companyId}
                    className={`cursor-pointer transition-all duration-200
                  ${currentCompany?.id === company?.id ? "border border-primary rounded-lg shadow-sm shadow-primary/20" : "hover:shadow-md"}`}
                    onClick={() => handleCompanySelect(company)}
                  >
                    <RecentJobCard job={company}   />
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No companies found matching "{searchTerm}"
                  </p>
                </div>
              )}
              {/* {allJobs?.length > 0 ? (
                allJobs?.map((company) => (
                  <div
                    key={company?.companyId}
                    className={`cursor-pointer transition-all duration-200
                  ${currentCompany?.id === company?.id ? "border border-primary rounded-lg shadow-sm shadow-primary/20" : "hover:shadow-md"}`}
                    onClick={() => handleCompanySelect(company)}
                  >
                    <RecentJobCard job={company}  />
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No companies found matching "{searchTerm}"
                  </p>
                </div>
              )} */}
            </div>

            {/* Job Details Section */}
            <div
              className={`flex-1 ${!showCompanies ? "block" : "hidden md:block"}`}
            >
              <JobDetailsCard currentCompany={currentCompany} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
