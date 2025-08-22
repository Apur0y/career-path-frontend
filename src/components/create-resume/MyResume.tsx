"use client";

import Link from "next/link";
import SectionHeader from "../shared/SectionHeader";
import ResumeComponent from "./ui/ResumeComponent";
import Button from "../shared/button/Button";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Cookies from "js-cookie";
import Lottie from 'react-lottie'; 
import { useGetMyProfileQuery } from "@/redux/features/auth/auth";

// Adjust path if different

export default function MyResume({ userId }: { userId: string | null }) {
  const printRef = useRef<HTMLDivElement>(null);

  // Main Code
  // const downloadResume = async () => {
  //   const element = printRef.current;
  //   if (!element) {
  //     return;
  //   }

  //   console.log(element);

  //   const canvas = await html2canvas(element, {
  //     scale: 2,
  //   });
  //   const data = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "px",
  //     format: "a4",
  //   });

  //   const imgProperties = pdf.getImageProperties(data);

  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  //   // const pdfWidth = 595.28;  // A4 width in points
  //   // const pdfHeight = 841.89; // A4 height in points

  //   pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("my_resume.pdf");
  // };

  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const downloadResume = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    console.log(element);
    // Capture the content as a canvas

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    // Get the image properties (width and height)
    const imgProperties = pdf.getImageProperties(data);

    // A4 size in points
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate the scaling factor to fit the content to the A4 page
    const scaleFactor = Math.min(
      pdfWidth / imgProperties.width,
      pdfHeight / imgProperties.height
    );
    const scaledWidth = imgProperties.width * scaleFactor;
    const scaledHeight = imgProperties.height * scaleFactor;

    // Add the image to the PDF
    pdf.addImage(data, "PNG", 0, 0, scaledWidth, scaledHeight);

    // Save the PDF
    pdf.save("my_resume.pdf");
  };

  const {data:userResume}=useGetMyProfileQuery({});
  console.log(userResume?.data)
  
  // const token=localStorage.getItem("userId")
  const storedUserId =  userResume?.data.profileId;

     const defaultOptions = {
    loop: true, // Whether the animation should loop
    autoplay: true, // Whether the animation should start automatically
    animationData: require('@/assets/banner/loading.json'), // Path to your animation file
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Aspect ratio configuration
    },
  };



  useEffect(() => {
    setIsLoading(true);
    const fetchUserProfile = async () => {
      if (!userId && !storedUserId) return;
      const idToUse = userId || storedUserId;
      try {
        const response = await fetch(
          `http://172.252.13.71:5005/api/v1/profiles/resume/${idToUse}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`, // Use Cookies.get if using cookies
            }, // if using HttpOnly cookie
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        console.log("Fetched User Profile Data:", data);
        if (!data.success) {
          throw new Error(data.message || "Failed to fetch user profile");
        }
        console.log("User Profile Data:", data);
        setProfileData(data.data || {});
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [storedUserId]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-medium text-gray-600">
          <Lottie options={defaultOptions} height={400} width={400} />
          <p className="text-center">Preparing your resume...</p>
        </p>
      </div>
    );
  }
  return (
    <div className="flex justify-center mt-12 h-full">
      <div className="p-6 w-full max-w-[1180px]">
        <SectionHeader
          title="Review Your AI-Generated Resume"
          description="Take a moment to review your resume. You can make changes and regenerate if needed. When you’re ready, download it and start applying!"
        ></SectionHeader>
        <div className="overflow-x-scroll md:overflow-hidden">
          {/* <ResumeComponent downloadResume={downloadResume} printRef={printRef} /> */}
          {profileData && (
            <ResumeComponent
              downloadResume={downloadResume}
              printRef={printRef}
              profileData={profileData}
            />
          )}
        </div>
        <div className="flex gap-12 py-16 ">
          <button
            onClick={downloadResume}
            className="w-full bg-[#DBDBDB] text-black  py-3 px-6 rounded-lg hover:bg-gray-200 transition  font-medium cursor-pointer"
            name="Download Resume"
          >
            Download Resume
          </button>

          <Link href={"/jobSeeker/home"} className="w-full">
            <Button className="w-full py-3 px-6 rounded-lg " name="Find Your Favorite Job">
              Find Your Favorite Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
