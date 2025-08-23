import React from "react";
import { 
  FaBrain, 
  FaRocket, 
  FaShieldAlt, 
  FaUserFriends, 
  FaChartLine, 
  FaMagic 
} from "react-icons/fa";
import Container from "./ui/Container";
import ComponentHeader from "./shared/ComponentHeader";

const cardData = [
  {
    icon: <FaBrain className="text-4xl text-blue-500" />,
    title: "AI-Powered Matching",
    description: "Our advanced algorithms analyze your skills and preferences to match you with perfect job opportunities."
  },
  {
    icon: <FaRocket className="text-4xl text-purple-500" />,
    title: "Fast & Efficient",
    description: "Reduce your job search time by up to 70% with our streamlined application process."
  },
  {
    icon: <FaShieldAlt className="text-4xl text-green-500" />,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security and privacy controls."
  },
  {
    icon: <FaUserFriends className="text-4xl text-orange-500" />,
    title: "Dedicated Support",
    description: "Get personalized assistance from our team of career experts whenever you need it."
  },
  {
    icon: <FaChartLine className="text-4xl text-red-500" />,
    title: "Career Analytics",
    description: "Track your application performance and get insights to improve your success rate."
  },
  {
    icon: <FaMagic className="text-4xl text-cyan-500" />,
    title: "Smart Resume Builder",
    description: "Create professional, ATS-friendly resumes tailored to each job application."
  }
];

export default function ChooseUs() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-blue-50 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <Container>
        <div className="relative z-10">
          <ComponentHeader
            title="Why Job Seekers Choose Us"
         
            description={
              <>
                Unlock personalized job opportunities, streamline your job search
                process, and make smarter career decisions with the power of AI, 
                all in one seamless platform.
              </>
            }
            
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-transparent shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon container with animation */}
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center p-4 bg-blue-50 group-hover:bg-white rounded-2xl transition-all duration-500 group-hover:scale-110">
                    {card.icon}
                  </div>
                  <div className="absolute -inset-4 bg-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 group-hover:scale-110 transition-all duration-500"></div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 relative">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative">
                  {card.description}
                </p>
                
                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>

        
        </div>
      </Container>
    </section>
  );
}