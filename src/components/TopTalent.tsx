import Image from "next/image";
import InfoSection from "./shared/TwoCloumn";
import Container from "./ui/Container";

export default function TopTalent() {
  return (
    <div className="bg-[#F8F8F8] relative">
      <div className="absolute left-0 bottom-0     z-10">
        <Image src="/Pattern3.png" alt="Pattern" height={650} width={656} />
      </div>
      <Container
      >
        <div className="relative z-20">
          <InfoSection
            imageUrl="/talent.jpg"
            title="Looking for"
            title2={<>Top Talent?</>}
            description="With AI-powered tools, we help you find the right job faster and easier. Get matched with top roles based on your skills and goals. Take control of your career path today."
            buttonText="Post a Job "
            // onButtonClick={() => alert("Button clicked!")}
            className="md:flex-row"
            height={689}
            width={562}
          ></InfoSection>
        </div>
      </Container>
    </div>
  );
}
