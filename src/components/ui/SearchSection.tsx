import React from "react";
import SearchField from "../shared/searchField/SearchField";
import { animate } from "framer-motion";
import Navbar from "../shared/Navbar/Navbar";
import FloatNavbar from "../shared/searchField/FloatNavbar";
import { usePathname } from "next/navigation";

const navitem1 = [
  { name: "Home", href: "/" },
  { name: "For Job Seekers", href: "/jobSeeker/home" },
  { name: "For Employers", href: "/create-account" },
  { name: "Course", href: "#course" },
  { name: "Pricing", href: "#pricing" },
];

   const navitem2=[
    { name: "Home", href: "/jobSeeker/home" },
    { name: "Job", href: "/jobSeeker/job-details/jobs" },
    { name: "Company", href: "/jobSeeker/search-jobs" },
   
  ];

  

export default function SearchSection({setAnimate,animate}:any) {
  const path=usePathname();

  const navitem= path.includes("jobSeeker")? navitem2:navitem2
  return (
    <div className="">
      <div className="absolute -top-27 w-full">

      <FloatNavbar navItem={navitem}/>
      </div>

    <div className=" max-w-[1420px] mx-auto flex  justify-center ">

      <SearchField setAnimate={setAnimate} animate={animate} />
    </div>
    </div>
  );
}


