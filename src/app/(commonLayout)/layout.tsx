import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { useGetMeQuery } from "@/redux/features/auth/auth";

const navitem = [
  { name: "Home", href: "/" },
  { name: "For Job Seekers", href: "/jobSeeker/home" },
  { name: "For Employers", href: "/create-account" },
  { name: "Course", href: "/#course" },
  { name: "Pricing", href: "/#pricing" },
];
export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      {" "}
      <Navbar navItem={navitem}></Navbar>
      {children}
    </div>
  );
}
