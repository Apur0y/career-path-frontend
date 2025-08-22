"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Navigation } from "swiper/modules";
import RecentJobCard from "./RecentJobCard";
import { useGetAllJobPostsQuery } from "@/redux/features/job/jobSlice";
import {
  useGetMeQuery,
  useGetMyProfileQuery,
} from "@/redux/features/auth/auth";
import axios from "axios";
import { Loader } from "../shared/MainLoader";
import { Job } from "@/types/AllTypes";
import Skeleton from "react-loading-skeleton";
import { usePathname } from "next/navigation";

interface JobTitle {
  title: string;
}

export default function RecentJob({ title }: JobTitle) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch current user and profile
  const { data: currentUser } = useGetMeQuery({});
  const { data: myProfile } = useGetMyProfileQuery(currentUser?.data?.id, {
    skip: !currentUser?.data?.id,
  });

  // Fetch all jobs (fallback if recommendations fail or not available)
  const { data: allJobs, isLoading: allJobsLoading } = useGetAllJobPostsQuery(
    {},
    { skip: false }
  );
  const pathname=usePathname()
  console.log(pathname)

  // Fetch recommended jobs via direct API call (since RTK Query not used for this endpoint)
  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      setLoading(true);
      const token = Cookies.get("accessToken");
      const profileId = myProfile?.data?.profileId;

      if (!profileId || !token  ) {
        // Fallback to all jobs if no profile or token
        if (allJobs?.data?.data) {
          setJobs(allJobs.data.data);

        }
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://172.252.13.71:5005/api/v1/jobs/recommended-jobs/${profileId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const recommendedJobs = response.data?.data || [];
        if (Array.isArray(recommendedJobs) && recommendedJobs.length > 0) {
          setJobs(recommendedJobs);
        } else {
          // Fallback to all jobs if no recommendations
          setJobs(allJobs?.data?.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch recommended jobs:", error);
        // Fallback to all jobs on error
        setJobs(allJobs?.data?.data || []);
      } finally {
        setLoading(false);
      }
    };

    if (allJobs?.data?.data) {
      // Wait for allJobs to be loaded before deciding
      fetchRecommendedJobs();
    }
  }, [myProfile?.data?.profileId, allJobs?.data?.data]);

  return (
    <div className="bg-card">
      <div className=" ml-0 2xl:ml-44 ">
        <div className="section-gap px-2 relative py-15  px-11 xl:px-15">
          <h1 className="text-2xl md:text-5xl font-semibold mb-6">
            {title || "Recent Jobs"}
          </h1>

          <div className="swiper-button-prev-custom custom-arrow left-[10px] scale-80 md:scale-100 my-9 p-2" />
             <div className="swiper-button-next-custom custom-arrow right-[10px] my-9 scale-80 md:scale-100 md:p-2" />

          {pathname !=='/'? loading:false || allJobsLoading ? <div className='flex gap-5'>{
            ["f", "f", "f"].map(() => <div>
              <div className='flex items-center gap-2 '><Skeleton circle height={50} width={50} /><h2><Skeleton width={200} /></h2></div>
              <h2><Skeleton width={440} /></h2>
              <p><Skeleton height={100} width={440} /></p>
            </div>)
          }</div> : (
            <div className="relative overflow-hidden ">
              {/* Custom Navigation Arrows */}
            

              <div className="">
                  
                <Swiper
                  spaceBetween={5}
                  freeMode
                  navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
                  modules={[FreeMode, Navigation]}
                  className="mySwiper "
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2.5 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 3.5 },
                  }}
                >
                  {jobs.map((job, index) => (
                    <SwiperSlide key={job.id || index} className="pb-2 px-2">
                      <RecentJobCard job={job} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
