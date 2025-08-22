"use client";
import { UserBillingType } from "@/app/(commonLayout)/payment/[id]/page";
// import DropdownInput from '@/components/DropdownInput';
// import Input from '@/components/Input';
// import SelectField from '@/components/SelectField';
import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../ui/FormInput";
import { useGetMeQuery } from "@/redux/features/auth/auth";

interface UserBillingInfoProps {
  userBillingInfo: UserBillingType;
  setUserBillingInfo: React.Dispatch<React.SetStateAction<UserBillingType>>;
}

export default function UserBillingInfo({
  userBillingInfo,
  setUserBillingInfo,
}: UserBillingInfoProps) {
  const { register, handleSubmit } = useForm<UserBillingType>();

  const {data:user}=useGetMeQuery({});
  console.log(user?.data)

  const onSubmit = (data: UserBillingType) => {
    console.log("first", data);
  };

  const handleInputChange = (field: string, value: string) => {
   if (field !== "email") {
    setUserBillingInfo({
      ...userBillingInfo,
      [field]: value,
    });
  }
  };

  // const roleOptions = [
  //   { label: "Owner", value: "owner" },
  //   { label: "Developer", value: "developer" },
  //   { label: "Designer", value: "designer" },
  //   { label: "Manager", value: "manager" },
  //   { label: "Marketer", value: "marketer" },
  //   { label: "Other", value: "other" },
  // ];

  return (
    <div className="md:max-w-[818px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input Fields */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormInput
                label="First Name"
                type="text"
                placeholder={user?.data?.firstName}
                {...register("firstName", { required: true })}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <FormInput
                label="Last Name"
                type="text"
                placeholder={user?.data?.lastName}
                {...register("lastName", { required: true })}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormInput
                label="Phone"
                type="text"
                placeholder="+1 (555) 123-4567"
                {...register("phone", { required: true })}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <FormInput
                label="Email Address"
                type="email"
                placeholder={user?.data?.email}
                {...register("email", { required: true })}
                value={user?.data?.email}
                disabled
              />
            </div>
          </div>

          {/* 
          <SelectField
            label="Country/Region"
            name="country"
            options={roleOptions}
            register={register("country", { required: true })} // ✅ FIXED
            onChange={(value) => handleInputChange('country', value)}
          /> */}
          <div className="flex justify-between gap-4">

            <div className="flex-1">

              <FormInput
                label="Address"
                type="text"
                placeholder="Provide your address"
                {...register("address", { required: true })}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />

            </div>
            <div className="flex-1">
              <FormInput
                label="Country"
                type="text"
                placeholder="Provide your address"
                {...register("country", { required: true })}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />

            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormInput
                placeholder="City"
                {...register("city", { required: true })}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <FormInput
                placeholder="State"
                {...register("state", { required: true })}
                onChange={(e) => handleInputChange("state", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <FormInput
                placeholder="ZIP Code"
                {...register("zipCode", { required: true })}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="additionalInfo"
              className="text-[#333333] font-medium"
            >
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              rows={7}
              className="p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter additional information here..."
              {...register("additionalInfo")}
              onChange={(e) =>
                handleInputChange("additionalInfo", e.target.value)
              }
            />
          </div>
          <p>Your billing information is securely stored and encrypted.</p>
        </div>
      </form>
    </div>
  );
}
