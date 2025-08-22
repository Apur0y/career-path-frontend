"use client";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import Container from "./ui/Container";
import Link from "next/link";
import { useRefreshTokenMutation } from "@/redux/features/auth/auth";

export default function AboutUs() {
  const [refresh] = useRefreshTokenMutation();

  const token = async () => {
    const res = await refresh({});
    console.log(res);
  };

  // token();

  return (
    <div id="about" className="bg-[#F8F8F8]  ">
      <Container>
        <div>
          <div className="flex flex-col md:flex-row items-center gap-10 px-6  max-w-6xl mx-auto">
            {/* Left - Image */}
            <div className="w-full md:w-1/2">
              <Image
                src="/about.png" // Replace with your image path
                alt="About Us"
                className="w-full rounded-lg  object-cover"
                height={793}
                width={674}
              />
            </div>

            {/* Right - Text Content */}
            <div className="w-full md:w-1/2 space-y-3 md:space-y-6">
              <h2 className="text-2xl md:text-5xl font-semibold">About Us!</h2>
              <h3 className="text-lg md:text-2xl font-bold ">
                The Future of Job Search, Powered by AI
              </h3>

              {/* Description Paragraphs */}
              <div className="space-y-4 para-main">
                <p>
                  Company Name was founded with a simple mission: to
                  revolutionize the job search and recruitment process through
                  the power of artificial intelligence. We combine cutting-edge
                  AI technology with personalized career insights to help job
                  seekers find the best opportunities and employers to hire the
                  most qualified candidates faster and more efficiently.
                </p>
                <p>
                  For Job Seekers: We offer an intelligent job matching system
                  that analyzes your profile and career preferences to suggest
                  jobs that fit you perfectly. Whether you’re looking for a
                  full-time role or exploring new career paths, probieren.de
                  helps you apply instantly with AI-powered resumes and cover
                  letters.
                </p>
                <p>
                  For Employers: We streamline the hiring process by using AI to
                  rank and match candidates to job listings, ensuring that you
                  spend less time sorting through applications and more time
                  focusing on the right people.
                </p>
              </div>

              {/* Our Values */}
              <div>
                <h4 className="text-xl font-semibold mb-2">Our Values:</h4>
                <ul className="list-disc list-inside para-main space-y-1">
                  <li>
                    Innovation: Constantly pushing boundaries with AI-driven
                    solutions.
                  </li>
                  <li>
                    Transparency: Clear communication and ethical technology
                    use.
                  </li>
                  <li>
                    Efficiency: Streamlining the job search experience end to
                    end.
                  </li>
                </ul>
              </div>

              {/* Button */}
              <Link href="#pricing">
                <button className="mt-4 px-6 py-3 flex bg-secondary text-white font-semibold rounded hover:bg-black transition cursor-pointer group  items-center">
                  Join Us Today{" "}
                  <BsArrowRight className=" text-xl ml-2 mt-1 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
