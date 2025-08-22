"use client";

import React, { useEffect, useState } from "react";
import SuccessDetails from "../../../components/SuccessDetails";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateAndRedirect, getRoleFromToken } from "@/lib/roleUtils";
import JobSeekerPlan from "@/components/JobSeekerPlan";
import EmployerPlan from "@/components/EmployerPlan";
import { CheckCircle } from "lucide-react";
import EmailVerificationPage from "../../../components/EmailVerify";

export default function page() {
  const router = useRouter();
  const [redirectPath, setRedirectPath] = useState<string>("/");
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check for role and determine redirect path
    const role = getRoleFromToken();
    const path = validateAndRedirect();
    setUserRole(role);
    setRedirectPath(path);
  }, []);

  const handleContinue = () => {
    if (userRole) {
      router.push(redirectPath);
    } else {
      router.push("/signIn");
    }
  };

  return (
    <div>
      {/* <div className="md:max-w-[941px] mx-3 md:mx-auto mt-14  ">
        <div className="flex justify-center items-center h-[600px]">
          <div className=" mx-auto bg-white   rounded-md p-9 border border-gray-300 space-y-6 ">
            <h1 className="text-3xl md:text-5xl font-semibold text-center">
              Success!
            </h1>
            <h1 className="text-3xl md:text-5xl font-semibold  text-center">
              Your Subscription is Active.
            </h1>
            <p className="text-center text-gray-600">
              {userRole
                ? `Welcome back! You are now logged in as a ${userRole.replace('_', ' ').toLowerCase()}.`
                : "Please log in to access your account."
              }
            </p>
            <button
              onClick={handleContinue}
              className="w-full mt-20 bg-primary border-none hover:bg-green-700 text-white py-2 px-4 rounded-md transition flex items-center justify-center"
            >
              {userRole ? "Continue to Dashboard" : "Please Log in"}
              <BiRightArrowAlt className="size-6" />
            </button>
          </div>
        </div>


      </div> */}
       {/* <div className="pt-6 flex flex-col items-center justify-center bg-white px-4"> */}
      {/* Success Icon */}
      {/* <div className="flex flex-col items-center mb-6 ">
        <CheckCircle className="w-16 h-16 text-primary mb-2" />
        <h1 className="text-2xl font-bold text-gray-800">
          Your email is successfully verified
        </h1>
        <p className="text-gray-600 mt-1 text-center">
          Choose a package to continue and access our awesome features.
        </p>
      </div>

     
      
    </div>
       <JobSeekerPlan />
        <EmployerPlan /> */}
        <EmailVerificationPage/>
    </div>

  );
}
