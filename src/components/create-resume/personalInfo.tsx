"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Button from "../shared/button/Button";
import SectionHeader from "../shared/SectionHeader";
import FormInput from "../ui/FormInput";
import Link from "next/link";


interface PersonalInfoType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}
export interface IPersonal {
  setStep: any;
  formData: any
  setFormData: any;
  setCertificate?: any;
  certificate?: any;
}

export default function PersonalInformation({ setStep, formData, setFormData }: IPersonal) {
  const { register, handleSubmit } = useForm<PersonalInfoType>();



  const onSubmit = (data: PersonalInfoType) => {
    console.log(data, "Got the personal info");
    setFormData(data)
    setStep(2);
  };

  return (
    <div className="min-h-screen px-2">
      <div className="flex justify-center mt-12">
        <div className=" w-full max-w-[1180px] h-auto">
          <SectionHeader
            title="Tell Us About Yourself"
            description="Fill in your personal details so we can tailor your resume perfectly to your career goals."
          />

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <FormInput
                label="First Name"
                type="text"
                placeholder="Vorname"
                defaultValue={formData?.firstName}
                {...register("firstName", { required: true })}
              />
              <FormInput
                label="Last Name"
                type="text"
                placeholder="Nachname"
                defaultValue={formData?.lastName}
                {...register("lastName", { required: true })}
              />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <FormInput
                label="Phone Number"
                type="text"
                placeholder="+4915510830069"
                defaultValue={formData?.phone}
                {...register("phone", { required: true })}
              />
              <FormInput
                label="Email Address"
                type="email"
                placeholder="example@gmail.com"
                defaultValue={formData?.email}
                {...register("email", { required: true })}
              />
            </div>

            {/* Country and Address */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
              <div className="w-full md:w-1/3">
                <label className="block font-medium text-primary-dark">
                  Country/Region
                </label>
                <input
                  type="text"
                  placeholder="Geben Sie Ihr Land ein"
                  defaultValue={formData?.country}
                  {...register("country", { required: true })}
                  className="w-full bg-gray-50 py-4 px-4 border border-[#c2c2c2] rounded"
                />
              </div>
              <div className="w-full md:w-2/3">
                <FormInput
                  label="Address"
                  type="text"
                  placeholder="Ihre Adresse"
                  defaultValue={formData?.address}
                  {...register("address", { required: true })}
                />
              </div>
            </div>


            {/* City, State, ZIP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              <FormInput
                label="City"
                type="text"
                placeholder="München"
                defaultValue={formData?.city}
                {...register("city", { required: true })}
              />
              <FormInput
                label="State"
                type="text"
                placeholder="Bayern"
                defaultValue={formData?.state}
                {...register("state", { required: true })}
              />
              <FormInput
                label="ZIP Code"
                type="text"
                placeholder="80331"
                defaultValue={formData?.zip}
                {...register("zip", { required: true })}
              />
            </div>

            <div className="flex justify-between">
              <Link href={"/jobSeeker/start-now"}>
              <button type="button" className="px-4  py-2 rounded-md bg-secondary text-white cursor-pointer">
                Back
              </button>
              </Link>
              <Button
                type="submit"
                text="Next"
                icon="arrow-right"
                action="submit"
                bgColor="#28C76F"
                name="Next"
                className="px-4  py-2  rounded-md"
              />
            </div>


          </form>
        </div>
      </div>
    </div>
  );
}
