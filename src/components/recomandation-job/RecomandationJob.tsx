"use client";
import { useEffect, useState } from "react";
// import RecentJobCard from './RecentJobCard'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { FreeMode, Navigation } from "swiper/modules";
// import RecentJobCard from "./RecentJobCard";
import {
  useGetMeQuery,
  useGetMyProfileQuery,
} from "@/redux/features/auth/auth";
import { useRecomandationJobsQuery } from "@/redux/features/job/jobSlice";
import RecomandationJobCard from "./RecomandationJobCard";

interface JobTitle {
  title: string;
}

export default function RecomandationJob({ title }: JobTitle) {
  const { data: currentUser } = useGetMeQuery({});

  const { data: myProfile } = useGetMyProfileQuery(currentUser?.data?.id);
  const profileId = myProfile?.data?.profileId;
  console.log(profileId);
  const [recomandationJobs, setRecomandationJobs] = useState<any>(null);
  useEffect(() => {
    if (!myProfile?.data?.profileId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://31.97.216.98:8000/api/v1/recommendations/user/${myProfile.data.profileId}/generate?limit=20&include_reasoning=true`,
          {
            method: "POST", // 👈 Important: GET instead of POST
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await res.json();
        setRecomandationJobs(data);
        setJobLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobLoading(false);
      }
    };

    fetchData();
  }, [myProfile?.data?.profileId]);
  //   fetch data form here
  //http://31.97.216.98:8000/api/v1/recommendations/user/user_71697f1aefc0/generate?limit=20&include_reasoning=true

  //   const { data: recomandationJobs } = useRecomandationJobsQuery(profileId, {
  //     skip: !profileId,
  //   });
  //   console.log(recomandationJobs);
  const [jobLoading, setJobLoading] = useState(true);
  // console.log("Current User: ", currentUser?.data?.id);
  // console.log("My Profile: ", myProfile?.data);
  // console.log("Profile ID: ", myProfile?.data?.profileId)

  // console.log("Recomandation Jobs: ", recomandationJobs)

  // useEffect(() => {

  //     if (recomandationJobs?.data) {
  //         setRecomandationAllJobs(recomandationJobs?.data?.data);
  //     }

  //     const fetchedRecomendationJobs = async () => {
  //         // Get the access token from cookies
  //         const token = Cookies.get("accessToken");

  //         try {
  //             const response = await axios.get(
  //                 `http://172.252.13.71:5005/api/v1/jobs/recommended-jobs/${myProfile?.data?.profileId}`,
  //                 {
  //                     headers: {
  //                         Authorization: token ? `Bearer ${token}` : "", // Add Authorization header if token exists
  //                     },
  //                 }
  //             );
  //             console.log("Response: ", response.data.recommendations);
  //         } catch (error) {
  //             console.error("Error fetching recommended jobs:", error);
  //         }
  //     };

  //     fetchedRecomendationJobs()

  //     // if (jobs?.data) {
  //     //   setRecomandationAllJobs(jobs.data.data)
  //     // }
  //     // }, [jobs?.data])
  // }, [jobs?.data, recomandationJobs?.data, myProfile?.data?.profileId])

  console.log(recomandationJobs);
  console.log("ddd");
  console.log(myProfile?.data?.profileId);

  useEffect(() => {
    if (currentUser?.data?.role != "JOB_SEEKER") return;
    if (recomandationJobs?.data?.recommendations) {
      setJobLoading(false);
    }
  }, [recomandationJobs?.data?.recommendations, currentUser?.data]);

  return (
    <div className="bg-card ">
      <div className="bg-[#F8F8F8] ml-0  2xl:ml-44">
        <div className=" py-15  px-11 md:px-15">
          {title ? (
            <>
              {" "}
              <h1 className="text-2xl md:text-5xl font-semibold ">
                {title || "Recent Job"}{" "}
              </h1>
              <p className="mb-4 mt-1 md:mt-3  text-secondary text-xs md:text-xl">
                Jobs found for you based on your profile and application
              </p>
            </>
          ) : (
            <>
              {" "}
              <h1 className="text-2xl md:text-5xl font-semibold mb-4">
                {"Recent Job"}
              </h1>
            </>
          )}

          {jobLoading ? (
            <div className="flex gap-5  overflow-auto">
              {["f", "f", "f"].map(() => (
                <div className="">
                  <div className="flex items-center gap-2">
                    <Skeleton circle height={50} width={50} />
                    <h2>
                      <Skeleton width={200} />
                    </h2>
                  </div>
                  <h2>
                    <Skeleton width={440} />
                  </h2>
                  <p>
                    <Skeleton height={100} width={440} />
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Custom arrows */}
              <div className="swiper-button-prev-custom custom-arrow left-[-50px]" />
              <div className="swiper-button-next-custom custom-arrow md:right-[-50px] right-[-40px]" />

              <Swiper
                spaceBetween={30}
                freeMode={true}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                modules={[FreeMode, Navigation]}
                className="mySwiper"
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 2.5 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 3.5 },
                }}
              >
                {/* {recomandationJobs &&
                  recomandationJobs?.data?.recommendations?.map(
                    (job: any, index: any) => (
                      <SwiperSlide key={index} className="pb-2">
                        <RecomandationJobCard job={job} />
                      </SwiperSlide>
                    )
                  )} */}
                {recomandationJobs &&
                  recomandationJobs?.recommendations?.map(
                    (job: any, index: any) => (
                      <SwiperSlide key={index} className="pb-2">
                        <RecomandationJobCard job={job} />
                      </SwiperSlide>
                    )
                  )}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
