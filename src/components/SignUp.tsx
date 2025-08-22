"use client";
import { useSignUpMutation } from "@/redux/features/auth/auth";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import LoadingButton from "./loading/LoadingButton";
import Logo from "./ui/MainLogo";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const router = useRouter();
  const [createAccount, { isLoading }] = useSignUpMutation();

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      return toast.error("Password and Confirm Password do not match");
    }

    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await createAccount(userData).unwrap();
      localStorage.setItem("myEmail", data.email);
      if (response?.success) {
        reset();
        router.push("/email-verify");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(
        error.data?.message || "Registration failed. Please try again."
      );
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await axios.post(
        `http://172.252.13.71:5005/api/v1/auth/google-login`,
        {
          googleToken: credentialResponse.credential,
        }
      );

      if (response?.data?.success) {
        router.push("/");
        toast.success("Login successful");
      }
    } catch (error) {
      console.error("Google login failed", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try another method.");
  };

  return (
    <section className="max-w-[1420px] mx-auto min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-[1200px] bg-white rounded-xl overflow-hidden">
        {/* Image Section */}
        <div className="lg:w-1/2 hidden md:block relative">
          <Image
            src="/register.jpg"
            alt="Registration visual"
            fill
            className="object-cover -scale-x-100 rounded-lg"
            priority
            quality={90}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12">
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="mb-6">
              <Logo height={100} width={224} />
            </Link>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Create your account
            </h2>
            <p className="text-gray-600 text-sm md:text-base text-center">
              Welcome! Please enter your details to register
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className={`w-full py-[17px] px-4 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.firstName
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  className={`w-full py-[17px] px-4 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.lastName
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`w-full py-[17px] px-4 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                     : "border-gray-300 focus:ring-blue-200"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full py-[17px] px-4 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={`w-full py-[17px] px-4 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
            </div>

             <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-3 py-4 ${
            isLoading ? 'bg-white border border-gray-400 ' : 'bg-primary hover:border-gray-400'
          } text-white text-xs xl:text-sm font-medium hover:cursor-pointer rounded hover:bg-white hover:text-black hover:border-gray-400 border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 whitespace-nowrap`}
        >
          {isLoading ? <LoadingButton color="#28C76F" /> : 'Register'}
        </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-200" />
            <span className="mx-3 text-gray-500 text-sm">or continue with</span>
            <hr className="flex-grow border-gray-200" />
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              size="large"
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              text="signup_with"
              shape="rectangular"
              theme="filled_blue"
            />
          </div>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              href="/signIn"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
