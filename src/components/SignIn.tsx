"use client";
import { useSignInMutation } from "@/redux/features/auth/auth";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ForgotPasswordModal from "./ForgetPasswordModal";
import LoadingButton from "./loading/LoadingButton";
import Logo from "./ui/MainLogo";

interface FormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const [isModalOpen, setModalOpen] = useState(true);
  const router = useRouter();
  const [sigInUser, { isLoading }] = useSignInMutation();


  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        const response = await sigInUser(data).unwrap();
        console.log(response)
        if (response?.success) {
          Cookies.set("accessToken", response.data.accessToken, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: 7,
          });
          Cookies.set("refreshToken", response.data.refreshToken, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: 7,
          });

          toast.success(response.message);
          router.push("/");
          reset();
        }
      } catch (error: any) {
        console.error("Login error:", error);
        toast.error(error.data?.message || "Login failed. Please try again.");
      }
    },
    [sigInUser, router, reset]
  );

  const handleGoogleSuccess = useCallback(
    async (credentialResponse: { credential?: string }) => {
      if (!credentialResponse.credential) {
        toast.error("Google authentication failed");
        return;
      }

      try {
        const response = await axios.post("/api/v1/auth/google-login", {
          googleToken: credentialResponse.credential,
        });

        if (response?.data?.success) {
          Cookies.set("accessToken", response.data.data.accessToken, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          router.push("/");
          toast.success("Login successful");
        }
      } catch (error) {
        console.error("Google login error:", error);
        toast.error("Google login failed. Please try again.");
      }
    },
    [router]
  );

  const handleGoogleError = useCallback(() => {
    toast.error("Google login failed. Please try another method.");
  }, []);

  console.log(isModalOpen)
  return (
    <section className="max-w-[1420px] mx-auto min-h-screen flex items-center justify-center px-4">
      <div className="flex w-full max-w-[1200px] bg-white rounded-xl overflow-hidden">
        {/* Image Section */}
        <div className={`hidden md:block md:w-1/2 relative ${isModalOpen ? "" : "h-[758px]"}`}>
          <Image
            src="/logingirl.jpg"
            alt="Woman using laptop"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-lg"
            quality={85}
          />
        </div>

        {/* Form Section */}
        
       <div
  className={`w-full md:w-1/2 p-6 sm:p-8 lg:p-12 transition-all duration-500 ease-in-out ${
    isModalOpen ? 'opacity-100 translate-x-0' : 'opacity-100 translate-x-10'
  }`}
>
  {isModalOpen ? (
    <div>
      {/* Sign-in form content */}
      <div className="flex flex-col items-center mb-8">
        <Link href="/" className="mb-6">
          <Logo height={100} width={224} />
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Sign in to access your account
        </p>
      </div>

      {/* Sign-in form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={`w-full px-4 py-[17px] border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200'
            }`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className={`w-full px-4 py-[17px] border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200'
            }`}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setModalOpen(false);
            }}
            className="text-primary hover:text-green-800 text-sm font-medium cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-3 py-4 ${
            isLoading ? 'bg-white border border-gray-400 ' : 'bg-primary hover:border-gray-400'
          } text-white text-xs xl:text-sm font-medium hover:cursor-pointer rounded hover:bg-white hover:text-black hover:border-gray-400 border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 whitespace-nowrap`}
        >
          {isLoading ? <LoadingButton color="#28C76F" /> : 'Sign In'}
        </button>
      </form>

      <div className="my-6 flex items-center">
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
          text="signin_with"
          shape="rectangular"
          theme="filled_blue"
        />
      </div>

      <p className="mt-6 text-center text-gray-600 text-sm">
        Don't have an account?{' '}
        <Link href="/signUp" className="text-primary hover:text-green-800 font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  ) : (
    <div>
      <ForgotPasswordModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </div>
  )}
</div>

      </div>

      {/* <ForgotPasswordModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      /> */}
    </section>
  );
}
