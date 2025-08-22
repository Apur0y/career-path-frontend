"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";


interface FormData {
  firstName: string;
  lastName: string;
  JobTitle: string;
  phoneNumber: string;
  email: string;
  location: string;
  countryRegion: string,
  city: string,
  state: string,
  image: File | null;
}

interface HeadModal {
  isModalOpen: boolean;
  setIsModalOpen: any;
  profileData: any;
}

// const HeadAboutModal: React.FC<HeadModal> = ({
//   isModalOpen,
//   setIsModalOpen, profileData, setProfileData
// }) => {
const HeadAboutModal = ({
  isModalOpen,
  setIsModalOpen, profileData, setProfileData
}: any) => {


  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      firstName: profileData?.firstName,
      lastName: profileData?.lastName,
      JobTitle: profileData?.JobTitle || "",
      phoneNumber: profileData?.phoneNumber || "",
      email: profileData?.email || profileData?.user?.email || "",
      // location: `${profileData?.city}, ${profileData?.state}, ${profileData?.countryRegion}` || "",
      countryRegion: profileData?.countryRegion || "",
      city: profileData?.city || "",
      state: profileData?.state || "",
      image: profileData?.user?.profilePic || null, // Assuming profilePic is the field for the image
    },
  });

  // const onSubmit: SubmitHandler<FormData> = (data) => {
  //   console.log(data);
  //   setIsModalOpen(false); // Close modal after submission
  //   reset(data); // Update default values with submitted data
  // };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("Updated DataA: ", data);

      const updatedData = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        JobTitle: data?.JobTitle,
        phoneNumber: data?.phoneNumber,
        email: data?.email,
        // location: data?.location,
        countryRegion: data?.countryRegion,
        city: data?.city,
        state: data?.state
        // other fields...
      };

      const response = await fetch(`http://172.252.13.71:5005/api/v1/profiles/resume/${profileData?.User?.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Send updated data as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to update profile data");
      }

      // const updatedData = await response.json();
      console.log("Profile updated successfully:", updatedData);

      // Close the modal and reset form after submission
      setIsModalOpen(false);
      reset(data);

      setProfileData((prevData: any) => ({
        ...prevData,  // Spread the previous state to maintain unchanged data
        ...updatedData // Apply the updated data (could be nested as well)
      }));

    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };


  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="">
      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  {...register("firstName")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="First Name"
                />
              </div>  <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  {...register("lastName")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <label className="block text-gray-700">Job Title</label>
                <input
                  {...register("JobTitle")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Title"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  {...register("phoneNumber")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Phone"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  {...register("email")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Email"
                />
              </div>
              {/* <div>
                <label className="block text-gray-700">Location</label>
                <input
                  {...register("location")}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Location"
                />
              </div> */}

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Country/Region</label>
                  <input
                    {...register("countryRegion")}
                    className="w-full border-b border-gray-300 focus:outline-none"
                    placeholder="Country/Region"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">City</label>
                  <input
                    {...register("city")}
                    className="w-full border-b border-gray-300 focus:outline-none"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">State</label>
                  <input
                    {...register("state")}
                    className="w-full border-b border-gray-300 focus:outline-none"
                    placeholder="State"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700">Image</label>
                <input
                  {...register("image")}
                  type="file"
                  className="bg-[#ccc] px-4 py-2 rounded-md mt-2"
                  placeholder="Location"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-green-800"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadAboutModal;
