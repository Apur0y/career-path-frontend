import dynamic from "next/dynamic";

const RecentJob = dynamic(() => import("@/components/recent-job/RecentJob"));
const ChooseUs = dynamic(() => import("@/components/ChooseUs"));
const AboutUs = dynamic(() => import("@/components/AboutUs"));
const PerfectJob = dynamic(() => import("@/components/Perfectjob"));
const TopTalent = dynamic(() => import("@/components/TopTalent"));
const JobSeekerPlan = dynamic(() => import("@/components/JobSeekerPlan"));
const EmployerPlan = dynamic(() => import("@/components/EmployerPlan"));
const Newsletter = dynamic(() => import("@/components/NewsLetter"));
const Footer = dynamic(() => import("@/components/shared/footer/Footer"));
import Navbar from "@/components/shared/Navbar/Navbar";
import Banner from "@/components/Banner";
import ScrollTop from "@/components/shared/ScrollTop";
import Disclaimer from "@/components/profile/Disclaimer";

const navitem = [
  { name: "Home", href: "/" },
  { name: "For Job Seekers", href: "/jobSeeker/home" },
  { name: "For Employers", href: "/create-account" },
  { name: "Course", href: "/#course" },
  { name: "Pricing", href: "/#pricing" },
];

const page = () => {
  return (
    <div className="black-main relative">
      <div className="fixed bottom-0 z-80">

      <Disclaimer/>
      </div>
      <Navbar navItem={navitem}></Navbar>
      <Banner></Banner>
      <RecentJob title={"Recent Job"}></RecentJob>
      <ChooseUs></ChooseUs>
      <AboutUs></AboutUs>
      <PerfectJob></PerfectJob>
      <TopTalent></TopTalent>   
      <div className="relative">        
      <JobSeekerPlan />
      <EmployerPlan />
      <div className="absolute -bottom-30 md:-bottom-15 w-full">
      <Newsletter />
      </div>
      </div>
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default page;
