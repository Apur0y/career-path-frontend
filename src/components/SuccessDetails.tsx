import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";

export default function  SuccessDetails() {
  // const name = "Saiful Rahman";
  // const plan = "Premium Plan"

  return (
    <div>
      <div>
        <div className=" mx-auto bg-white   rounded-md p-9 border border-gray-300 space-y-6 ">
          <div className=" border-gray-200 ">
            <div className="text-center">
              <h1 className="md:text-2xl ">Welcome aboard, Saifur Rahman!</h1>
              <p className="md:text-2xl">
                You’ve successfully subscribed to the Premium Plan.
              </p>
            </div>
            <h2 className="text-lg font-medium mb-3">Details Panel:</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-medium text-gray-900">Premium Plan</span>
              </div>
              <div className="flex justify-between">
                <span>Billing:</span>
                <span className="font-medium text-gray-900">Monthly</span>
              </div>
              <div className="flex justify-between">
                <span>Next Billing Date:</span>
                <span className="font-medium text-gray-900">
                  April 30, 2025 | 08:50 AM
                </span>
              </div>
              <div className="flex justify-between">
                <span>Invoice Sent To:</span>
                <span className="font-medium text-gray-900">Email</span>
              </div>
            </div>
          </div>

          <div className=" border-gray-200">
            <h2 className="text-lg font-medium mb-3">Next Step</h2>
            <p className="text-gray-600 text-sm mb-4">Create AI Pow</p>
            <button className="w-full bg-primary border-none hover:bg-green-700 text-white py-2 px-4 rounded-md transition flex items-center justify-center">
              Create Company Profile
              <BiRightArrowAlt className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
