"use client";
import React from "react";
import Container from "./ui/Container";
import ComponentHeader from "./shared/ComponentHeader";
import PackageCard from "./shared/PlanCard";
import { useRouter } from "next/navigation";
import { useGetSubscirptionPlansQuery } from "@/redux/features/Subscription/subscriptionSlice";
import Loading from "./Others/Loading";
import { useGetMeQuery } from "@/redux/features/auth/auth";
import toast from "react-hot-toast";

export default function EmployerPlan() {
  const { data: JobSeekerPlans, isLoading } =
    useGetSubscirptionPlansQuery("un");

  const { data: user } = useGetMeQuery({});
  const router = useRouter();

  // Filter the employer plans
  const SeekerPlan = JobSeekerPlans?.data.filter(
    (seeker: any) => seeker.description === "Employer_Plan"
  );

  const handleClick = (id: string) => {
    const jobName = "frontend";
    const company = "Google";
    const location = "New York";

    if (!user?.data) {
      router.push("signIn")
      toast.error("Please login first!")
    } else {

      router.push(`/checkout/${id}`);
    }

    const query = new URLSearchParams({
      job: jobName,
      company,
      location,
    }).toString();

  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-[#F8F8F8] md:rounded-b-[100px] rounded-b-[50px]  lg:rounded-b-[300px] pb-12">
      <Container>
        <ComponentHeader
          title="Employer Plans"
          description="Choose the Right Plan for Your Business."
        ></ComponentHeader>

        <div className="flex justify-center flex-wrap mt-12 gap-6 px-4 md:px-0">
          {SeekerPlan?.map((plan: any, index: any) => (
            <div key={index} className="flex justify-center">
              <PackageCard
                price={plan?.amount}
                planType={plan?.planType}
                packageName={plan?.planName}
                permissions={plan?.features}
                // Button Text will be "Active" if the planId matches the user's planId
                // buttonText={(user?.data.planId === plan?.id && user?.data.isSubscribed ==true) ? "Active" : "Get Started"}
                buttonText={user?.data.planId === plan?.id ? "Active" : ""}
                onButtonClick={() => {
                  // Only allow navigation to checkout if the plan is not active
                  handleClick(plan?.id);
                }}
              />
            </div>
          ))}
        </div>
      </Container>

    </div>
  );
}
