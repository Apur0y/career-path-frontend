'use client'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiMail, FiArrowRight, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useResendVerifyLinkMutation } from '@/redux/features/auth/auth';

export default function EmailVerificationPage() {
  const [isResending, setIsResending] = useState(false);
  const [isResent, setIsResent] = useState(false);
  const [countdown, setCountdown] = useState(0);
 const [maskedEmail, setMaskedEmail] = useState('');
 const [userEmail, setUserEmail] = useState('');
  const [resendLink]=useResendVerifyLinkMutation()

  // Mock user email - in production you'd get this from your auth context or query params
  // const userEmail = localStorage.getItem("myEmail");
  // const maskedEmail = userEmail?.replace(
  //   /^(.)(.*)(@.*)$/,
  //   (_, a, b, c) => a + b.replace(/./g, '•') + c
  // );

  const handleResendEmail = async () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    
    try {

      const res =await resendLink({email:userEmail});
      console.log(res)
      // Simulate API call to resend verification email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsResent(true);
      setCountdown(30); // 30 seconds cooldown
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) clearInterval(timer);
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);
    } catch (error) {
      console.error('Failed to resend email:', error);
    } finally {
      setIsResending(false);
    }
  };

  useEffect(()=>{
     const email = localStorage.getItem("myEmail");
    if (email) {
      setUserEmail(email);
      const masked = email.replace(
        /^(.)(.*)(@.*)$/,
        (_, a, b, c) => a + b.replace(/./g, '•') + c
      );
      setMaskedEmail(masked);
    }
  },[])

  return (
    <>
      <Head>
        <title>Verify Your Email | Your App Name</title>
        <meta name="description" content="Verify your email address to continue" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            {/* Your logo here */}
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <FiMail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            We've sent a verification link to{' '}
            <span className="font-medium text-pribg-primary">{maskedEmail}</span>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex flex-col items-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary">
                <FiMail className="h-6 w-6 text-white " />
              </div>

              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Check your inbox
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    We've sent a verification email to your address. Please click the link in the email to verify your account.
                  </p>
                </div>
              </div>

              <div className="mt-6 w-full">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Didn't receive the email?
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleResendEmail}
                    disabled={isResending || countdown > 0}
                    className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      isResending || countdown > 0
                        ? 'bg-primary cursor-not-allowed'
                        : 'bg-primary hover:bg-primary'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primabg-primary`}
                  >
                    {isResending ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : isResent ? (
                      <>
                        <FiCheckCircle className="mr-2" />
                        Email Resent {countdown > 0 && `(${countdown}s)`}
                      </>
                    ) : (
                      <>
                        <FiArrowRight className="mr-2" />
                        Resend Email {countdown > 0 && `(${countdown}s)`}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Already verified?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/signIn"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primabg-primary"
                >
                  Return to sign in
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <FiClock className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-800">Didn't receive the email?</h3>
                <div className="mt-2 text-sm text-gray-600">
                  <ul role="list" className="list-disc pl-5 space-y-1">
                    <li>Check your spam or junk folder</li>
                    <li>Add noreply@yourapp.com to your contacts</li>
                    <li>Wait a few minutes - email delivery can take up to 5 minutes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}