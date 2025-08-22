"use client";
import Link from "next/link";

const VerifidSuccess: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl  text-center">
        {/* Icon */}
        <div className="bg-primary rounded-full p-4 mb-4 inline-block  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
          Verified!
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          You have successfully verified account.
        </p>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link
            href={"/"}
            className="px-12 py-2 rounded-lg text-sm sm:text-base font-medium text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          >
            Ok
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifidSuccess;
