"use client";

import Link from "next/link";
import SectionHeader from "../shared/SectionHeader";
import ResumeComponent from "./ui/ResumeComponent";
import Button from "../shared/button/Button";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Cookies from "js-cookie";
import Lottie from "react-lottie";
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
  const [isLoading2, setIsLoading2] = useState(false);

  const downloadResume = async () => {
    if (!printRef.current || isLoading2) return;

    try {
      setIsLoading2(true);

      const canvas = await html2canvas(printRef.current, {
        scale: 1,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProperties = pdf.getImageProperties(data);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const scaleFactor = Math.min(
        pdfWidth / imgProperties.width,
        pdfHeight / imgProperties.height,
      );

      const scaledWidth = imgProperties.width * scaleFactor;
      const scaledHeight = imgProperties.height * scaleFactor;

      pdf.addImage(data, "PNG", 0, 0, scaledWidth, scaledHeight);

      pdf.save("my_resume.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsLoading2(false);
    }
  };

  const { data: userResume } = useGetMyProfileQuery({});

  // const token=localStorage.getItem("userId")
  const storedUserId = userResume?.data.profileId;

  const defaultOptions = {
    loop: true, // Whether the animation should loop
    autoplay: true, // Whether the animation should start automatically
    animationData: require("@/assets/banner/loading.json"), // Path to your animation file
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Aspect ratio configuration
    },
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchUserProfile = async () => {
      if (!userId && !storedUserId) return;
      const idToUse = userId || storedUserId;
      try {
        const response = await fetch(
          `https://career-path-server-tau.vercel.app/api/v1/profiles/${"6887707047413d052c17a8c5"}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`, // Use Cookies.get if using cookies
            }, // if using HttpOnly cookie
          },
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
            disabled={isLoading2}
            className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition
    ${
      isLoading2
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#DBDBDB] hover:bg-gray-200 cursor-pointer"
    }`}
          >
            {isLoading2 && (
              <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
            )}

            {isLoading2 ? "Downloading PDF..." : "Download Resume"}
          </button>

          <Link href={"/jobSeeker/home"} className="w-full">
            <Button
              className="w-full py-3 px-6 rounded-lg "
              name="Find Your Favorite Job"
            >
              Find Your Favorite Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
