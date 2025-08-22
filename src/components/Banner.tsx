import Image from "next/image";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import SearchField from "./shared/searchField/SearchField";

export default function Banner() {
  return (
    <div className="relative overflow-hidden w-full ">
      {/* Background pattern - responsive positioning */}
      <div className="absolute right-0 top-0 w-full h-full flex justify-end">
        <Image
          src="/Pattern.png"
          alt="Pattern"
          height={1146}
          width={1156}
          className="object-cover object-right h-full"
        />
      </div>

      {/* Main container with proper responsive padding */}
      <div className="relative z-10 h-full container py-9 md:py-0">
        <div className="flex items-center justify-center sm:justify-between h-full ">
          {/* Left side - responsive content */}
          <div className="flex flex-col gap-8 sm:gap-5 lg:gap-12 justify-center text-left z-30  flex-shrink-0 lg:w-1/2">
            {/* Heading section */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px] text-left font-semibold md:font-bold leading-tight">
                Your{" "}
                <span className="text-primary">
                  AI-Powered <br /> Career
                </span>{" "}
                Platform
              </h1>
              <p className="text-sm md:text-base lg:text-lg font-normal text-subtitle max-w-[400px] lg:max-w-[620px]">
                Discover your next opportunity with personalized AI job
                matching. Apply with a single click and explore new career paths
                today.
              </p>
            </div>

            {/* Search Field */}
            <div className="w-full ">
              <SearchField />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-[400px] lg:max-w-[450px]">
              <Link href={"/create-account"}>
                <button className="w-full sm:w-auto md:min-w-[140px] hover:bg-primary hover:border-transparent font-semibold hover:text-white border text-xs sm:text-sm md:text-base px-4 sm:px-6 rounded py-3 border-gray-400 transition-all duration-300 cursor-pointer">
                  For Employers
                </button>
              </Link>

              <Link
                href={"/jobSeeker/start-now"}
                className="w-full sm:w-auto md:min-w-[160px] text-white group text-xs sm:text-sm md:text-base font-semibold px-4 sm:px-6 rounded py-3 flex items-center justify-center gap-2 bg-primary hover:bg-white hover:text-black hover:border-gray-400 border transition-all duration-300"
              >
                Create AI Resume
                <BsArrowRight className="transition-transform text-lg duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right side image - properly positioned in flex */}
          <div className="hidden sm:flex items-center justify-center flex-shrink-0  w-1/2">
            <div className="relative w-full max-w-[626px] h-auto">
              {/* White shadow/glow */}
              <div className="bg-gradient-to-br from-transparent via-transparent to-white h-[400px] absolute w-full bottom-0 z-10"></div>
              <div className="bg-gradient-to-br from-transparent via-transparent to-white h-[300px] absolute w-full bottom-0 z-10"></div>
              <div className="bg-gradient-to-br from-transparent via-transparent to-white h-[200px] absolute w-full bottom-0 z-10"></div>
              <div className="bg-gradient-to-br from-transparent via-transparent to-white h-[100px] absolute w-full bottom-0 z-10"></div>
              <div className="bg-gradient-to-br from-transparent via-transparent to-white h-[50px] absolute w-full bottom-0 z-10"></div>

              {/* Actual image on top */}
              <Image
                src="/bannerimage.png"
                alt="AI Career"
                height={884}
                width={626}
                className="relative w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
