"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiPhone, FiMail, FiCalendar } from "react-icons/fi";
import { FiEdit, FiX, FiCheck } from "react-icons/fi";
import { useGetMeQuery, useUpdateContactInfoMutation } from "@/redux/features/auth/auth";
import Link from "next/link";

export default function UserProfileCard() {
  const { data: info } = useGetMeQuery({});
  const [updateProfile] = useUpdateContactInfoMutation();

  const [user, setUser] = useState<any>(null);
  const [editData, setEditData] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sync API data into state
  useEffect(() => {
    if (info?.data) {
      setUser(info.data);
      setEditData(info.data);
    }
  }, [info?.data]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          firstName: editData.firstName,
          lastName: editData.lastName,
          phone: editData.phone,
          preferredContactMethod: editData.preferredContactMethod,
        })
      );
      if (profileImage) {
        formData.append("file", profileImage);
      }

      const res = await updateProfile(formData);
      console.log("Update Response:", res);

      setUser({
        ...editData,
        profilePic: previewImage || user?.profilePic,
        fullName: `${editData.firstName} ${editData.lastName}`,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-center px-6 py-16 bg-neutral-600">
      <div className="w-10/12 bg-white shadow-2xl rounded-lg">
        <div className="p-12 text-center">
          {/* Profile Image */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={previewImage || user?.profilePic || "/avatarPlaceholder1.png"}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <label className="absolute -bottom-1 left-1/2 bg-white p-1 rounded-full shadow-md cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <FiEdit className="h-4 w-4 text-prbg-primary" />
                </label>
              )}
            </div>
          </div>

          {/* Name + Role */}
          {isEditing ? (
            <div className="flex justify-center gap-2 mb-4">
              <input
                type="text"
                name="firstName"
                value={editData.firstName}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 text-center"
              />
              <input
                type="text"
                name="lastName"
                value={editData.lastName}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 text-center"
              />
            </div>
          ) : (
            <h1 className="text-4xl font-light text-gray-700 mb-2">{user?.fullName}</h1>
          )}
          <p className="text-sm font-medium text-gray-500 tracking-wider mb-6">
            {user?.role === "EMPLOYEE" ? "Employee" : user?.role }
          </p>



          <div className="flex justify-center ">
            {/* Contact Info Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 max-w-lg mx-auto text-left">
              {/* Phone */}
              <div>
                <label className="flex items-center text-xs font-medium text-gray-500 gap-1">
                  <FiPhone className="w-3 h-3" /> Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-prbg-primary focus:border-prbg-primary"
                    placeholder="+1 (555) 123-4567"
                  />
                ) : (
                  <p className="text-gray-700">{user?.phone || "Not provided"}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-xs font-medium text-gray-500 gap-1">
                  <FiMail className="w-3 h-3" /> Email
                </label>
                <p className="text-gray-700">{user?.email}</p>
              </div>

              {/* Join Date */}
              <div>
                <label className="flex items-center text-xs font-medium text-gray-500 gap-1">
                  <FiCalendar className="w-3 h-3" /> Current Package
                </label>
                <p className="text-gray-700">
                  {/* {user?.joiningDate
                    ? new Date(user.joiningDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    : "N/A"} */}
                     {user?.subscriptionType === "monthly" ? "Monthly" : user?.subscriptionType || "N/A"}
                </p>
              </div>

              {/* Subscription Expiry */}
              <div>
                <label className="flex items-center text-xs font-medium text-gray-500 gap-1">
                  <FiCalendar className="w-3 h-3" /> Subscription Expires
                </label>
                <p className="text-gray-700">
                  {user?.planExpiration
                    ? new Date(user.planExpiration).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>



          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="border border-gray-300 text-gray-600 px-8 py-3 rounded-sm hover:bg-gray-100 flex items-center gap-2 transition-colors font-medium cursor-pointer"
              >
                <FiEdit /> Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditData(user);
                    setPreviewImage("");
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-sm hover:bg-gray-600 flex items-center gap-2 cursor-pointer transition"
                >
                  <FiX /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-primary text-white px-6 py-3 rounded-sm hover:bg-green-600 flex items-center gap-2 disabled:bg-green-300 cursor-pointer transition"
                >
                  {isLoading ? "Saving..." : <><FiCheck /> Save</>}
                </button>
              </>
            )}
            {
              user?.role ==="EMPLOYEE"? <Link href={"http://172.252.13.69:1004/"} className="border border-gray-300 text-gray-600 px-8 py-3 rounded-sm hover:bg-gray-100 transition-colors font-medium cursor-pointer">
              Go to Dashboard
            </Link>:<Link href={"http://172.252.13.69:1001/"} className="border border-gray-300 text-gray-600 px-8 py-3 rounded-sm hover:bg-gray-100 transition-colors font-medium cursor-pointer">
              Go to Dashboard
            </Link>
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}
