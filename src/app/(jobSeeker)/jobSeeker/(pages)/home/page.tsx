import RecomandationJob from "@/components/recomandation-job/RecomandationJob";
import PopularCompany from "@/components/seeker-home/popularCompany/page";
import RecentUpload from "@/components/seeker-home/RecentUploaded/RecentUploaded";
import SeekerBanner from "@/components/seeker-home/SeekerBanner";
import TopCategory from "@/components/seeker-home/TopCategory/page";
import SuggestedCourses from "@/components/Suggested/SuggestedCourses";

export default function JobSeekerHomePage() {
  const title = "Recommend for you";

  return (
    <div>
      <RecomandationJob title={title}></RecomandationJob>
      <SeekerBanner />
      {/* <RecentJob title={title}></RecentJob> */}
      <TopCategory />
      <RecentUpload />
      <PopularCompany />
      <SuggestedCourses />
    </div>
  );
}
