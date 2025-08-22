"use client";
import React, { useState } from "react";
import Container from "./ui/Container";
import ComponentHeader from "./shared/ComponentHeader";
import PackageCard from "./shared/PlanCard";
import { useGetSubscirptionPlansQuery } from "@/redux/features/Subscription/subscriptionSlice";
import Loading from "./Others/Loading";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/features/auth/auth";
import toast from "react-hot-toast";

export default function JobSeekerPlan() {
  const router = useRouter();
  const { data: JobSeekerPlans, isLoading } =
    useGetSubscirptionPlansQuery("un");

  const { data: user } = useGetMeQuery({});

  if (isLoading) {
    return <Loading />;
  }
  const SeekerPlan = JobSeekerPlans?.data.filter(
    (seeker: any) => seeker.description === "Job_Seeker_Plan"
  );

  const handleClick = (id: string) => {

      if (!user?.data) {
      router.push("signIn")
      toast.error("Please login first!")
    } else {

      router.push(`/checkout/${id}`);
    }

    const jobName = "frontend";
    const company = "Google";
    const location = "New York";

    const query = new URLSearchParams({
      job: jobName,
      company,
      location,
    }).toString();

 
  };

  return (
    <div id="pricing" className="bg-[#F8F8F8]">
      <Container>
        <ComponentHeader
          title="Job Seeker Plans"
          description="Choose the Right Plan for Your Career."
        ></ComponentHeader>

        <div className="flex justify-center flex-wrap gap-6 lg:mt-12 px-4 md:px-0">
          {SeekerPlan?.map((plan: any) => (
            <div key={plan?.id} className="md:flex justify-center">
              <PackageCard
                price={plan?.amount}
                planType={plan?.planType}
                packageName={plan?.planName}
                permissions={plan?.features}
                // Button Text will be "Active" if the planId matches the user's planId
                buttonText={
                  user?.data.planId === plan?.id &&
                  new Date(user?.data.planExpiration) > new Date()
                    ? "Active"
                    : ""
                }
                onButtonClick={() => {
                  // Only allow navigation to checkout if the plan is not active
                  if (user?.data.planId !== plan?.id) {
                    handleClick(plan?.id);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </Container>
      
    </div>
  );
}
