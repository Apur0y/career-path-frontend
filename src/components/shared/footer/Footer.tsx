'use client'
import React from "react";
import { FaFacebookF, FaTwitter, FaVimeoV, FaYoutube } from "react-icons/fa";
import Container from "../../ui/Container";
import Logo from "../../ui/MainLogo";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {

  const pathname=usePathname();


  return (
    <div className={`${pathname.includes("/jobSeeker")?"bg-card":"bg-white mt-36 md:mt-12"} `}>
      <Container>
        <footer className=" py-10 px-3">
          <div className="mx-auto space-y-8">
            {/* Top section: Nav + Icons */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              {/* Navigation Links */}
              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a href="/#" className="hover:text-primary">
                  Home
                </a>
                <a href="/#about" className="hover:text-primary">
                  About Us
                </a>
                <a href="/#course" className="hover:text-primary">
                  Courses
                </a>
                <a href="/create-account" className="hover:text-primary">
                  For Employers
                </a>
                <a href="/jobSeeker/home" className="hover:text-primary">
                  For Job Seekers
                </a>
              </nav>

              {/* Social Icons */}
              <div className="flex space-x-4 text-lg">
                <FaFacebookF className="hover:text-primary cursor-pointer" />
                <FaVimeoV className="hover:text-primary cursor-pointer" />
                <FaTwitter className="hover:text-primary cursor-pointer" />
                <FaYoutube className="hover:text-primary cursor-pointer" />
              </div>
            </div>

            <div className="border-[1px] border-gray-200" />
            {/* Bottom section: Logo + Terms */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 text-sm">
              {/* Logo and Copyright */}
              <div>
                <p>© 2025. All rights reserved.</p>
              </div>
              <Logo height={40} width={240} />

              {/* Terms and Privacy */}
              <div className="flex space-x-6">
                <a href="#" className="hover:text-primary">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-primary">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
