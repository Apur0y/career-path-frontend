"use client"
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



const page = () => {


// const fetchData = async () => {
//   try {
//     // Retrieve the token from cookies (make sure it's correct and not undefined)

//     const response = await fetch("http://172.252.13.71:5005/api/v1/auth/refresh-token", {
//       method: "POST", // Assuming the request method is POST
//       credentials: "include", // Include credentials (cookies)
//       // You can pass the body if needed for a refresh-token request
//       // body: JSON.stringify({ /* your request body if needed */ }),
//     });

//     // Check if the request was successful
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     // Parse the JSON response
//     const data = await response.json();
//     console.log(data);

//     // Handle the data as needed
//     return data;

//   } catch (error) {
//     console.error("Error during fetch:", error);
//   }
// };


// fetchData();

// console.log("Hite")

  return (
    <div className="black-main relative">
      <Banner></Banner>
      <RecentJob title={"Recent Job"}></RecentJob>

      <ChooseUs></ChooseUs>
      <AboutUs></AboutUs>
      <PerfectJob></PerfectJob>
      <TopTalent></TopTalent>
      <SuggestedCourses></SuggestedCourses>
      <div >

      <JobSeekerPlan />
      <EmployerPlan />
      </div>
      <Newsletter />
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default page;
