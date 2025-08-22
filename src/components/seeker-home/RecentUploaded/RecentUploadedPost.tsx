
"use client"
import RecentJobCard from '@/components/recent-job/RecentJobCard'
import { useGetAllJobPostsQuery } from '@/redux/features/job/jobSlice';
import { Job } from '@/types/AllTypes';
import React, { useEffect, useState } from 'react'

export default function RecentUploadedPost() {
    const [allJobs, setAllJobs] = useState<Job[]>([])
    const { data: jobs } = useGetAllJobPostsQuery({});


    useEffect(() => {
        if (jobs?.data) {
            setAllJobs(jobs.data.data)
        }
    }, [jobs?.data])


    console.log(allJobs);
    return (


        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6  '>
            {allJobs?.slice(0, 15).map((job, index) => (

                <RecentJobCard key={index} job={job} />

            ))}



        </div>

    )
}
