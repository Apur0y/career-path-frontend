'use client';

import { useState } from "react";
import Container from "../ui/Container";
import SectionHeader from "../shared/SectionHeader";
import EducationalBackground from "./EducationalBackground";
import CertificationInformation from "./trash/CertificationInformation";

// type EducationFormData = {
//   degree: string;
//   institution: string;
//   major: string;
//   graduationStart: string;
//   graduationEnd: string;
// };
interface IPersonal {
  setStep: any;
  formData: any
  setFormData: any;
}


export default function Education({setStep,formData,setFormData}: IPersonal) {
    // const { register, handleSubmit } = useForm<EducationFormData>();
    const [certificate, setCertificate] = useState(true);

    return (
        <Container>
            <div className="min-h-screen px-4">
                <div className="flex justify-center mt-12">
                    <div className="md:px-6 w-full max-w-[1180px] relative">
                        <div className="flex justify-between">
                            {
                                certificate ? <SectionHeader
                                    title="Your Educational Background"
                                    description="Provide your academic qualifications and any relevant certifications to strengthen your resume."
                                /> : <SectionHeader
                                    title="Your Certifications"
                                    description="Provide any relevant certifications you've earned."
                                />
                            }

                            {/* <button onClick={() => setCertificate(!certificate)} type="button" className=" bg-secondary rounded-lg h-full px-3 py-2 md:px-6 md:py-3 text-white roulg">{certificate ? "Certifications" : "Education"}</button> */}

                        </div>

                        <div>
                            {
                                certificate ? <EducationalBackground certificate={certificate}  setCertificate={ setCertificate} setStep={setStep}  formData={formData} setFormData={setFormData}/> : <CertificationInformation certificate={certificate}  setCertificate={ setCertificate}  setStep={setStep}  formData={formData} setFormData={setFormData}/>
                            }
                        </div>


                    </div>
                </div>
            </div>
        </Container>
    );
}