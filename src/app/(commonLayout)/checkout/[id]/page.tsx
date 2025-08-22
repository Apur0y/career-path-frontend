import PlanSummaryCard from "../../../../components/SummaryCard";

export default function Home() {
  const plan = {
    roleName: "Job_Seeker_Plan",
    planName: "Premium Plan",
    price: 9.99,
    permissions: [
      "Receive up to 25 job suggestions",
      "Access to AI-generated, industry-specific cover letters",
      "Access to salary benchmarks for roles and locations",
      'Use of "Trial Pilot" — explore new industries and courses',
      "All free tier benefits included",
    ],
  };

  return (
    <main className="flex items-center justify-center  px-4">
      <PlanSummaryCard {...plan} />
    </main>
  );
}
