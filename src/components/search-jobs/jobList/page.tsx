'use client'
import React, { useEffect, useState } from 'react'
import JobCard from '../jobCard/JobCard';
import { useGetAllJobPostsQuery } from '@/redux/features/job/jobSlice';
import { Job } from '@/types/AllTypes';
import { Loader } from '@/components/shared/MainLoader';
import { usePathname } from 'next/navigation';


export default function JobList({ filtersData }: any) {

    console.log(filtersData)

    const [jobs, setJobs] = useState([]);
    const pathname = usePathname()

    const { data: info, isLoading, error } = useGetAllJobPostsQuery({});

    const allJob = info?.data;
    console.log(allJob?.data)
    const current = pathname.includes("/jobSeeker/saved-jobs")

    useEffect(() => {
        if (filtersData?.length > 0) {
            setJobs(filtersData);
        } else {
            setJobs(allJob?.data)
        }
    }, [allJob?.data, filtersData])

    if (isLoading) return  <div className="md:min-w-[666px] max-h-[250px] flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg shadow-sm text-center border border-gray-200">
                        
                        <div className='fixed insert-0 '>
                            <Loader/>
                        </div>
                        
                    </div>

    return (

        <div>
            <div className={`w-full`}>
                {filtersData && jobs?.length > 0 ? <>{jobs?.map((job: Job, index) => (
                    <JobCard key={index} job={job} />
                ))}</> : <>
                    <div className="md:min-w-[666px] flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg shadow-sm text-center">
                        <svg
                            className="w-16 h-16 text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No Jobs Found</h3>
                        <p className="text-gray-600 max-w-md">
                            We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
                        </p>
                        
                    </div>
                </>}
            </div>
        </div>

    );
};

