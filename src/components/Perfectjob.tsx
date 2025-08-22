import Image from "next/image";
import Container from "./ui/Container";
import InfoSection from "./shared/TwoCloumn";

export default function PerfectJob() {
  
  return (
    <div className="relative ">
      <div className="absolute right-0 z-10">
        <Image src="/Pattern2.png" alt="Pattern" height={1146} width={1156} />
      </div>
      <Container>
        <div className="relative z-20">
          <InfoSection
            imageUrl="/perfectJob.jpeg"
            title="Ready to"
            title2={
              <>
                Find Your <br /> Perfect Job?
              </>
            }
            description="With AI-powered tools, we help you find the right job faster and easier. Get matched with top roles based on your skills and goals. Take control of your career path today."
            buttonText="Create Your Profile"
            // onButtonClick={() => alert("Button clicked!")}
            className="md:flex-row-reverse"
            height={689}
            width={562}
          ></InfoSection>
        </div>
      </Container>
    </div>
  );
}
