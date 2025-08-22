'use client'
import { Job } from '@/types/AllTypes';
import React, { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { PiBagSimpleFill } from 'react-icons/pi';
import { formatDistanceToNow, format } from 'date-fns'
import { LuDot } from 'react-icons/lu';
import { useApplyJobMutation, useGetAppliedJobsQuery, useGetSavedJobsQuery, useSaveJobPostMutation } from '@/redux/features/job/jobSlice';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import LoadingButton from '../loading/LoadingButton';
import { useGetMeQuery } from '@/redux/features/auth/auth';
import { BsBookmarkDashFill } from 'react-icons/bs';
import { IoCheckmarkCircle } from 'react-icons/io5';
import Lottie from 'react-lottie';
import animationData from "../../../public/Green Check.json"
import toast, { Toaster } from 'react-hot-toast';


type JobDetailsCardProps = {
    currentCompany: Job | undefined;
};

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({ currentCompany }) => {
    const company = currentCompany?.company;
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const router = useRouter();
    const [isSave, setIsSaved] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const [applied, setApplied] = useState(false)


    const [applyJob, { isLoading }] = useApplyJobMutation();
    const { data: user } = useGetMeQuery({});
    const [saveJobPost,] = useSaveJobPostMutation();
    const { data: savedJobs, refetch } = useGetSavedJobsQuery({});
    const { data: appliedJobs, refetch: jobFetch } = useGetAppliedJobsQuery({})

    const defaultOptions = {
        loop: 0,             // Loop the animation
        autoplay: true,         // Play automatically
        animationData: animationData, // Your animation data
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const handleApplyJob = async () => {
        setLoading(true);
        if (!user?.data) return router.push("/signIn");

        try {
            const jobId = currentCompany?.id;
            const response = await applyJob({ jobId });

            if (response && 'data' in response && response.data?.success) {
                toast.success("Successfully applied for the job!");
                setIsApplied(true); // Set the flag to show Lottie animation
                setLoading(false);
                jobFetch()
            } else {
                const errorMessage: any =
                    response?.error && 'data' in response.error
                        ? (response.error as { data?: { message?: string } }).data?.message
                        : 'Failed to apply for the job.';
                toast.error(errorMessage);
                setLoading(false);
            }
        } catch (error: any) {
            toast.error(error.data.message);
            setLoading(false);
        }
    };

    const handleSave = async (data: any) => {
        setLoading2(true);
        const jobId = data;

        const res = await saveJobPost({ jobId });

        if (res?.data) {
            setLoading2(false);
            toast.success('Job Saved.')
        }
        setLoading2(false);
    };

    useEffect(() => {
        const avaiable = savedJobs?.data?.find((p: any) => p.jobId === currentCompany?.id);
        if (avaiable) { setIsSaved(true); } else {
            setIsSaved(false);
        }
        const application = appliedJobs?.data.find((job: any) => job.jobId === currentCompany?.id);
        if (application) {
            setApplied(true)
        } else {
            setApplied(false)
        }
        refetch();
        jobFetch()
        console.log("Appicatons is here", currentCompany)
    }, [savedJobs?.data, currentCompany, isSave, appliedJobs?.data]);
    console.log(applied)

    return (
        <section className="max-w-[939px] mx-auto p-6 bg-white text-secondary shadow-md rounded-lg border border-gray-100 relative">
            <Toaster />
            {isApplied && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Lottie options={defaultOptions} height={200} width={200} />
                </div>
            )}
            <header className="flex justify-between items-center mb- 4">
                <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold  flex items-center gap-3">
                    {currentCompany?.company?.companyName || "Superjob Technology"}</h1>
                {
                    isSave ? <> <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-2 py-1 border-l-4 border-green-500 bg-green-50">
                            <span className="text-sm font-medium text-green-700">
                                Saved
                            </span>
                        </div>
                        <br />
                    </div></> : <button onClick={() => handleSave(currentCompany?.id)} className='flex items-center gap-1 cursor-pointer'>
                        <BsBookmarkDashFill className='text-gray-700 size-5 ' /> {loading2 ? "Saving..." : "Save"}</button>

                }

            </header>
            <div className='flex justify-between items-center'>
                <h2 className="text-xl md:text-3xl xl:text-[42px]  md:mt-8 dark:">{currentCompany?.title || "UI/UX Designer (Onsite)"} <span className='text-primary text-2xl'>({currentCompany?.jobType})</span></h2>

                {
                    applied ? <button
                        onClick={handleApplyJob}
                        className="text-xs md:text-base inline-flex items-center gap-2 px-2 py-1 border-l-4 border-green-500 bg-green-50">
                        Application Submited
                    </button> : <>{
                        loading ? <div className='bg-primary text-white  px-4 py-2 rounded'><LoadingButton /></div> : <> <button
                            onClick={handleApplyJob}
                            className="bg-primary text-white  px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer hidden lg:flex">
                            Apply Now
                        </button> </>
                    } </>
                }
            </div>

            <p className="text-sm  text-subtitle  flex flex-wrap gap-3 md:my-3">
                <span className='flex items-center gap-1'><FaLocationDot className='text-blue-600' /> <p>{currentCompany?.location}</p></span>
                | <span className='flex items-center gap-1'><PiBagSimpleFill className='text-purple-600' />{currentCompany?.experience}</span> |
                <span className='text-sm text-gray-500'>
                    {currentCompany?.createdAt && formatDistanceToNow(new Date(currentCompany.createdAt), { addSuffix: true })}
                </span>
                |
                <span>
                    {currentCompany?.noOfApplicants} applicants
                </span>

            </p>

            <p className="text-sm  dark: mt-2 flex  md:items-center md:mb-3 gap-2">
                <p className="  mt-0.5 md:mt-0 md:text-lg">Skills Needed: </p>
                <div className='flex gap-1 flex-wrap text-subtitle'>
                    {currentCompany?.skills?.map(skill => <div className='flex items-center'>{skill} <LuDot className='size-6' /></div>)}
                </div>
            </p>

            <p className="text-sm  dark: mt-1">
                {currentCompany?.deadline && (
                    <div className='flex items-center gap-2'>
                        <p className='md:text-lg'>Application Deadline:</p >
                        <p className='md:text-lg text-subtitle'>{format(new Date(currentCompany.deadline), 'MMM dd, yyyy')}</p>
                    </div>
                )}

            </p>

            <p className="text-xl py-3 md:py-8 border-b border-gray-200"><span className="text-2xl md:text-5xl font-bold text-primary">{currentCompany?.salaryRange}</span>/ Month</p>

            <section className="mt-6">
                <h3 className="text-lg md:text-[28px] font-semibold  dark: mb-2">Job Description</h3>
                <p className=" ">
                    {currentCompany?.features.find(p => p.featureTitle == "Description")?.paragraph}
                </p>
            </section>

            <section className="mt-6">
                <h3 className="text-lg md:text-[28px] font-semibold  dark: mb-2">Responsibilities</h3>
                <ul className="list-disc list-inside  dark: space-y-1">

                    {currentCompany?.features?.find(p => p.featureTitle == "Responsibilities")?.point?.map(p => <li>{p}</li>)}

                </ul>
            </section>

            <section className="mt-6">
                <h3 className="text-lg  font-semibold md:text-[28px] dark: mb-2">Requirements</h3>
                <ul className="list-disc list-inside  dark: space-y-1">
                    {currentCompany?.features?.find(p => p.featureTitle == "Requirements:")?.point?.map(p => <li>{p}</li>)}

                </ul>
            </section>

            <section className="mt-6">
                <h3 className="text-lg md:text-[28px] font-semibold  dark: mb-2">Why Join Us?</h3>
                <ul className="list-disc list-inside  dark: space-y-1">
                    {currentCompany?.features?.find(p => p.featureTitle == "Why Join Us?:")?.point?.map(p => <li>{p}</li>)}
                </ul>
            </section>

            <footer className="mt-6 flex gap-3">
                <div className={`${applied ? "hidden" : ""}`}>

                    {
                        loading ? <div className='bg-primary text-white  px-4 py-2 rounded'><LoadingButton /></div> : <> <button
                            onClick={handleApplyJob}
                            className="bg-primary text-white  px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer">
                            Apply Now
                        </button></>
                    }
                </div>

                <Link href={'/jobSeeker/search-jobs'}>
                    <button className="border border-gray-300   dark: px-4 py-2 rounded hover:bg-gray-300 text-subtitle  transition cursor-pointer">
                        Back to Listing
                    </button>
                </Link>
            </footer>
        </section>
    );
};

export default JobDetailsCard;