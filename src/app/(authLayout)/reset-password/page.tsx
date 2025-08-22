"use client";

import LoadingButton from "@/components/loading/LoadingButton";
import { useResetPasswordMutation } from "@/redux/features/auth/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface PasswordFormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [resetPasswordUser, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: PasswordFormData) => {
    console.log("Submitted Password Data:", data);
    //  Call API to update password
    try {
      const response = await resetPasswordUser(data).unwrap();
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        router.push("/");
        reset();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <div className="mt-[100px] p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl mx-auto p-8 space-y-4 border border-gray-300  rounded-xl shadow"
        >
          <h2 className="text-3xl  mb-6 font-semibold text-center text-primary">
            Reset Password
          </h2>
          {/* email  */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-base text-subtitle"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: " email is required",
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          {/* new passowrd  */}
          <div className="w-full">
            <label
              htmlFor="newPassword"
              className="block mb-1 font-medium text-base text-subtitle"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          {/* confirm password  */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1 font-medium text-base text-subtitle"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="togglePassword"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
              className="mr-2"
            />
            <label htmlFor="togglePassword" className="text-sm">
              Show Passwords
            </label>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer text-base font-medium bg-primary text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
          >
            {isLoading ? (
              <>
                <LoadingButton />
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordForm;
