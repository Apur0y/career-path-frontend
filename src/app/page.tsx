import AboutUs from "@/components/AboutUs";
import Banner from "@/components/Banner";
import ChooseUs from "@/components/ChooseUs";
import EmployerPlan from "@/components/EmployerPlan";
import Footer from "@/components/shared/footer/Footer";
import JobSeekerPlan from "@/components/JobSeekerPlan";
import Newsletter from "@/components/NewsLetter";
import PerfectJob from "@/components/Perfectjob";
import RecentJob from "@/components/recent-job/RecentJob";
import ScrollTop from "@/components/shared/ScrollTop";
import SuggestedCourses from "@/components/Suggested/SuggestedCourses";
import TopTalent from "@/components/TopTalent";
import Cookies from "js-cookie";
import Navbar from "@/components/shared/Navbar/Navbar";

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
      <Navbar navItem={navitem}></Navbar>
      <Banner></Banner>
      <RecentJob title={"Recent Job"}></RecentJob>
      <ChooseUs></ChooseUs>
      <AboutUs></AboutUs>
      <PerfectJob></PerfectJob>
      <TopTalent></TopTalent>
      <SuggestedCourses></SuggestedCourses>
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
