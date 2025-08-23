import Image from "next/image";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import SearchField from "./shared/searchField/SearchField";

export default function Banner() {
  return (
    <div className="relative overflow-hidden w-full min-h-screen flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/back2.jpg"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center text-center lg:text-left">
          {/* Content */}
          <div className="flex flex-col gap-8 md:gap-10 lg:gap-12 max-w-5xl">
            {/* Heading section */}
            <div className="flex flex-col gap-5 md:gap-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Find Your Dream Job & Forge <br /> {" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 flex justify-center">
                 Your Career Path
                </span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100  text-center">
                Discover your next opportunity with personalized AI job
                matching. Apply with a single click
                today.
              </p>
            </div>

            {/* Search Field */}
            <div className="w-full">
              <SearchField />
            </div>

            {/* Action buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 max-w-[500px]">
              <Link href={"/create-account"}>
                <button className="w-full sm:w-auto px-6 py-3.5 text-base font-medium rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-900 transition-all duration-300">
                  For Employers
                </button>
              </Link>

              <Link href={"/jobSeeker/start-now"}>
                <button className="w-full sm:w-auto px-6 py-3.5 text-base font-medium rounded-lg flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 group">
                  Create AI Resume
                  <BsArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
}