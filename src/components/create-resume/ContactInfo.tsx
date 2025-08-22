"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../shared/button/Button";
import SectionHeader from "../shared/SectionHeader";
import FormInput from "../ui/FormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


interface ContactInfoType {
  linkedin_profile_url: string;
  personal_website_url?: string;
  other_social_media: string;
  other_social_media_url?: string;
}

interface IPersonal {
  setStep: any;
  formData: any
  setFormData: any;
}


export default function ContactInfo({ setStep, formData, setFormData }: IPersonal) {


  const router = useRouter();

  const contactInfoSchema = z.object({
    linkedin_profile_url: z
      .string()
      .url({ message: "LinkedIn profile must be a valid URL" })
      .or(z.literal("")), 

    personal_website_url: z
      .string()
      .url({ message: "Portfolio must be a valid URL" })
      .optional()
      .or(z.literal("")), // allow empty string

    other_social_media: z.string().min(1, { message: "Please select a platform" }),

    other_social_media_url: z
      .string()
      .url({ message: "Social media URL must be a valid URL" })
      .optional()
     .or(z.literal("")),
      
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInfoType>({
    resolver: zodResolver(contactInfoSchema),
  });


  const handleBack = (): void => {
    setStep(4);
    console.log("Back")
  };

  const onSubmit = (data: any) => {
    console.log(data, "Got the personal info");
    setStep(6)
    setFormData(data)
    // router.push("/jobseekeruser/aimagic");
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="w-full max-w-[1180px] h-auto">
        <SectionHeader
          title="Your Contact Information"
          description="Include additional contact details and social media links to showcase your professional presence."
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* LinkedIn Profile */}
          <div className="mb-4">
            <FormInput
              label="LinkedIn Profile"
              type="text"
              placeholder="Enter your LinkedIn profile URL"
              {...register("linkedin_profile_url")}
            />
            {errors.linkedin_profile_url && (
              <p className="text-red-500 text-sm mt-1">{errors.linkedin_profile_url.message}</p>
            )}

          </div>

          {/* Portfolio */}
          <div className="mb-4">
            <FormInput
              label="Personal Website/Portfolio"
              type="text"
              placeholder="Enter your personal website or portfolio URL"
              {...register("personal_website_url")}
            />
            {errors.personal_website_url && (
              <p className="text-red-500 text-sm mt-1">{errors.personal_website_url.message}</p>
            )}
          </div>

          {/* Social Media Selection and Link */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div className="w-full md:w-1/3">
              <label className="block font-medium text-primary-dark mb-1">
                Other Social Media
              </label>
              <select
                {...register("other_social_media", { required: true })}
                className="w-full bg-gray-50 py-4 px-4 border border-[#c2c2c2] rounded"
              >
                <option value="" disabled hidden>
                  Select a platform
                </option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="X">X</option>
              </select>
            </div>
            <div className="w-full md:w-2/3">
              <FormInput
                label="Social Media URL"
                type="text"
                placeholder="Enter other social media profile URL"
                {...register("other_social_media_url")}
              />
              {errors.other_social_media_url && (
                <p className="text-red-500 text-sm mt-1">{errors.other_social_media_url.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => handleBack()} className="px-4  py-2 rounded-md bg-secondary text-white cursor-pointer hover:bg-black">
              Back
            </button>
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
  );
}
