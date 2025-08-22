'use client'
import JobCard from '@/components/search-jobs/jobCard/JobCard'
import JobList from '@/components/search-jobs/jobList/page'
import { useGetAllJobPostsQuery, useGetSavedJobsQuery } from '@/redux/features/job/jobSlice'
import React from 'react'

export default function SavedJobs() {
  const { data: jobs } = useGetAllJobPostsQuery({})
  const { data: savedJobs } = useGetSavedJobsQuery({})
  console.log("saved jobs here", savedJobs?.data)
  console.log("All nob heree", jobs?.data.data)



  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
      {
        savedJobs?.data && savedJobs?.data?.length > 0 ? <>
          {savedJobs?.data?.map((p: any) => <JobCard job={p.job} />)}
        </> : <div className="col-span-full flex flex-col items-center justify-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No saved jobs</h3>
          <p className="text-gray-500 text-center max-w-md">
            You haven't saved any jobs yet. When you find a job you like, click the bookmark icon to save it here.
          </p>
        </div>
      }

    </div>
  )
}
