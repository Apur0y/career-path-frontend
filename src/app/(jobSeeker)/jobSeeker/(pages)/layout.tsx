
import JobSeekerNavbar from "@/components/seeker-home/SeekerNavbar";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";


// const navitem = [
//   { name: "Job", href: "#" },
//   { name: "companies", href: "/jobseekeruser/jobSeekerHome" },
//   { name: "Course", href: "#" },
//   { name: "Pricing", href: "#" },
// ];

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   const navitem=[
    { name: "Home", href: "/jobSeeker/home" },
    { name: "Job", href: "/jobSeeker/job-details/jobs" },
    { name: "Company", href: "/jobSeeker/search-jobs" },
    // { name: "Course", href: "#" },
   
  ];
  return (
    <div>
      {" "}
     
     <Navbar navItem={navitem} />
      {children}
      <Footer/>
    </div>
  );
}
