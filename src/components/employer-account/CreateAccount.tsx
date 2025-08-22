'use client'
import Image from "next/image";

import React from "react";
import Container from "../ui/Container";
import { useGetMeQuery } from "@/redux/features/auth/auth";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateAccount() {

    const { data: user } = useGetMeQuery({})
    const router = useRouter()

    const handleEmployer = () => {

        if (!user) {
            router.push("/signIn")
            toast.error("Please Login First!")
       
        } else if (user?.data.companyName) {
            toast.error("You already have a company account!")
        } else if (user?.data.role != "EMPLOYEE") {
            toast.error(" Only Employer can create a company account!")
        }
        else {
            router.push("/company-details")
        }
    }


    return (
        <Container>
            <div className="  flex justify-center items-center min-h-screen flex-col md:flex-row md:space-x-4 md:mx-3">
                <div className="flex items-center   ">
                    <Image
                        src="/account.jpg"
                        alt="Sample Resume"
                        width={578}
                        height={499}
                        className="rounded-2xl "

                    />
                </div>

                <div className="text-left flex flex-col  justify-between mt-6 md:mt-0 text-secondary">
                    <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold  mb-4 leading-[1.24]">
                        <span className="">Create Your</span> <br />
                        Employee Account
                    </h1>
                    <p className="text-gray-400 text-sm mb-4 md:mb-12 leading-[1.6]">
                        Follow these simple steps to set up your company profile and find the perfect  <br /> candidate for your team.
                    </p>

                    <button onClick={() => handleEmployer()} className="px-18 py-4 bg-primary text-[#FCFCFC] font-semibold rounded-lg hover:bg-green-600 cursor-pointer transition">
                        Start Now
                    </button>
                </div>
            </div>
        </Container>
    );
}