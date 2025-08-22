'use client'
import Container from "@/components/ui/Container";
import { useGetMeQuery, useGetMyProfileQuery } from "@/redux/features/auth/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

export default function ResumeCreate() {


  const { data: user } = useGetMeQuery({})
  const { data: myProfile } = useGetMyProfileQuery({})
  const router = useRouter()


  const handleUser = async () => {

    if (!user) {
      router.push("/signIn")
      toast.error("Please Login First!")
    } else if (user?.data.role != "JOB_SEEKER") {
      toast.error(" Only Job Seeker can create resume!")

    } else if (myProfile?.data.profileId) {
      router.push("/jobSeeker/resume-download")
    }
    else {
      router.push("/jobSeeker/create-resume")
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Container>
        <div className="  flex justify-center items-center flex-col md:flex-row md:space-x-4 md:mx-3">
          <div className="flex items-center   ">
            <Image
              src="/airesume.jpg"
              alt="Sample Resume"
              width={578}
              height={499}
              className="rounded-2xl "
            />
          </div>

          <div className="text-left flex flex-col  justify-between mt-6 md:mt-0">
            <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold text-[#28C76F] mb-4 leading-[1.24]">
              <span className="text-gray-900">Create Your</span> AI- <br />
              Powered Resume
            </h1>

            <h3 className="lg:text-xl text-gray-700 mb-[42px] leading-[1.6]">
              Let our AI technology help you build a professional resume tailored{" "}
              <br />
              to your skills, experience, and career goals.
            </h3>

            <p className="text-gray-400 text-sm mb-4 md:mb-12 leading-[1.6]">
              Follow these simple steps to create a standout resume that will get
              you <br /> noticed by top employers.
            </p>

            <button onClick={() => handleUser()} className="px-18 py-4 bg-primary text-[#FCFCFC] font-semibold rounded-lg hover:bg-green-600 transition cursor-pointer">
              Start Now
            </button>

          </div>
        </div>
      </Container>
    </div>

  );
}
